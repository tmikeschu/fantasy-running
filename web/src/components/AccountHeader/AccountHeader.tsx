import { Flex, HStack, Img, Box, FlexProps, Tooltip } from '@chakra-ui/react'

import { useAuth } from 'src/auth'

const AccountHeader = (props: FlexProps) => {
  const { currentUser } = useAuth()
  return (
    <Flex
      {...props}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="2"
      fontSize="sm"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: 'gray.600' }}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing="3">
        <Img
          w="8"
          h="8"
          rounded="md"
          objectFit="cover"
          src={currentUser.avatarUrl}
          alt={currentUser.email}
        />
        <Box textAlign="start" overflow="hidden">
          <Tooltip label={currentUser.email} openDelay={1000} hasArrow>
            <Box noOfLines={1} fontWeight="semibold" w="full">
              {currentUser.email}
            </Box>
          </Tooltip>
        </Box>
      </HStack>
    </Flex>
  )
}

export default AccountHeader
