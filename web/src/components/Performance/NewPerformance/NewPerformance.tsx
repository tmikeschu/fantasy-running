import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PerformanceForm from 'src/components/Performance/PerformanceForm'

import type { CreatePerformanceInput } from 'types/graphql'

const CREATE_PERFORMANCE_MUTATION = gql`
  mutation CreatePerformanceMutation($input: CreatePerformanceInput!) {
    createPerformance(input: $input) {
      id
    }
  }
`

const NewPerformance = () => {
  const [createPerformance, { loading, error }] = useMutation(
    CREATE_PERFORMANCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Performance created')
        navigate(routes.performances())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePerformanceInput) => {
    createPerformance({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Performance</h2>
      </header>
      <div className="rw-segment-main">
        <PerformanceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPerformance
