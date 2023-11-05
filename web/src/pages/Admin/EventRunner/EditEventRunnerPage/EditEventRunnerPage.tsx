import EditEventRunnerCell from 'src/components/EventRunner/EditEventRunnerCell'

type EventRunnerPageProps = {
  id: string
}

const EditEventRunnerPage = ({ id }: EventRunnerPageProps) => {
  return <EditEventRunnerCell id={id} />
}

export default EditEventRunnerPage
