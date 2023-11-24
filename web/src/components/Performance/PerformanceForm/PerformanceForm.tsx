import type { EditPerformanceById, UpdatePerformanceInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPerformance = NonNullable<EditPerformanceById['performance']>

interface PerformanceFormProps {
  performance?: EditPerformanceById['performance']
  onSave: (data: UpdatePerformanceInput, id?: FormPerformance['id']) => void
  error: RWGqlError
  loading: boolean
}

const PerformanceForm = (props: PerformanceFormProps) => {
  const onSubmit = (data: FormPerformance) => {
    props.onSave(data, props?.performance?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPerformance> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="time"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time
        </Label>

        <TextField
          name="time"
          defaultValue={props.performance?.time}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="time" className="rw-field-error" />

        <Label
          name="eventId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Event id
        </Label>

        <TextField
          name="eventId"
          defaultValue={props.performance?.eventId}
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
          defaultValue={props.performance?.runnerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="runnerId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PerformanceForm
