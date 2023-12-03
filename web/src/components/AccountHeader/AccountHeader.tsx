import { Flex, HStack, Img, Box, FlexProps, Tooltip } from '@chakra-ui/react'

import { CurrentUser } from 'src/auth'

export type AccountHeaderProps = FlexProps & { currentUser: CurrentUser }

const AccountHeader = ({ currentUser, ...props }: AccountHeaderProps) => {
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
      fontSize={{ base: 'md', md: 'sm' }}
      outline="0"
      transition="all 0.2s"
    >
      <HStack flex="1" spacing="3">
        <Img
          w="8"
          h="8"
          rounded="md"
          objectFit="cover"
          src={currentUser.avatarUrl ?? ''}
          alt={currentUser.email}
        />
        <Box textAlign="start" overflow="hidden">
          <Tooltip label={currentUser.email} openDelay={1000} hasArrow>
            <Box noOfLines={1} fontWeight="semibold" w="full" color="white">
              {currentUser.email}
            </Box>
          </Tooltip>
        </Box>
      </HStack>
    </Flex>
  )
}

export default AccountHeader
