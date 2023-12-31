import { Box, Stack, Text } from '@chakra-ui/react'

interface NavGroupProps {
  label: string
}

const NavGroup = (props: React.PropsWithChildren<NavGroupProps>) => {
  const { label, children } = props
  return (
    <Box>
      <Text
        px="3"
        fontSize={{ base: 'md', md: 'xs' }}
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
export default NavGroup
