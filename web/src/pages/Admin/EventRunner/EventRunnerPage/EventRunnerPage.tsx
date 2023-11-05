import EventRunnerCell from 'src/components/EventRunner/EventRunnerCell'

type EventRunnerPageProps = {
  id: string
}

const EventRunnerPage = ({ id }: EventRunnerPageProps) => {
  return <EventRunnerCell id={id} />
}

export default EventRunnerPage
