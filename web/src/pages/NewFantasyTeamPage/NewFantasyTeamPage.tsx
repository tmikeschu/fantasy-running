import { Container, VStack } from '@chakra-ui/react'

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

      <Container px={{ base: '8', md: undefined }} mx="0">
        <VStack alignItems="stretch" w="full" spacing="8" pb="8">
          <NewFantasyTeamCell id={fantasyEventId} />
        </VStack>
      </Container>
    </>
  )
}

export default NewFantasyTeamPage
