import { Box, Flex, Stack } from '@chakra-ui/react'
import {
  BiCalendar,
  BiCalendarEvent,
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
import SidebarLayout, {
  SidebarLayoutContent,
  SidebarLayoutSidebar,
} from 'src/components/SidebarLayout/SidebarLayout'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logOut, currentUser } = useAuth()

  return (
    <SidebarLayout>
      <SidebarLayoutSidebar>
        <Flex h="full" direction="column" px="4" py="4">
          {currentUser && <AccountHeader {...{ currentUser }} />}
          <Stack spacing="8" flex="1" overflow="auto" pt="8">
            <Stack spacing="1">
              <NavItem
                icon={<BiUser />}
                label="Dashboard"
                to={routes.fantasyEvents()}
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
              <NavItem icon={<BiRun />} label="Runners" to={routes.runners()} />
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

export default AdminLayout
