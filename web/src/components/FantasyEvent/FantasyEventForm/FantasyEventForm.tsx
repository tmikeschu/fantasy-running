import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Select,
  VStack,
} from '@chakra-ui/react'
import type {
  CreateFantasyEventInput,
  EditFantasyEventById,
  Event,
  FantasyTeamRule,
  UpdateFantasyEventInput,
} from 'types/graphql'

import { Form, Submit, SelectField } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import AdminNumberField from 'src/components/AdminNumberField/AdminNumberField'
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage'
import FormLabel from 'src/components/FormLabel/FormLabel'

type FormFantasyEvent = CreateFantasyEventInput & { id?: string }

interface FantasyEventFormProps {
  fantasyEvent?: EditFantasyEventById['fantasyEvent']
  onSave: (input: UpdateFantasyEventInput, id?: FormFantasyEvent['id']) => void
  error: RWGqlError
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

  return (
    <Box maxW="xl">
      <Form<FormFantasyEvent> onSubmit={onSubmit} error={props.error}>
        <VStack alignItems="flex-start">
          <FormControl id="event" isRequired>
            <FormLabel>Event id</FormLabel>

            <Select
              as={SelectField}
              name="eventId"
              defaultValue={props.fantasyEvent?.eventId}
              placeholder="Select event"
              validation={{ required: true }}
            >
              {props.events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </Select>

            <FormErrorMessage />
          </FormControl>

          <FormControl id="teamSize" isRequired>
            <FormLabel>Team size</FormLabel>

            <AdminNumberField
              defaultValue={props.fantasyEvent?.teamSize}
              validation={{ required: true }}
              placeholder="7"
            />

            <FormErrorMessage />
          </FormControl>

          <FormControl id="ruleIds" isRequired>
            <FormLabel>Rules</FormLabel>

            <Select
              as={SelectField}
              name="ruleIds"
              defaultValue={props.fantasyEvent?.rules.map((rule) => rule.id)}
              placeholder="Select rules"
              validation={{ required: true }}
              multiple
              h="auto"
              sx={{ py: 2 }}
            >
              {props.fantasyTeamRules.map((rule) => (
                <option key={rule.id} value={rule.id}>
                  Picks {rule.pickNumberFrom} to {rule.pickNumberTo} have rank{' '}
                  {rule.rankMin} to {rule.rankMax}
                </option>
              ))}
            </Select>

            <FormErrorMessage />
            <FormHelperText>
              Select multiple rules by holding down the shift or
              cmd/meta/windows key
            </FormHelperText>
          </FormControl>

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
