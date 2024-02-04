import FantasyEventCell from 'src/components/Admin/FantasyEvent/FantasyEventCell'

type FantasyEventPageProps = {
  id: string
}

const FantasyEventPage = ({ id }: FantasyEventPageProps) => {
  return <FantasyEventCell id={id} />
}

export default FantasyEventPage
