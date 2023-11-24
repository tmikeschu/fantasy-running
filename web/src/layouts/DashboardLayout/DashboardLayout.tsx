import { Box, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import {
  BiCalendarEvent,
  BiGroup,
  BiLogOut,
  BiRun,
  BiTable,
} from 'react-icons/bi'

import { routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AccountHeader from 'src/components/AccountHeader'
import NavGroup from 'src/components/NavGroup'
import NavItem from 'src/components/NavItem'

type DashboardLayoutProps = {
  children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logOut, hasRole, currentUser } = useAuth()
  const isAdmin = hasRole('ADMIN')

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm" flexShrink="0">
          <Flex h="full" direction="column" px="4" py="4">
            {currentUser && <AccountHeader {...{ currentUser }} />}
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <Stack spacing="1">
                <NavItem
                  icon={<BiRun />}
                  label="Home"
                  to={routes.dashboard()}
                />
                {isAdmin && (
                  <NavItem
                    icon={<BiTable />}
                    label="Admin"
                    to={routes.adminHome()}
                  />
                )}
              </Stack>

              <NavGroup label="Fantasy">
                <NavItem
                  icon={<BiCalendarEvent />}
                  label="Events"
                  to={routes.fantasyEvents()}
                />

                <NavItem
                  icon={<BiGroup />}
                  label="My Teams"
                  to={routes.myTeams()}
                />
              </NavGroup>
            </Stack>

            <Box>
              <Stack spacing="1">
                <NavItem
                  subtle
                  icon={<BiLogOut />}
                  label="Log out"
                  onClick={() => logOut()}
                />
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Box bg={mode('white', 'gray.800')} flex="1" p="6" overflow="hidden">
          <Box w="full" h="full" rounded="lg">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default DashboardLayout
