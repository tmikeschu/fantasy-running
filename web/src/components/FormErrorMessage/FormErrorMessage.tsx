import {
  FormErrorMessageProps as ChErrorMessageProps,
  FormErrorMessage as ChErrorMessage,
  forwardRef,
  useFormControlContext,
} from '@chakra-ui/react'

import { FieldError } from '@redwoodjs/forms'

export type FormErrorMessageProps = ChErrorMessageProps

const FormErrorMessage = forwardRef<FormErrorMessageProps, 'span'>(
  (props, ref) => {
    const { id } = useFormControlContext()
    return (
      <ChErrorMessage ref={ref} {...props}>
        <FieldError name={id} />
      </ChErrorMessage>
    )
  }
)

export default FormErrorMessage
