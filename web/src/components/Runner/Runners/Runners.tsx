import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Runner/RunnersCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteRunnerMutationVariables, FindRunners } from 'types/graphql'

const DELETE_RUNNER_MUTATION = gql`
  mutation DeleteRunnerMutation($id: String!) {
    deleteRunner(id: $id) {
      id
    }
  }
`

const RunnersList = ({ runners }: FindRunners) => {
  const [deleteRunner] = useMutation(DELETE_RUNNER_MUTATION, {
    onCompleted: () => {
      toast.success('Runner deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteRunnerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete runner ' + id + '?')) {
      deleteRunner({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {runners.map((runner) => (
            <tr key={runner.id}>
              <td>{truncate(runner.id)}</td>
              <td>{truncate(runner.name)}</td>
              <td>{timeTag(runner.createdAt)}</td>
              <td>{timeTag(runner.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.runner({ id: runner.id })}
                    title={'Show runner ' + runner.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRunner({ id: runner.id })}
                    title={'Edit runner ' + runner.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete runner ' + runner.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(runner.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RunnersList
