import type { ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { cn } from '@/app/lib/cn'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@app/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@app/components/ui/select'

export interface SelectOption {
  label: string
  value: string
}

interface BaseSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  options: SelectOption[]
  placeholder?: string
  action?: ReactNode
  disabled?: boolean
  allowClear?: boolean
  clearLabel?: string
}

export const BaseSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  action,
  disabled = false,
  allowClear = false,
  clearLabel = '-'
}: BaseSelectProps<T>) => {
  const UNSELECTED_VALUE = 'unselected'

  const isOptionsEmpty = options.length === 0
  const isDisabled = disabled || isOptionsEmpty

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isEmpty = field.value === null || field.value === undefined || field.value === ''

        const selectValue = isEmpty
          ? allowClear
            ? UNSELECTED_VALUE
            : undefined
          : String(field.value)
        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{label}</FormLabel>
              {action && <div>{action}</div>}
            </div>

            <Select
              disabled={isDisabled}
              onValueChange={(val) => {
                field.onChange(val === UNSELECTED_VALUE ? null : val)
              }}
              value={selectValue}
            >
              <FormControl>
                <SelectTrigger className={cn(isOptionsEmpty && 'bg-muted text-muted-foreground')}>
                  <SelectValue placeholder={isOptionsEmpty ? '選択肢がありません' : placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {allowClear && !isOptionsEmpty && (
                  <SelectItem value={UNSELECTED_VALUE}>{clearLabel}</SelectItem>
                )}
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
