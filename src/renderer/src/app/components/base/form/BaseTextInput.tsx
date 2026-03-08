import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@app/components/ui/form'
import { Input } from '@app/components/ui/input'

export interface BaseTextInputProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  'name' | 'defaultValue'
> {
  control: Control<T>
  name: Path<T>
  label: string
}

export const BaseTextInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: BaseTextInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
