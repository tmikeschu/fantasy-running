import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditFantasyTeamById, UpdateFantasyTeamInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormFantasyTeam = NonNullable<EditFantasyTeamById['fantasyTeam']>

interface FantasyTeamFormProps {
  fantasyTeam?: EditFantasyTeamById['fantasyTeam']
  onSave: (data: UpdateFantasyTeamInput, id?: FormFantasyTeam['id']) => void
  error: RWGqlError
  loading: boolean
}

const FantasyTeamForm = (props: FantasyTeamFormProps) => {
  const onSubmit = (data: FormFantasyTeam) => {
    props.onSave(data, props?.fantasyTeam?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFantasyTeam> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.fantasyTeam?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.fantasyTeam?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="fantasyEventId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Fantasy event id
        </Label>

        <TextField
          name="fantasyEventId"
          defaultValue={props.fantasyTeam?.fantasyEventId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="fantasyEventId" className="rw-field-error" />

        <Label
          name="fantasyTeamWagerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Fantasy team wager id
        </Label>

        <TextField
          name="fantasyTeamWagerId"
          defaultValue={props.fantasyTeam?.fantasyTeamWagerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="fantasyTeamWagerId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FantasyTeamForm
