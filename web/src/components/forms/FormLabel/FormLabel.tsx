import {
  FormLabelProps as ChLabelProps,
  FormLabel as ChLabel,
  forwardRef,
  useFormControlContext,
} from '@chakra-ui/react'

import { Label as RwLabel, LabelProps as RwLabelProps } from '@redwoodjs/forms'

export type FormLabelProps = Partial<ChLabelProps & RwLabelProps>

const FormLabel = forwardRef<FormLabelProps, 'label'>((props, ref) => {
  const { id } = useFormControlContext()
  return <ChLabel as={RwLabel} ref={ref} {...props} name={id} />
})

export default FormLabel
