import {
  Box,
  useColorModeValue as mode,
  Grid,
  GridItem,
  IconButton,
  DarkMode,
  GridItemProps,
  Show,
  useDisclosure,
} from '@chakra-ui/react'
import { BiMenu, BiX } from 'react-icons/bi'
import { match } from 'ts-pattern'

import { SidebarLayoutProvider } from './useSidebarLayoutContext'

type SidebarLayoutProps = {
  children?: React.ReactNode
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  let sidebar: React.ReactElement | null = null
  let content: React.ReactElement | null = null

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    match(child.type)
      .with(SidebarLayoutSidebar, () => (sidebar = child))
      .with(SidebarLayoutContent, () => (content = child))
      .otherwise(() => {})
  })
  const disclosure = useDisclosure()

  return (
    <SidebarLayoutProvider disclosure={disclosure}>
      <Grid
        height="100vh"
        overflow="hidden"
        position="relative"
        gridTemplateColumns={{
          base: disclosure.isOpen ? '1fr 0' : '0 1fr',
          md: `var(--chakra-sizes-64) 1fr`,
        }}
        gridTemplateAreas={`"sidebar content"`}
        transition="all 0.2s"
        gridTemplateRows="1fr"
        alignContent="stretch"
      >
        <Show below="md">
          <Box
            zIndex={1}
            position="absolute"
            transition="left 0.2s"
            p="1"
            top="0"
            {...(disclosure.isOpen
              ? {
                  left: '100%',
                  transform: 'translateX(-100%)',
                }
              : {
                  left: '0',
                  icon: <BiMenu />,
                })}
          >
            <IconButton
              onClick={disclosure.onToggle}
              rounded="full"
              fontSize="lg"
              variant="ghost"
              {...(disclosure.isOpen
                ? {
                    icon: <BiX color="white" />,
                    'aria-label': 'Close menu',
                    _hover: { bg: 'gray.700' },
                  }
                : {
                    icon: <BiMenu />,
                    'aria-label': 'Open menu',
                  })}
            />
          </Box>
        </Show>
        <DarkMode>
          <GridItem gridArea="sidebar" position="relative" overflow="hidden">
            <Box
              bg="gray.900"
              color="white"
              fontSize="sm"
              flexShrink="0"
              h="full"
              w="full"
              pr="8"
            >
              {sidebar}
            </Box>
          </GridItem>
        </DarkMode>

        <GridItem gridArea="content">
          <Box bg={mode('white', 'gray.800')} flex="1" p="6" overflow="hidden">
            <Box w="full" h="full" rounded="lg">
              {content}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </SidebarLayoutProvider>
  )
}

export const SidebarLayoutContent = (props: GridItemProps) => (
  <GridItem gridArea="content" {...props} />
)

export const SidebarLayoutSidebar = (props: GridItemProps) => (
  <GridItem gridArea="sidebar" {...props} />
)

export default SidebarLayout
