import type { EditEventRunnerById, UpdateEventRunnerInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormEventRunner = NonNullable<EditEventRunnerById['eventRunner']>

interface EventRunnerFormProps {
  eventRunner?: EditEventRunnerById['eventRunner']
  onSave: (data: UpdateEventRunnerInput, id?: FormEventRunner['id']) => void
  error?: RWGqlError
  loading: boolean
}

const EventRunnerForm = (props: EventRunnerFormProps) => {
  const onSubmit = (data: FormEventRunner) => {
    props.onSave(data, props?.eventRunner?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEventRunner> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="eventId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Event id
        </Label>

        <TextField
          name="eventId"
          defaultValue={props.eventRunner?.eventId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="eventId" className="rw-field-error" />

        <Label
          name="runnerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Runner id
        </Label>

        <TextField
          name="runnerId"
          defaultValue={props.eventRunner?.runnerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="runnerId" className="rw-field-error" />

        <Label
          name="seed"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Seed
        </Label>

        <NumberField
          name="seed"
          defaultValue={props.eventRunner?.seed}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="seed" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EventRunnerForm
