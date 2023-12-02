import { useDisclosure } from '@chakra-ui/react'

type SidebarLayoutContextValue = {
  disclosure: ReturnType<typeof useDisclosure>
}

const SidebarLayoutContext = React.createContext<
  SidebarLayoutContextValue | undefined
>(undefined)

export const useSidebarLayoutContext = () => {
  const context = React.useContext(SidebarLayoutContext)
  if (context === undefined) {
    throw new Error(
      'useSidebarLayoutContext must be used within a SidebarLayoutContextProvider'
    )
  }
  return context
}

export const SidebarLayoutProvider = ({
  disclosure,
  children,
}: React.PropsWithChildren<SidebarLayoutContextValue>) => {
  const value = React.useMemo(() => {
    return { disclosure }
  }, [disclosure])
  return (
    <SidebarLayoutContext.Provider value={value}>
      {children}
    </SidebarLayoutContext.Provider>
  )
}
