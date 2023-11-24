import type {
  DeletePerformanceMutationVariables,
  FindPerformances,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Performance/PerformancesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PERFORMANCE_MUTATION = gql`
  mutation DeletePerformanceMutation($id: String!) {
    deletePerformance(id: $id) {
      id
    }
  }
`

const PerformancesList = ({ performances }: FindPerformances) => {
  const [deletePerformance] = useMutation(DELETE_PERFORMANCE_MUTATION, {
    onCompleted: () => {
      toast.success('Performance deleted')
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

  const onDeleteClick = (id: DeletePerformanceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete performance ' + id + '?')) {
      deletePerformance({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Event id</th>
            <th>Runner id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td>{truncate(performance.id)}</td>
              <td>{truncate(performance.time)}</td>
              <td>{truncate(performance.eventId)}</td>
              <td>{truncate(performance.runnerId)}</td>
              <td>{timeTag(performance.createdAt)}</td>
              <td>{timeTag(performance.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.performance({ id: performance.id })}
                    title={'Show performance ' + performance.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPerformance({ id: performance.id })}
                    title={'Edit performance ' + performance.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete performance ' + performance.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(performance.id)}
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

export default PerformancesList
