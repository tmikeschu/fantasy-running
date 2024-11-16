import { Heading, Image, Box, Text } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import img from './runners.jpg'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Box as="section" bg="gray.800" color="white" py="7.5rem" minH="100vh">
        <Box
          maxW={{ base: 'xl', md: '5xl' }}
          mx="auto"
          px={{ base: '6', md: '8' }}
        >
          <Box textAlign="center" mb="4">
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
