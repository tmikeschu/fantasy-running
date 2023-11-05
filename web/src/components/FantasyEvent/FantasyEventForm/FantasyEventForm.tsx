import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditFantasyEventById,
  UpdateFantasyEventInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormFantasyEvent = NonNullable<EditFantasyEventById['fantasyEvent']>

interface FantasyEventFormProps {
  fantasyEvent?: EditFantasyEventById['fantasyEvent']
  onSave: (data: UpdateFantasyEventInput, id?: FormFantasyEvent['id']) => void
  error: RWGqlError
  loading: boolean
}

const FantasyEventForm = (props: FantasyEventFormProps) => {
  const onSubmit = (data: FormFantasyEvent) => {
    props.onSave(data, props?.fantasyEvent?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFantasyEvent> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.fantasyEvent?.eventId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="eventId" className="rw-field-error" />

        <Label
          name="teamSize"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Team size
        </Label>

        <NumberField
          name="teamSize"
          defaultValue={props.fantasyEvent?.teamSize}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="teamSize" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FantasyEventForm
