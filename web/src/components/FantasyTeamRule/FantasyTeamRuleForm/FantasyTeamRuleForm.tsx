import {
  Box,
  FormControl,
  VStack,
  ButtonGroup,
  Button,
  Stack,
} from '@chakra-ui/react'
import type {
  EditFantasyTeamRuleById,
  UpdateFantasyTeamRuleInput,
} from 'types/graphql'

import { Form, Submit, useForm } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { back } from '@redwoodjs/router'

import AdminNumberField from 'src/components/AdminNumberField/AdminNumberField'
import FormErrorMessage from 'src/components/FormErrorMessage'
import FormLabel from 'src/components/FormLabel'

type FormFantasyTeamRule = NonNullable<
  EditFantasyTeamRuleById['fantasyTeamRule']
>

interface FantasyTeamRuleFormProps {
  fantasyTeamRule?: EditFantasyTeamRuleById['fantasyTeamRule']
  onSave: (
    data: UpdateFantasyTeamRuleInput,
    id?: FormFantasyTeamRule['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const FantasyTeamRuleForm = (props: FantasyTeamRuleFormProps) => {
  const onSubmit = (data: FormFantasyTeamRule) => {
    props.onSave(data, props?.fantasyTeamRule?.id)
  }

  const formMethods = useForm<FormFantasyTeamRule>()
  const { formState } = formMethods

  return (
    <Box maxW="xl">
      <Form<FormFantasyTeamRule>
        onSubmit={onSubmit}
        error={props.error}
        formMethods={formMethods}
      >
        <VStack alignItems="flex-start">
          <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" w="full">
            <FormControl
              id="pickNumberFrom"
              isRequired
              isInvalid={Boolean(formState.errors.pickNumberFrom)}
            >
              <FormLabel>From seed</FormLabel>

              <AdminNumberField
                defaultValue={props.fantasyTeamRule?.pickNumberFrom}
                validation={{ required: true }}
              />

              <FormErrorMessage />
            </FormControl>

            <FormControl
              id="pickNumberTo"
              isRequired
              isInvalid={Boolean(formState.errors.pickNumberTo)}
            >
              <FormLabel name="pickNumberTo">To seed</FormLabel>

              <AdminNumberField
                defaultValue={props.fantasyTeamRule?.pickNumberTo}
                validation={{ required: true }}
              />

              <FormErrorMessage />
            </FormControl>
          </Stack>

          <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" w="full">
            <FormControl
              id="rankMin"
              isRequired
              isInvalid={Boolean(formState.errors.rankMin)}
            >
              <FormLabel>Rank min</FormLabel>
              <AdminNumberField
                defaultValue={props.fantasyTeamRule?.rankMin}
                validation={{ required: true }}
              />

              <FormErrorMessage />
            </FormControl>

            <FormControl
              id="rankMax"
              isRequired
              isInvalid={Boolean(formState.errors.rankMax)}
            >
              <FormLabel>Rank max</FormLabel>

              <AdminNumberField
                defaultValue={props.fantasyTeamRule?.rankMax}
                validation={{ required: true }}
              />

              <FormErrorMessage />
            </FormControl>
          </Stack>

          <ButtonGroup justifyContent="flex-end" w="full">
            <Button onClick={back}>Cancel</Button>

            <Button
              as={Submit}
              type="submit"
              disabled={props.loading}
              colorScheme="blue"
            >
              Save
            </Button>
          </ButtonGroup>
        </VStack>
      </Form>
    </Box>
  )
}

export default FantasyTeamRuleForm
