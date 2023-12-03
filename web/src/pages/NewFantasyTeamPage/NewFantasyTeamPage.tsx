import { Heading, VStack } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import NewFantasyTeamCell from 'src/components/FantasyTeam/NewFantasyTeamCell'

type NewFantasyTeamPageProps = {
  id: string
}
const NewFantasyTeamPage = ({
  id: fantasyEventId,
}: NewFantasyTeamPageProps) => {
  return (
    <>
      <MetaTags title="NewFantasyTeam" description="NewFantasyTeam page" />

      <VStack alignItems="stretch" w="full" spacing="8" pb="8">
        <Heading as="h1">New Fantasy Team</Heading>
        <NewFantasyTeamCell id={fantasyEventId} />
      </VStack>
    </>
  )
}

export default NewFantasyTeamPage
