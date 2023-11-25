import { Box, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import {
  BiCalendar,
  BiCalendarEvent,
  BiCog,
  BiGroup,
  BiListCheck,
  BiLogOut,
  BiRun,
  BiUser,
} from 'react-icons/bi'

import { routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AccountHeader from 'src/components/AccountHeader'
import NavGroup from 'src/components/NavGroup'
import NavItem from 'src/components/NavItem'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logOut, currentUser } = useAuth()

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
                  to={routes.adminHome()}
                />

                <NavItem
                  icon={<BiUser />}
                  label="Dashboard"
                  to={routes.dashboard()}
                />
              </Stack>
              <NavGroup label="Events">
                <NavItem
                  icon={<BiCalendar />}
                  label="Events"
                  to={routes.events()}
                />
              </NavGroup>

              <NavGroup label="Fantasy">
                <NavItem
                  icon={<BiCalendarEvent />}
                  label="Events"
                  to={routes.adminFantasyEvents()}
                />

                <NavItem
                  icon={<BiGroup />}
                  label="Teams"
                  to={routes.fantasyTeams()}
                />

                <NavItem
                  icon={<BiListCheck />}
                  label="Rules"
                  to={routes.fantasyTeamRules()}
                />
              </NavGroup>

              <NavGroup label="Runners">
                <NavItem
                  icon={<BiRun />}
                  label="Runners"
                  to={routes.runners()}
                />
              </NavGroup>
            </Stack>

            <Box>
              <Stack spacing="1">
                <NavItem subtle icon={<BiCog />} label="Settings" />
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

export default AdminLayout
