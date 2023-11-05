import EditRunnerCell from 'src/components/Runner/EditRunnerCell'

type RunnerPageProps = {
  id: string
}

const EditRunnerPage = ({ id }: RunnerPageProps) => {
  return <EditRunnerCell id={id} />
}

export default EditRunnerPage
