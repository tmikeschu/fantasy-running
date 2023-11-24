import type {
  DeleteRunnerMutationVariables,
  FindRunnerById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_RUNNER_MUTATION = gql`
  mutation DeleteRunnerMutation($id: String!) {
    deleteRunner(id: $id) {
      id
    }
  }
`

interface Props {
  runner: NonNullable<FindRunnerById['runner']>
}

const Runner = ({ runner }: Props) => {
  const [deleteRunner] = useMutation(DELETE_RUNNER_MUTATION, {
    onCompleted: () => {
      toast.success('Runner deleted')
      navigate(routes.runners())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRunnerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete runner ' + id + '?')) {
      deleteRunner({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Runner {runner.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{runner.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{runner.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(runner.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(runner.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRunner({ id: runner.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(runner.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Runner
