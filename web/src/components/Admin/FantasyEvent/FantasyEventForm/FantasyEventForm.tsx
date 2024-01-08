import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  VStack,
  Textarea,
  Link,
  Input,
  List,
  ListItem,
  Card,
  CardBody,
  Icon,
  Center,
  Text,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  IconButton,
} from '@chakra-ui/react'
import { upload } from '@vercel/blob/client'
import { Select } from 'chakra-react-select'
import { BiGift, BiX } from 'react-icons/bi'
import { Option } from 'space-monad'
import { P, match } from 'ts-pattern'
import {
  PrizeBlobInput,
  type CreateFantasyEventInput,
  type EditFantasyEventById,
  type Event,
  type FantasyEventStatus,
  type FantasyPrizeInput,
  type FantasyTeamRule,
  type UpdateFantasyEventInput,
} from 'types/graphql'

import {
  Form,
  Submit,
  Controller,
  useForm,
  TextField,
  FileField,
  TextAreaField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { back } from '@redwoodjs/router'

import AdminNumberField from 'src/components/Admin/AdminNumberField/AdminNumberField'
import FormErrorMessage from 'src/components/forms/FormErrorMessage/FormErrorMessage'
import FormLabel from 'src/components/forms/FormLabel/FormLabel'

type FormFantasyEvent = Omit<CreateFantasyEventInput, 'prizes'> & {
  id?: string
  prizeFiles: Record<string, FileList>
  prizesMap: Record<string, FantasyPrizeInput>
}

interface FantasyEventFormProps {
  fantasyEvent?: EditFantasyEventById['fantasyEvent']
  onSave: (
    input: CreateFantasyEventInput | UpdateFantasyEventInput,
    id?: FormFantasyEvent['id']
  ) => void
  error?: RWGqlError
  loading: boolean
  events: Pick<Event, 'id' | 'name'>[]
  fantasyTeamRules: Pick<
    FantasyTeamRule,
    'id' | 'pickNumberFrom' | 'pickNumberTo' | 'rankMin' | 'rankMax'
  >[]
}

const FantasyEventForm = (props: FantasyEventFormProps) => {
  const onSubmit = async ({
    prizesMap,
    prizeFiles,
    ...data
  }: FormFantasyEvent) => {
    const prizesWithBlobs = await Promise.all(
      Object.values(prizesMap).flatMap(async (prize) => {
        // TODO prevent duplicate saves
        const files = prizeFiles[prize.id ?? ''] ?? []
        const newBlobs = await Promise.all(
          Array.from(files).map(async (file) => {
            const blob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/fantasyEventPrizeBlobUpload',
            })

            return {
              url: blob.url,
              name: `${process.env.NODE_ENV ?? 'default'}/prize-blobs/${
                blob.pathname
              }`,
            } satisfies PrizeBlobInput
          })
        )
        const blobs = [...prize.blobs, ...newBlobs]
        return { ...prize, blobs } satisfies FantasyPrizeInput
      })
    )
    console.log({ prizesWithBlobs, prizeFiles })
    props.onSave({ ...data, prizes: prizesWithBlobs }, props.fantasyEvent?.id)
  }

  const eventOptions = React.useMemo(() => {
    return props.events.map((event) => ({
      value: event.id,
      label: event.name,
    }))
  }, [props.events])

  const eventOptionsMap = React.useMemo(() => {
    return new Map(eventOptions.map((option) => [option.value, option]))
  }, [eventOptions])

  const ruleOptions = React.useMemo(
    () =>
      props.fantasyTeamRules.map((rule) => ({
        value: rule.id,
        label: `Picks ${rule.pickNumberFrom} to ${rule.pickNumberTo} have rank ${rule.rankMin} to ${rule.rankMax}`,
      })),
    [props.fantasyTeamRules]
  )

  const ruleOptionsMap = React.useMemo(() => {
    return new Map(ruleOptions.map((option) => [option.value, option]))
  }, [ruleOptions])

  const formMethods = useForm<FormFantasyEvent>({
    defaultValues: {
      prizesMap: Object.fromEntries(
        props.fantasyEvent?.prizes.map(({ __typename: _, blobs, ...prize }) => [
          prize.id,
          { ...prize, blobs: blobs.map(({ __typename: _, ...blob }) => blob) },
        ]) ?? []
      ),
      prizeFiles: {},
    },
  })

  const defaultName =
    props.fantasyEvent?.name ??
    props.fantasyEvent?.event.name ??
    props.events.find((e) => e.id === formMethods.getValues().eventId)?.name ??
    ''

  const statusOptions = (
    ['PENDING', 'LIVE', 'COMPLETE'] as FantasyEventStatus[]
  ).map((status) => ({ value: status, label: status }))
  const statusOptionsMap = new Map(
    statusOptions.map((option) => [option.value, option])
  )

  const [selectedPrizeId, setSelectedPrizeId] = React.useState<
    string | undefined
  >()
  const [isOpen, setIsOpen] = React.useState(false)

  const prizesMap = formMethods.watch('prizesMap')
  const prizeFiles = formMethods.watch('prizeFiles')

  return (
    <Box maxW="xl">
      <Form<FormFantasyEvent>
        onSubmit={onSubmit}
        error={props.error}
        formMethods={formMethods}
      >
        <VStack alignItems="flex-start">
          <Controller<FormFantasyEvent, 'eventId'>
            name="eventId"
            defaultValue={props.fantasyEvent?.eventId}
            render={({ field }) => (
              <FormControl id="eventId" isRequired>
                <FormLabel>Event id</FormLabel>

                <Select
                  {...field}
                  onChange={(value) => {
                    if (!value) return
                    field.onChange({ target: { value: value.value } })
                  }}
                  name="eventId"
                  value={
                    Option(field.value)
                      .map((id) => eventOptionsMap.get(id))
                      .get() ?? null
                  }
                  placeholder="Select event"
                  options={eventOptions}
                />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <FormControl
            id="name"
            isRequired
            isInvalid={Boolean(formMethods.formState.errors.name)}
          >
            <FormLabel>Name</FormLabel>

            <Input
              as={TextField}
              name="name"
              defaultValue={defaultName}
              validation={{ required: true }}
            />

            <FormErrorMessage />
          </FormControl>

          <Controller<FormFantasyEvent, 'status'>
            name="status"
            defaultValue={props.fantasyEvent?.status}
            render={({ field }) => (
              <FormControl id="status" isRequired>
                <FormLabel>Status</FormLabel>

                <Select
                  {...field}
                  onChange={(value) => {
                    if (!value) return
                    field.onChange({ target: { value: value.value } })
                  }}
                  name="status"
                  value={
                    Option(field.value)
                      .map((status) => statusOptionsMap.get(status))
                      .get() ?? null
                  }
                  placeholder="Select status"
                  options={statusOptions}
                />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller
            name="teamSize"
            defaultValue={props.fantasyEvent?.teamSize}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl id="teamSize" isRequired>
                <FormLabel>Team size</FormLabel>

                <AdminNumberField {...field} placeholder="e.g., 7" />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller
            name="teamCount"
            defaultValue={props.fantasyEvent?.teamCount ?? 1}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl id="teamSize" isRequired>
                <FormLabel>Team count</FormLabel>

                <AdminNumberField {...field} />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller<FormFantasyEvent, 'ruleIds'>
            name="ruleIds"
            defaultValue={props.fantasyEvent?.rules
              .map((rule) => rule?.id)
              .filter(Boolean)}
            render={({ field }) => (
              <FormControl id="ruleIds" isRequired>
                <FormLabel>Rules</FormLabel>

                <Select
                  {...field}
                  onChange={(values) => {
                    field.onChange({
                      target: { value: values.map((v) => v.value) },
                    })
                  }}
                  value={field.value?.reduce((acc, rule) => {
                    Option(rule)
                      .map((id) => ruleOptionsMap.get(id))
                      .forEach((r) => acc.push(r))
                    return acc
                  }, [] as { value: string; label: string }[])}
                  placeholder="Select rules"
                  getOptionLabel={(option) => option.label}
                  isMulti
                  options={ruleOptions}
                />

                <FormErrorMessage />
              </FormControl>
            )}
          />

          <Controller
            name="description"
            defaultValue={props.fantasyEvent?.description ?? ''}
            render={({ field }) => (
              <FormControl id="description">
                <FormLabel>Description</FormLabel>

                <Textarea placeholder="Choose your squad..." {...field} />

                <FormHelperText>
                  Supports{' '}
                  <Link
                    href="https://www.markdownguide.org/basic-syntax/"
                    isExternal
                  >
                    Markdown syntax
                  </Link>
                </FormHelperText>
              </FormControl>
            )}
          />

          <List display="flex" gap="4" w="full" overflowX="auto" py="2" pr="2">
            {Object.values(prizesMap)
              .sort((a, b) => Number(a.rank ?? 0) - Number(b.rank ?? 0))
              .map((prize) => (
                <Card
                  minW="0"
                  flexShrink={0}
                  key={prize.id}
                  w="2xs"
                  h="2xs"
                  role="button"
                  _hover={{ cursor: 'pointer', boxShadow: 'lg' }}
                  onClick={() => {
                    setSelectedPrizeId(prize.id ?? 'unknown')
                    setIsOpen(true)
                  }}
                >
                  <IconButton
                    position="absolute"
                    variant="ghost"
                    top="1"
                    right="1"
                    icon={<BiX />}
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      const { [prize.id ?? '']: _, ...newValue } = prizesMap
                      formMethods.setValue('prizesMap', newValue)
                    }}
                  />
                  <CardBody display="flex" flexDir="column" gap="4">
                    <VStack alignItems="flex-start" gap="1">
                      <Text fontWeight="bold">{prize.name}</Text>
                      <Text>Prize #{prize.rank}</Text>
                    </VStack>
                    {(
                      Array.from(prizeFiles[prize.id ?? ''] ?? []) as Array<
                        string | File
                      >
                    )
                      .concat(prize.blobs.map((b) => b.url))
                      .filter(Boolean)
                      .slice(0, 1)
                      .map((file) => {
                        const { key, url } = match(file)
                          .with(P.string, (url) => ({ key: url, url }))
                          .otherwise((file) => {
                            const blob = new Blob([file], {
                              type: 'image/jpeg',
                            })
                            const blobUrl = URL.createObjectURL(blob)
                            return { key: file.name, url: blobUrl }
                          })
                        return <Image w="32" key={key} src={url} />
                      })}
                  </CardBody>
                </Card>
              ))}

            <ListItem>
              <Card
                minW="0"
                flexShrink={0}
                w="2xs"
                h="2xs"
                role="button"
                onClick={() => {
                  const current = { ...prizesMap }
                  const prizesLength = Object.keys(current).length
                  const id = `NEW${prizesLength}`
                  const newValue = {
                    ...current,
                    [id]: {
                      id,
                      blobs: [],
                      name: '',
                      rank: prizesLength + 1,
                    },
                  }
                  formMethods.setValue('prizesMap', newValue)
                  setSelectedPrizeId(id)
                  setIsOpen(true)
                }}
                _hover={{ cursor: 'pointer', boxShadow: 'lg' }}
              >
                <CardBody as={Center} flexDir="column" color="gray.600" gap="4">
                  <Text fontWeight="medium">Add prize</Text>
                  <Icon fontSize="xl" as={BiGift} />
                </CardBody>
              </Card>
            </ListItem>
          </List>

          <ButtonGroup w="full" justifyContent="flex-end">
            <Button onClick={back}>Cancel</Button>
            <Button
              as={Submit}
              type="submit"
              isLoading={props.loading}
              colorScheme="blue"
            >
              Save
            </Button>
          </ButtonGroup>
        </VStack>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New prize</ModalHeader>
            <ModalCloseButton />
            {selectedPrizeId ? (
              <ModalBody>
                <FormControl id={`prizesMap.${selectedPrizeId}.name`}>
                  <FormLabel>Name</FormLabel>

                  <Input
                    as={TextField}
                    name={`prizesMap.${selectedPrizeId}.name`}
                    defaultValue={prizesMap[selectedPrizeId]?.name ?? ''}
                  />
                </FormControl>

                <FormControl id={`prizesMap.${selectedPrizeId}.rank`}>
                  <FormLabel>Rank</FormLabel>

                  <Input
                    as={TextField}
                    defaultValue={prizesMap[selectedPrizeId]?.rank ?? 0}
                    name={`prizesMap.${selectedPrizeId}.rank`}
                    validation={{ valueAsNumber: true }}
                  />
                </FormControl>

                <FormControl id={`prizesMap.${selectedPrizeId}.description`}>
                  <FormLabel>Description</FormLabel>

                  <Textarea
                    as={TextAreaField}
                    placeholder="This prize is sweet"
                    defaultValue={prizesMap[selectedPrizeId]?.description ?? ''}
                    name={`prizesMap.${selectedPrizeId}.description`}
                  />
                </FormControl>

                {prizesMap[selectedPrizeId]?.blobs.length ? (
                  <List
                    display="flex"
                    gap="4"
                    w="full"
                    overflowX="auto"
                    py="2"
                    pr="2"
                  >
                    {prizesMap[selectedPrizeId].blobs.map((blob) => (
                      <ListItem key={blob.id ?? ''}>
                        <Image w="32" src={blob.url} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <>
                    <FileField
                      name={`prizeFiles.${selectedPrizeId}`}
                      multiple
                    />
                    <List
                      display="flex"
                      gap="4"
                      w="full"
                      overflowX="auto"
                      py="2"
                      pr="2"
                    >
                      {Array.from(prizeFiles[selectedPrizeId] ?? []).map(
                        (file) => {
                          const blob = new Blob([file], { type: 'image/jpeg' })
                          const blobURL = URL.createObjectURL(blob)
                          return (
                            <ListItem key={file.name}>
                              <Image w="32" src={blobURL} />
                            </ListItem>
                          )
                        }
                      )}
                    </List>
                  </>
                )}
              </ModalBody>
            ) : null}

            <ModalFooter>
              <ButtonGroup>
                <Button onClick={() => setIsOpen(false)}>Done</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Form>
    </Box>
  )
}

export default FantasyEventForm
