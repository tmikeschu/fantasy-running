import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { BiMehBlank } from 'react-icons/bi'

import { Link } from '@redwoodjs/router'

export type EmptyResourceProps = {
  newPath?: string
  children: string
}

const EmptyResource: React.FC<EmptyResourceProps> = ({ newPath, children }) => {
  return (
    <Box as="section" bg="bg.surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack
            spacing={{ base: '4', md: '5' }}
            align="center"
            color="gray.500"
          >
            <Heading size={{ base: 'sm', md: 'md' }}>
              No {children} yet!
            </Heading>
            <Text fontSize="2rem">
              <BiMehBlank />
            </Text>
          </Stack>
          {newPath ? (
            <Stack
              spacing="3"
              direction={{ base: 'column', sm: 'row' }}
              justify="center"
            >
              <Button as={Link} to={newPath} variant="solid" colorScheme="blue">
                Create one
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Box>
  )
}

export default EmptyResource
