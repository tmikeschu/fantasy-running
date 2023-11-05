import EditFantasyEventCell from 'src/components/FantasyEvent/EditFantasyEventCell'

type FantasyEventPageProps = {
  id: string
}

const EditFantasyEventPage = ({ id }: FantasyEventPageProps) => {
  return <EditFantasyEventCell id={id} />
}

export default EditFantasyEventPage
