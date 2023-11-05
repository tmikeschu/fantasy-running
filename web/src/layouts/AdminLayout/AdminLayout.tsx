import {
  Box,
  Flex,
  Stack,
  useColorModeValue as mode,
  FlexProps,
  HStack,
  Img,
  Text,
  PropsOf,
} from '@chakra-ui/react'
import {
  BiCalendar,
  BiCog,
  BiGroup,
  BiListCheck,
  BiRun,
  BiSolidMagicWand,
  BiTestTube,
} from 'react-icons/bi'
import { BsCaretRightFill } from 'react-icons/bs'

import { Link, routes, useLocation } from '@redwoodjs/router'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm" flexShrink="0">
          <Flex h="full" direction="column" px="4" py="4">
            <AccountHeader />
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <Stack spacing="1">
                <NavItem
                  icon={<BiRun />}
                  label="Home"
                  to={routes.adminHome()}
                />
              </Stack>
              <NavGroup label="Events">
                <NavItem
                  icon={<BiCalendar />}
                  label="Events"
                  to={routes.events()}
                />

                <NavItem
                  icon={<BiTestTube />}
                  label="Performances"
                  to={routes.performances()}
                />
              </NavGroup>

              <NavGroup label="Fantasy">
                <NavItem
                  icon={<BiSolidMagicWand />}
                  label="Events"
                  to={routes.fantasyEvents()}
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
                <NavItem subtle icon={<BiCog />} label="Settings" to="#" />
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

export const AccountHeader = (props: FlexProps) => {
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
          src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbiUyMHNpbWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100"
          alt="Chakra UI"
        />
        <Box textAlign="start">
          <Box noOfLines={1} fontWeight="semibold">
            Chakra UI
          </Box>
          <Box fontSize="xs" color="gray.400">
            ID 123343
          </Box>
        </Box>
      </HStack>
    </Flex>
  )
}

interface NavGroupProps {
  label: string
}

export const NavGroup = (props: React.PropsWithChildren<NavGroupProps>) => {
  const { label, children } = props
  return (
    <Box>
      <Text
        px="3"
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="widest"
        color="gray.500"
        mb="3"
      >
        {label}
      </Text>
      <Stack spacing="1">{children}</Stack>
    </Box>
  )
}

interface NavItemProps extends PropsOf<typeof Link> {
  label: string
  subtle?: boolean
  icon: React.ReactElement
  endElement?: React.ReactElement
}

export const NavItem = (props: React.PropsWithChildren<NavItemProps>) => {
  const { subtle, icon, children, label, endElement, to } = props
  const location = useLocation()
  const active = location.pathname === to
  return (
    <HStack
      as={Link}
      to={to}
      w="full"
      px="3"
      py="2"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.600' }}
    >
      <Box fontSize="lg" color={active ? 'currentcolor' : 'gray.400'}>
        {icon}
      </Box>
      <Box
        flex="1"
        fontWeight="inherit"
        color={subtle ? 'gray.400' : undefined}
      >
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}
