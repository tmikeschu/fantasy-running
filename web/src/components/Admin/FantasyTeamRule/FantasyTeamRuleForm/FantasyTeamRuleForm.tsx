import {
  Box,
  FormControl,
  VStack,
  ButtonGroup,
  Button,
  Stack,
} from '@chakra-ui/react'
import type {
  CreateFantasyTeamRuleInput,
  EditFantasyTeamRuleById,
  UpdateFantasyTeamRuleInput,
} from 'types/graphql'

import { Controller, Form, Submit, useForm } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { back } from '@redwoodjs/router'

import AdminNumberField from 'src/components/Admin/AdminNumberField/AdminNumberField'
import FormErrorMessage from 'src/components/forms/FormErrorMessage'
import FormLabel from 'src/components/forms/FormLabel'

type FormFantasyTeamRule = NonNullable<
  EditFantasyTeamRuleById['fantasyTeamRule']
>

interface FantasyTeamRuleFormProps {
  fantasyTeamRule?: EditFantasyTeamRuleById['fantasyTeamRule']
  onSave: (
    data: CreateFantasyTeamRuleInput | UpdateFantasyTeamRuleInput,
    id?: FormFantasyTeamRule['id']
  ) => void
  error?: RWGqlError
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
            <Controller
              name="pickNumberFrom"
              defaultValue={props.fantasyTeamRule?.pickNumberFrom}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  id="pickNumberFrom"
                  isRequired
                  isInvalid={Boolean(formState.errors.pickNumberFrom)}
                >
                  <FormLabel>From seed</FormLabel>

                  <AdminNumberField {...field} />

                  <FormErrorMessage />
                </FormControl>
              )}
            />

            <Controller
              name="pickNumberTo"
              defaultValue={props.fantasyTeamRule?.pickNumberTo}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  id="pickNumberTo"
                  isRequired
                  isInvalid={Boolean(formState.errors.pickNumberTo)}
                >
                  <FormLabel name="pickNumberTo">To seed</FormLabel>

                  <AdminNumberField {...field} />

                  <FormErrorMessage />
                </FormControl>
              )}
            />
          </Stack>

          <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" w="full">
            <Controller
              name="rankMin"
              defaultValue={props.fantasyTeamRule?.rankMin}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  id="rankMin"
                  isRequired
                  isInvalid={Boolean(formState.errors.rankMin)}
                >
                  <FormLabel>Rank min</FormLabel>
                  <AdminNumberField {...field} />

                  <FormErrorMessage />
                </FormControl>
              )}
            />

            <Controller
              name="rankMax"
              defaultValue={props.fantasyTeamRule?.rankMax}
              render={({ field }) => (
                <FormControl
                  id="rankMax"
                  isInvalid={Boolean(formState.errors.rankMax)}
                >
                  <FormLabel>Rank max</FormLabel>

                  <AdminNumberField {...field} />

                  <FormErrorMessage />
                </FormControl>
              )}
            />
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
