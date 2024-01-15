import { VStack } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import FantasyEventCell from 'src/components/FantasyEvent/FantasyEventCell'

type FantasyEventPageProps = {
  id: string
}

const FantasyEventPage = ({ id }: FantasyEventPageProps) => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="FantasyEvents" description="FantasyEvents page" />
      <VStack alignItems="flex-start" spacing="8">
        {currentUser ? <FantasyEventCell id={id} /> : null}
      </VStack>
    </>
  )
}

export default FantasyEventPage
