import RunnerCell from 'src/components/Runner/RunnerCell'

type RunnerPageProps = {
  id: string
}

const RunnerPage = ({ id }: RunnerPageProps) => {
  return <RunnerCell id={id} />
}

export default RunnerPage
