import {
  Box,
  BoxProps,
  Button,
  Divider,
  HStack,
  FormControl,
  Input,
  Stack,
} from '@chakra-ui/react'
import type { EditEventById, UpdateEventInput } from 'types/graphql'

import {
  Form,
  TextField,
  DatetimeLocalField,
  Submit,
  useForm,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { back } from '@redwoodjs/router'

import ErrorAlert from 'src/components/ErrorAlert/ErrorAlert'
import FormErrorMessage from 'src/components/FormErrorMessage/FormErrorMessage'
import FormLabel from 'src/components/FormLabel'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormEvent = NonNullable<EditEventById['event']>

interface EventFormProps extends BoxProps {
  event?: EditEventById['event']
  onSave: (data: UpdateEventInput, id?: FormEvent['id']) => void
  error?: RWGqlError
  isLoading: boolean
}

const EventForm = ({
  event,
  onSave,
  error,
  isLoading,
  ...props
}: EventFormProps) => {
  const form = useForm<FormEvent>()

  const onSubmit = (data: FormEvent) => {
    onSave(data, event?.id)
  }

  return (
    <Form<FormEvent> onSubmit={onSubmit} error={error} formMethods={form}>
      <Box boxShadow="sm" borderRadius="lg" maxW="xl" {...props}>
        <Stack spacing="5">
          {error?.message && <ErrorAlert message={error?.message} />}

          <FormControl
            id="name"
            isRequired
            isInvalid={Boolean(form.formState.errors.name)}
          >
            <FormLabel>Name</FormLabel>

            <Input
              as={TextField}
              name="name"
              defaultValue={event?.name}
              validation={{ required: true, pattern: /^[a-z]+$/ }}
            />

            <FormErrorMessage />
          </FormControl>

          <FormControl
            id="date"
            isRequired
            isInvalid={Boolean(form.formState.errors.date)}
          >
            <FormLabel>Date</FormLabel>

            <Input
              name="date"
              as={DatetimeLocalField}
              defaultValue={formatDatetime(event?.date)}
              validation={{ required: true }}
            />

            <FormErrorMessage />
          </FormControl>

          <FormControl
            id="location"
            isRequired
            isInvalid={Boolean(form.formState.errors.location)}
          >
            <FormLabel>Location</FormLabel>

            <Input
              as={TextField}
              name="location"
              defaultValue={event?.location}
              validation={{ required: true }}
            />

            <FormErrorMessage />
          </FormControl>
        </Stack>
        <Divider />
        <HStack py="4" px={{ base: '4', md: '6' }} justifyContent="flex-end">
          <Button variant="ghost" colorScheme="gray" onClick={back}>
            Cancel
          </Button>
          <Button
            type="submit"
            as={Submit}
            isLoading={isLoading}
            variant="solid"
            colorScheme="blue"
          >
            Save
          </Button>
        </HStack>
      </Box>
    </Form>
  )
}

export default EventForm
