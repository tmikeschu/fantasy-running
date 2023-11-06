import { Box, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

import { Link } from '@redwoodjs/router'

export type AdminTableWrapperProps = {
  header: React.ReactNode
  children: React.ReactNode
  newPath: string
  resource: string
  isDisabled?: boolean
}
type Context = Pick<
  AdminTableWrapperProps,
  'isDisabled' | 'resource' | 'newPath'
>

const AdminTableContext = React.createContext<Context>(undefined)

export const AdminTableProvider = ({
  children,
  ...props
}: React.PropsWithChildren<Context>) => {
  return (
    <AdminTableContext.Provider value={props}>
      {children}
    </AdminTableContext.Provider>
  )
}

export const useAdminTableContext = () => {
  const context = React.useContext(AdminTableContext)
  if (!context) {
    throw new Error(
      'AdminTableWrapper compound components cannot be rendered outside the AdminTableWrapper component'
    )
  }
  return context
}

const AdminTableWrapper = ({
  header,
  children,
  ...context
}: AdminTableWrapperProps) => {
  return (
    <AdminTableProvider {...context}>
      <Container
        py={{ base: '4', md: '8' }}
        px={{ base: '0', md: 8 }}
        maxW="7xl"
        h="full"
      >
        <Box
          h="full"
          bg="white"
          boxShadow={{ base: 'none', md: 'sm' }}
          borderRadius={{ base: 'none', md: 'lg' }}
        >
          <Stack spacing="5" h="full">
            <Box px={{ base: '4', md: '6' }} pt="5">
              <Stack
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
              >
                {header}
              </Stack>
            </Box>
            <Box flex="1" overflowX="auto">
              {children}
            </Box>
          </Stack>
        </Box>
      </Container>
    </AdminTableProvider>
  )
}

export const AdminTableCreateResourceButton = () => {
  const { isDisabled, resource, newPath } = useAdminTableContext()

  return (
    <IconButton
      icon={<BiPlus />}
      aria-label={`create ${resource}`}
      variant="solid"
      isDisabled={isDisabled}
      colorScheme="blue"
      as={Link}
      to={newPath}
    />
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
