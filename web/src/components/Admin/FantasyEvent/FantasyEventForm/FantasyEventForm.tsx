import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  VStack,
  Textarea,
  Link,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Option } from 'space-monad'
import type {
  CreateFantasyEventInput,
  EditFantasyEventById,
  Event,
  FantasyTeamRule,
  UpdateFantasyEventInput,
} from 'types/graphql'

import { Form, Submit, Controller, useForm } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import AdminNumberField from 'src/components/Admin/AdminNumberField/AdminNumberField'
import FormErrorMessage from 'src/components/forms/FormErrorMessage/FormErrorMessage'
import FormLabel from 'src/components/forms/FormLabel/FormLabel'

type FormFantasyEvent = CreateFantasyEventInput & { id?: string }

interface FantasyEventFormProps {
  fantasyEvent?: EditFantasyEventById['fantasyEvent']
  onSave: (
    input: CreateFantasyEventInput | UpdateFantasyEventInput,
    id?: FormFantasyEvent['id']
  ) => void
  error?: RWGqlError
  loading: boolean
  events: Pick<Event, 'id' | 'name'>[]
  fantasyTeamRules: Pick<
    FantasyTeamRule,
    'id' | 'pickNumberFrom' | 'pickNumberTo' | 'rankMin' | 'rankMax'
  >[]
}

const FantasyEventForm = (props: FantasyEventFormProps) => {
  const onSubmit = (data: FormFantasyEvent) => {
    props.onSave(data, props.fantasyEvent?.id)
  }

  const eventOptions = React.useMemo(() => {
    return props.events.map((event) => ({
      value: event.id,
      label: event.name,
    }))
  }, [props.events])

  const eventOptionsMap = React.useMemo(() => {
    return new Map(eventOptions.map((option) => [option.value, option]))
  }, [eventOptions])

  const ruleOptions = React.useMemo(
    () =>
      props.fantasyTeamRules.map((rule) => ({
        value: rule.id,
        label: `Picks ${rule.pickNumberFrom} to ${rule.pickNumberTo} have rank ${rule.rankMin} to ${rule.rankMax}`,
      })),
    [props.fantasyTeamRules]
  )

  const ruleOptionsMap = React.useMemo(() => {
    return new Map(ruleOptions.map((option) => [option.value, option]))
  }, [ruleOptions])

  const formMethods = useForm<FormFantasyEvent>()

  return (
    <Box maxW="xl">
      <Form<FormFantasyEvent>
        onSubmit={onSubmit}
        error={props.error}
        formMethods={formMethods}
      >
        <VStack alignItems="flex-start">
          <Controller<FormFantasyEvent, 'eventId'>
            name="eventId"
            defaultValue={props.fantasyEvent?.eventId}
            render={({ field }) => (
              <FormControl id="eventId" isRequired>
                <FormLabel>Event id</FormLabel>

                <Select
                  {...field}
                  onChange={(value) => {
                    if (!value) return
                    field.onChange({ target: { value: value.value } })
                  }}
                  name="eventId"
                  value={
                    Option(field.value)
                      .map((id) => eventOptionsMap.get(id))
                      .get() ?? null
                  }
                  placeholder="Select event"
                  options={eventOptions}
                />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller
            name="teamSize"
            defaultValue={props.fantasyEvent?.teamSize}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl id="teamSize" isRequired>
                <FormLabel>Team size</FormLabel>

                <AdminNumberField {...field} placeholder="e.g., 7" />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller<FormFantasyEvent, 'ruleIds'>
            name="ruleIds"
            defaultValue={props.fantasyEvent?.rules
              .map((rule) => rule?.id)
              .filter(Boolean)}
            render={({ field }) => (
              <FormControl id="ruleIds" isRequired>
                <FormLabel>Rules</FormLabel>

                <Select
                  {...field}
                  onChange={(values) => {
                    field.onChange({
                      target: { value: values.map((v) => v.value) },
                    })
                  }}
                  value={field.value?.reduce((acc, rule) => {
                    Option(rule)
                      .map((id) => ruleOptionsMap.get(id))
                      .forEach((r) => acc.push(r))
                    return acc
                  }, [] as { value: string; label: string }[])}
                  placeholder="Select rules"
                  getOptionLabel={(option) => option.label}
                  isMulti
                  options={ruleOptions}
                />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller
            name="description"
            defaultValue={props.fantasyEvent?.description}
            render={({ field }) => (
              <FormControl id="description">
                <FormLabel>Description</FormLabel>

                <Textarea placeholder="Choose your squad..." {...field} />

                <FormHelperText>
                  Supports{' '}
                  <Link
                    href="https://www.markdownguide.org/basic-syntax/"
                    isExternal
                  >
                    Markdown syntax
                  </Link>
                </FormHelperText>
              </FormControl>
            )}
          />

          <ButtonGroup w="full" justifyContent="flex-end">
            <Button
              as={Submit}
              type="submit"
              isLoading={props.loading}
              colorScheme="blue"
            >
              Save
            </Button>
          </ButtonGroup>
        </VStack>
      </Form>
    </Box>
  )
}

export default FantasyEventForm
