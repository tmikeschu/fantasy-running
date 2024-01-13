import { Container, VStack } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import EditFantasyTeamCell from 'src/components/FantasyTeam/EditFantasyTeamCell'

type EditFantasyTeamPageProps = {
  id: string
}
const NewFantasyTeamPage = ({
  id: fantasyTeamId,
}: EditFantasyTeamPageProps) => {
  return (
    <>
      <MetaTags title="EditFantasyTeam" description="EditFantasyTeam page" />

      <Container px={{ base: '8', md: undefined }} mx="0">
        <VStack alignItems="stretch" w="full" spacing="8" pb="8">
          <EditFantasyTeamCell id={fantasyTeamId} />
        </VStack>
      </Container>
    </>
  )
}

export default NewFantasyTeamPage
