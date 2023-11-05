import EditPerformanceCell from 'src/components/Performance/EditPerformanceCell'

type PerformancePageProps = {
  id: string
}

const EditPerformancePage = ({ id }: PerformancePageProps) => {
  return <EditPerformanceCell id={id} />
}

export default EditPerformancePage
