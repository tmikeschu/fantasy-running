import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  PropsOf,
  forwardRef,
  useFormControlContext,
} from '@chakra-ui/react'

import { NumberField as RwNumberField } from '@redwoodjs/forms'

const AdminNumberField = forwardRef<
  Partial<PropsOf<typeof RwNumberField>>,
  'input'
>((props, ref) => {
  const { id } = useFormControlContext()
  return (
    <NumberInput>
      <NumberInputField
        as={RwNumberField}
        {...props}
        name={props.name ?? id}
        ref={ref}
        validation={{ valueAsNumber: true, ...props.validation }}
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
})

export default AdminNumberField
