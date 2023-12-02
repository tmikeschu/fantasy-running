import { Box, HStack, PropsOf } from '@chakra-ui/react'

import { Link, useLocation } from '@redwoodjs/router'

import { useSidebarLayoutContext } from '../SidebarLayout/useSidebarLayoutContext'

interface NavItemProps extends Partial<PropsOf<typeof Link>> {
  label: string
  subtle?: boolean
  icon: React.ReactElement
}

const NavItem = (props: NavItemProps) => {
  const { subtle, icon, label, to, onClick: _onClick } = props
  const onClick = _onClick as React.MouseEventHandler<HTMLElement>
  const { disclosure } = useSidebarLayoutContext()
  const location = useLocation()
  const active = location.pathname === to
  return (
    <HStack<typeof Link>
      {...(to
        ? {
            as: Link,
            to,
            onClick: (e) => {
              disclosure.onClose()
              onClick?.(e)
            },
          }
        : { onClick })}
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
    </HStack>
  )
}

export default NavItem
