import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { match } from 'ts-pattern'
import {
  CreateFantasyTeamInput,
  FantasyTeamMemberInput,
  FindNewFantasyTeamQuery,
} from 'types/graphql'

import { Controller, Form, RWGqlError, useForm } from '@redwoodjs/forms'

type NewFantasyTeamFormProps = {
  onSave: (
    input: CreateFantasyTeamInput,
    members: FantasyTeamMemberInput
  ) => void
  fantasyEvent: NonNullable<FindNewFantasyTeamQuery['fantasyEvent']>
  error?: RWGqlError
  loading: boolean
}

type FormFantasyTeam = CreateFantasyTeamInput & {
  id?: string
} & Record<`pick-${number}-${string}`, { label: string; value: string }>

const NewFantasyTeamForm = (props: NewFantasyTeamFormProps) => {
  const { fantasyEvent } = props
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
    // todo translate multi selects to single list
    const members: FantasyTeamMemberInput[] = Object.entries(data)
      .filter(
        (set): set is [string, FormFantasyTeam[`pick-${number}-${string}`]] =>
          set[0].startsWith('pick-')
      )
      .map(([key, value]) => ({
        eventRunnerId: value?.value,
        seed: Number(key.split('-')[1]),
      }))
    console.log({ members })
  }

  return (
    <Box maxW="3xl">
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
                <Heading>
                  {match(genderDivision)
                    .with('men', () => 'Men')
                    .with('women', () => 'Women')
                    .otherwise(() => '...')}
                </Heading>
                {Array.from({ length: props.fantasyEvent.teamSize }, (_, i) => {
                  const num = i + 1
                  const rule = fantasyEvent.rules.find(
                    (r) => num >= r.pickNumberFrom && num <= r.pickNumberTo
                  )
                  if (!rule) return null

                  return (
                    <Controller<FormFantasyTeam, `pick-${number}-${string}`>
                      key={i}
                      name={`pick-${num}-${genderDivision}`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormControl w="full">
                          <FormLabel>Pick {num}</FormLabel>

                          <Select
                            {...field}
                            value={field.value}
                            isOptionDisabled={(option) => {
                              return Object.entries(formMethods.getValues())
                                .filter(
                                  (
                                    set
                                  ): set is [
                                    string,
                                    FormFantasyTeam[`pick-${number}-${string}`]
                                  ] => set[0].startsWith('pick-')
                                )
                                .some(
                                  ([_key, value]) =>
                                    value?.value === option.value
                                )
                            }}
                            options={runners
                              .slice(
                                rule?.rankMin - 1,
                                rule?.rankMax ?? Infinity
                              )
                              .map((r) => ({
                                value: r.id,
                                label: r.runner.name,
                              }))}
                            onChange={(value) => {
                              field.onChange({
                                target: { value: value ?? undefined },
                              })
                            }}
                          />
                        </FormControl>
                      )}
                    />
                  )
                })}
              </VStack>
            ))}
          </Stack>
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
