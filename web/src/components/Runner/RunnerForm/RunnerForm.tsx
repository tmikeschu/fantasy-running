import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditRunnerById, UpdateRunnerInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormRunner = NonNullable<EditRunnerById['runner']>

interface RunnerFormProps {
  runner?: EditRunnerById['runner']
  onSave: (data: UpdateRunnerInput, id?: FormRunner['id']) => void
  error: RWGqlError
  loading: boolean
}

const RunnerForm = (props: RunnerFormProps) => {
  const onSubmit = (data: FormRunner) => {
    props.onSave(data, props?.runner?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRunner> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.runner?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RunnerForm
