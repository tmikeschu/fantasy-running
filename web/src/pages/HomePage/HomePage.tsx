import {
  Button,
  Heading,
  Image,
  Box,
  Stack,
  Text,
  ButtonGroup,
  LightMode,
} from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import img from './runners.jpg'

const HomePage = () => {
  const { isAuthenticated, loading, logIn } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Box as="section" bg="gray.800" color="white" py="7.5rem" minH="100vh">
        <Box
          maxW={{ base: 'xl', md: '5xl' }}
          mx="auto"
          px={{ base: '6', md: '8' }}
        >
          <Box textAlign="center">
            <Heading
              as="h1"
              size="3xl"
              fontWeight="extrabold"
              maxW="48rem"
              mx="auto"
              lineHeight="1.2"
              letterSpacing="tight"
            >
              Fantasy Running
            </Heading>
            <Text fontSize="xl" mt="4" maxW="xl" mx="auto" fontWeight="medium">
              Every second counts
            </Text>
          </Box>

          <Stack
            justify="center"
            direction={{ base: 'column', md: 'row' }}
            mt="10"
            mb="20"
            spacing="4"
          >
            <LightMode>
              <ButtonGroup
                justifyContent="center"
                size={{ base: 'md', md: 'lg' }}
                variant="solid"
              >
                {isAuthenticated ? (
                  <>
                    <Button
                      as={Link}
                      to={routes.dashboard()}
                      isLoading={loading}
                    >
                      Dashboard
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => logIn()} isLoading={loading}>
                    log in
                  </Button>
                )}
              </ButtonGroup>
            </LightMode>
          </Stack>

          <Box
            className="group"
            cursor="pointer"
            position="relative"
            rounded="lg"
            overflow="hidden"
          >
            <Image src={img} alt="Runners" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HomePage
