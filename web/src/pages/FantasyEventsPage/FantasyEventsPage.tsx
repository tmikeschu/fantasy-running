import { Heading, VStack } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import FantasyEventsCell from 'src/components/FantasyEvent/FantasyEventsCell'

const FantasyEventsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="FantasyEvents" description="FantasyEvents page" />
      <VStack alignItems="flex-start" spacing="8">
        <Heading color="gray.700">Fantasy Events</Heading>
        {currentUser ? <FantasyEventsCell ownerId={currentUser.id} /> : null}
      </VStack>
    </>
  )
}

export default FantasyEventsPage
