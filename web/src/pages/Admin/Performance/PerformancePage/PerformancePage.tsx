import PerformanceCell from 'src/components/Performance/PerformanceCell'

type PerformancePageProps = {
  id: string
}

const PerformancePage = ({ id }: PerformancePageProps) => {
  return <PerformanceCell id={id} />
}

export default PerformancePage
