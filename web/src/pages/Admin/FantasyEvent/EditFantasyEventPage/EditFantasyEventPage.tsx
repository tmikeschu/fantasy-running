import EditFantasyEventCell from 'src/components/Admin/FantasyEvent/EditFantasyEventCell'

type FantasyEventPageProps = {
  id: string
}

const EditFantasyEventPage = ({ id }: FantasyEventPageProps) => {
  return <EditFantasyEventCell id={id} />
}

export default EditFantasyEventPage
