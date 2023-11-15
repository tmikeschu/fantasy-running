import { HStack, IconButton } from '@chakra-ui/react'
import { BiEditAlt, BiSolidBullseye, BiTrashAlt } from 'react-icons/bi'

import { Link } from '@redwoodjs/router'

import { useAdminTableContext } from '../AdminTableWrapper/AdminTableWrapper'

type AdminTableCrudActionsProps = {
  id: string
}

const AdminTableCrudContext = React.createContext<
  (AdminTableCrudActionsProps & { resource: string }) | undefined
>(undefined)

const AdminTableCrudProvider = ({
  children,
  ...props
}: React.PropsWithChildren<AdminTableCrudActionsProps>) => {
  const { resource } = useAdminTableContext()
  const value = React.useMemo(() => {
    return { ...props, resource }
  }, [props, resource])
  return (
    <AdminTableCrudContext.Provider value={value}>
      {children}
    </AdminTableCrudContext.Provider>
  )
}

const useContext = () => {
  const context = React.useContext(AdminTableCrudContext)
  if (!context) {
    throw new Error(
      `AdminTableCrudContext must be used within an AdminTableCrudActions`
    )
  }
  return context
}

const Wrapper = (
  props: React.PropsWithChildren<AdminTableCrudActionsProps>
) => {
  return (
    <AdminTableCrudProvider {...props}>
      <HStack spacing="2" justifyContent="flex-end">
        {props.children}
      </HStack>
    </AdminTableCrudProvider>
  )
}

type ShowProps = {
  to: string
}
const Show = ({ to }: ShowProps) => {
  const { id, resource } = useContext()

  return (
    <IconButton
      as={Link}
      color="gray.600"
      icon={<BiSolidBullseye />}
      variant="ghost"
      aria-label={`View ${resource}`}
      to={to}
      title={`Show ${resource} ${id} detail`}
    />
  )
}

type EditProps = {
  to: string
}

const Edit = ({ to }: EditProps) => {
  const { resource, id } = useContext()

  return (
    <IconButton
      as={Link}
      color="gray.600"
      icon={<BiEditAlt />}
      variant="ghost"
      aria-label={`Edit ${resource}`}
      to={to}
      title={`Edit ${resource} ${id}`}
    />
  )
}

type DeleteProps = {
  onClick: (id: string) => void
}

const Delete = ({ onClick }: DeleteProps) => {
  const { resource, id } = useContext()

  return (
    <IconButton
      color="red.500"
      as={Link}
      icon={<BiTrashAlt />}
      variant="ghost"
      aria-label="Delete event"
      title={`Edit ${resource} ${id}`}
      onClick={() => onClick(id)}
    />
  )
}

const AdminTableCrudAction = {
  Show,
  Edit,
  Delete,
  Wrapper: Wrapper,
  useContext,
}

export default AdminTableCrudAction
