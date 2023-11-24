import FantasyEventCell from 'src/components/AdminFantasyEvent/AdminFantasyEventCell'

type FantasyEventPageProps = {
  id: string
}

const FantasyEventPage = ({ id }: FantasyEventPageProps) => {
  return <FantasyEventCell id={id} />
}

export default FantasyEventPage
