import { Box, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

import { Link } from '@redwoodjs/router'

export type AdminTableWrapperProps = {
  header: React.ReactNode
  children: React.ReactNode
  newPath: string
  resource: string
}
const AdminTableWrapper = ({
  header,
  children,
  newPath,
  resource,
}: AdminTableWrapperProps) => {
  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }} maxW="7xl">
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <Stack spacing="5">
          <Box px={{ base: '4', md: '6' }} pt="5">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
            >
              {header}
              <IconButton
                icon={<BiPlus />}
                aria-label={`create ${resource}`}
                variant="solid"
                colorScheme="blue"
                as={Link}
                to={newPath}
              />
            </Stack>
          </Box>
          <Box overflowX="auto">{children}</Box>
        </Stack>
      </Box>
    </Container>
  )
}

export const AdminTableHeader = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Text textStyle="lg" fontWeight="medium">
      {children}
    </Text>
  )
}

export default AdminTableWrapper
