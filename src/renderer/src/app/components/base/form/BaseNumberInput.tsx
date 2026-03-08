import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@app/components/ui/form'
import { Input } from '@app/components/ui/input'

export interface BaseNumberInputProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  'name' | 'defaultValue' | 'type'
> {
  control: Control<T>
  name: Path<T>
  label: string
}

export const BaseNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: BaseNumberInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...inputProps}
              {...field}
              // onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
