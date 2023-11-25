import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react'

export type ErrorAlertProps = {
  message?: string
}
const ErrorAlert: React.FC<React.PropsWithChildren<ErrorAlertProps>> = ({
  message,
}) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>
        {message ?? 'Oops! Something went wrong.'}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert
