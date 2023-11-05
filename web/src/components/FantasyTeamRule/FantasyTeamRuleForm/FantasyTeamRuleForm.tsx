import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditFantasyTeamRuleById,
  UpdateFantasyTeamRuleInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormFantasyTeamRule = NonNullable<
  EditFantasyTeamRuleById['fantasyTeamRule']
>

interface FantasyTeamRuleFormProps {
  fantasyTeamRule?: EditFantasyTeamRuleById['fantasyTeamRule']
  onSave: (
    data: UpdateFantasyTeamRuleInput,
    id?: FormFantasyTeamRule['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const FantasyTeamRuleForm = (props: FantasyTeamRuleFormProps) => {
  const onSubmit = (data: FormFantasyTeamRule) => {
    props.onSave(data, props?.fantasyTeamRule?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFantasyTeamRule> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="pickNumberFrom"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pick number from
        </Label>

        <NumberField
          name="pickNumberFrom"
          defaultValue={props.fantasyTeamRule?.pickNumberFrom}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="pickNumberFrom" className="rw-field-error" />

        <Label
          name="pickNumberTo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pick number to
        </Label>

        <NumberField
          name="pickNumberTo"
          defaultValue={props.fantasyTeamRule?.pickNumberTo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="pickNumberTo" className="rw-field-error" />

        <Label
          name="rankMin"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rank min
        </Label>

        <NumberField
          name="rankMin"
          defaultValue={props.fantasyTeamRule?.rankMin}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rankMin" className="rw-field-error" />

        <Label
          name="rankMax"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rank max
        </Label>

        <NumberField
          name="rankMax"
          defaultValue={props.fantasyTeamRule?.rankMax}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rankMax" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FantasyTeamRuleForm
