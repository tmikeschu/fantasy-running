import { Heading, VStack } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import FantasyEventsCell from 'src/components/FantasyEvent/FantasyEventsCell'

const FantasyEventsPage = () => {
  return (
    <>
      <MetaTags title="FantasyEvents" description="FantasyEvents page" />
      <VStack alignItems="flex-start" spacing="8">
        <Heading color="gray.700">Fantasy Events</Heading>
        <FantasyEventsCell />
      </VStack>
    </>
  )
}

export default FantasyEventsPage
