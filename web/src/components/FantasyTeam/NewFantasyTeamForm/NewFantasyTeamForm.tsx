import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { match } from 'ts-pattern'
import {
  CreateFantasyTeamInput,
  FantasyTeamMemberInput,
  FindNewFantasyTeamQuery,
  UpdateFantasyTeamInput,
} from 'types/graphql'

import { Controller, Form, RWGqlError, useForm } from '@redwoodjs/forms'

import { CurrentUser } from 'src/auth'

import { pubsub } from './pubsub'
import {
  entryIsTeamPick,
  SelectKey,
  SelectOption,
  TeamMemberSelect,
} from './TeamMemberSelect'

type NewFantasyTeamFormProps = {
  onSave: (data: {
    input: CreateFantasyTeamInput
    members: FantasyTeamMemberInput[]
  }) => void
  fantasyEvent: NonNullable<FindNewFantasyTeamQuery['fantasyEvent']>
  currentUser: CurrentUser
  error?: RWGqlError
  loading: boolean
}

type FormFantasyTeam = (CreateFantasyTeamInput | UpdateFantasyTeamInput) &
  Record<SelectKey, SelectOption>

const NewFantasyTeamForm = <P extends NewFantasyTeamFormProps>(props: P) => {
  const { fantasyEvent, currentUser } = props
  const { eventRunners } = fantasyEvent.event
  const byGenderDivision = Object.entries(
    eventRunners.reduce((acc, er) => {
      if (!er.runner.genderDivision) return acc

      if (!acc[er?.runner.genderDivision]) {
        acc[er.runner.genderDivision] = []
      }
      acc[er.runner.genderDivision].push(er)
      return acc
    }, {} as Record<string, typeof eventRunners>)
  )
    .map(
      ([key, value]) => [key, value.sort((a, b) => a.seed - b.seed)] as const
    )
    .sort(([a], [_b]) => (a === 'women' ? -1 : 1))

  const formMethods = useForm<FormFantasyTeam>()

  const onSubmit = (data: FormFantasyTeam) => {
    const { venmoHandle, name, ...rest } = data
    const members: FantasyTeamMemberInput[] = Object.entries(rest)
      .filter(entryIsTeamPick)
      .map(([key, value]) => ({
        eventRunnerId: value?.value,
        seed: Number(key.split('-')[1]),
      }))

    props.onSave({
      input: {
        fantasyEventId: fantasyEvent.id,
        userId: currentUser.id,
        venmoHandle,
        name,
      },
      members,
    })
  }

  const { teamSize } = props.fantasyEvent

  React.useEffect(() => {
    return pubsub.subscribe((e) => {
      const formValues = formMethods.getValues()
      const blankSelections = Object.entries(formValues)
        .filter(entryIsTeamPick)
        .filter((set) => !set[1])
        .map((set) => set[0])

      match(e)
        .with({ type: 'SELECTED' }, ({ fieldKey }) => {
          const nextKey =
            blankSelections[blankSelections.findIndex((k) => k !== fieldKey)]
          if (!nextKey) {
            if (!formValues.venmoHandle) venmoHandleRef.current?.focus()
            return
          }
          pubsub.broadcast({ type: 'AUTO_FOCUS', fieldKey: nextKey })
        })
        .otherwise(() => {})
    })
  }, [formMethods])

  const venmoHandleRef = React.useRef<HTMLInputElement>(null)

  return (
    <Box maxW="3xl" pl="px">
      <Form<FormFantasyTeam> formMethods={formMethods} onSubmit={onSubmit}>
        <VStack alignItems="flex-start" spacing="8">
          <Stack
            w="full"
            spacing="8"
            alignItems="flex-start"
            direction={{ base: 'column', md: 'row' }}
          >
            {byGenderDivision.map(([genderDivision, runners]) => (
              <VStack
                key={genderDivision}
                spacing="4"
                alignItems="flex-start"
                w="full"
              >
                <Heading fontSize="lg">
                  {match(genderDivision)
                    .with('men', () => 'Men')
                    .with('women', () => 'Women')
                    .otherwise(() => '...')}
                </Heading>
                {Array.from({ length: teamSize }, (_, i) => {
                  const num = i + 1
                  const rule = fantasyEvent.rules.find(
                    (r) => num >= r.pickNumberFrom && num <= r.pickNumberTo
                  )
                  if (!rule) return null

                  const name = `pick-${num}-${genderDivision}` as const
                  return (
                    <Controller<FormFantasyTeam, `pick-${number}-${string}`>
                      key={i}
                      name={name}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TeamMemberSelect
                          value={field.value}
                          fieldKey={name}
                          pickNumber={num}
                          runners={runners}
                          rule={rule}
                          onChange={(value) => {
                            pubsub.broadcast({
                              type: 'SELECTED',
                              fieldKey: name,
                            })
                            field.onChange({
                              target: { value: value ?? undefined },
                            })
                          }}
                        />
                      )}
                    />
                  )
                })}
              </VStack>
            ))}
          </Stack>

          <Controller<FormFantasyTeam, 'venmoHandle'>
            name="venmoHandle"
            render={({ field }) => (
              <FormControl maxW="sm">
                <FormLabel>Venmo handle</FormLabel>

                <Input
                  {...field}
                  ref={venmoHandleRef}
                  value={field.value ?? ''}
                />
              </FormControl>
            )}
          />
          <ButtonGroup>
            <Button type="submit" colorScheme="blue" isLoading={props.loading}>
              Save
            </Button>
          </ButtonGroup>
        </VStack>
      </Form>
    </Box>
  )
}

export default NewFantasyTeamForm
