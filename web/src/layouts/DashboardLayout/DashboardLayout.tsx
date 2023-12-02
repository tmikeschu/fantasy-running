import { Box, Flex, Stack } from '@chakra-ui/react'
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
import SidebarLayout, {
  SidebarLayoutContent,
  SidebarLayoutSidebar,
} from 'src/components/SidebarLayout/SidebarLayout'

type DashboardLayoutProps = {
  children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logOut, hasRole, currentUser } = useAuth()
  const isAdmin = hasRole('ADMIN')

  return (
    <SidebarLayout>
      <SidebarLayoutSidebar>
        <Flex h="full" direction="column" px="4" py="4">
          {currentUser && <AccountHeader {...{ currentUser }} />}
          <Stack spacing="8" flex="1" overflow="auto" pt="8">
            <Stack spacing="1">
              <NavItem icon={<BiRun />} label="Home" to={routes.dashboard()} />
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
      </SidebarLayoutSidebar>

      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </SidebarLayout>
  )
}

export default DashboardLayout
