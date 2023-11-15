import EditFantasyEventCell from 'src/components/AdminFantasyEvent/EditFantasyEventCell'

type FantasyEventPageProps = {
  id: string
}

const EditFantasyEventPage = ({ id }: FantasyEventPageProps) => {
  return <EditFantasyEventCell id={id} />
}

export default EditFantasyEventPage
