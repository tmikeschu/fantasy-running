import EventCell from 'src/components/Event/EventCell'

type EventPageProps = {
  id: string
}

const EventPage = ({ id }: EventPageProps) => {
  return <EventCell id={id} />
}

export default EventPage
