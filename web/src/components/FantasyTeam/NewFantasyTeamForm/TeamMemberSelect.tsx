import { FormControl, FormLabel } from '@chakra-ui/react'
import { Select, Props, SelectInstance } from 'chakra-react-select'
import { match } from 'ts-pattern'
import { FindNewFantasyTeamQuery } from 'types/graphql'

import { useFormContext } from '@redwoodjs/forms'

import { pubsub } from './pubsub'

export type SelectKey = `pick-${number}-${string}`
export type SelectOption = { label: string; value: string }

export type TeamMemberSelectProps = Props<SelectOption, false> & {
  pickNumber: number
  runners: NonNullable<
    FindNewFantasyTeamQuery['fantasyEvent']
  >['event']['eventRunners']
  rule: NonNullable<FindNewFantasyTeamQuery['fantasyEvent']>['rules'][number]
  fieldKey: SelectKey
}

export const TeamMemberSelect = ({
  runners,
  pickNumber,
  rule,
  fieldKey,
  ...props
}: TeamMemberSelectProps) => {
  const { getValues } = useFormContext()
  const ref = React.useRef<SelectInstance<SelectOption, false>>(null)

  React.useEffect(() => {
    return pubsub.subscribe((event) => {
      match(event)
        .with({ type: 'AUTO_FOCUS', fieldKey }, () => {
          setTimeout(() => {
            ref.current?.onMenuOpen()
            ref.current?.focus()
          }, 300)
        })
        .otherwise(() => {})
    })
  }, [fieldKey])

  return (
    <FormControl w="full">
      <FormLabel>Pick {pickNumber}</FormLabel>

      <Select
        {...props}
        ref={ref}
        isOptionDisabled={(option) => {
          return Object.entries(getValues())
            .filter(entryIsTeamPick)
            .some(([_key, value]) => value?.value === option.value)
        }}
        options={runners
          .slice(rule?.rankMin - 1, rule?.rankMax ?? Infinity)
          .map((r) => ({
            value: r.id,
            label: r.runner.name,
          }))}
      />
    </FormControl>
  )
}

export function entryIsTeamPick(
  entry: unknown
): entry is [string, SelectOption] {
  return Array.isArray(entry) && entry[0]?.startsWith('pick-')
}
