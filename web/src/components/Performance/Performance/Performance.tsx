import type {
  DeletePerformanceMutationVariables,
  FindPerformanceById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_PERFORMANCE_MUTATION = gql`
  mutation DeletePerformanceMutation($id: String!) {
    deletePerformance(id: $id) {
      id
    }
  }
`

interface Props {
  performance: NonNullable<FindPerformanceById['performance']>
}

const Performance = ({ performance }: Props) => {
  const [deletePerformance] = useMutation(DELETE_PERFORMANCE_MUTATION, {
    onCompleted: () => {
      toast.success('Performance deleted')
      navigate(routes.performances())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePerformanceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete performance ' + id + '?')) {
      deletePerformance({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Performance {performance.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{performance.id}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{performance.time}</td>
            </tr>
            <tr>
              <th>Event id</th>
              <td>{performance.eventId}</td>
            </tr>
            <tr>
              <th>Runner id</th>
              <td>{performance.runnerId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(performance.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(performance.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPerformance({ id: performance.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(performance.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Performance
