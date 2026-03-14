import { z } from 'zod'
import { useForm, type UseFormProps, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateId, generateTimestamp, type BaseEntity } from '@/app/lib/base'

type CrudMode = 'create' | 'update'

export interface CrudFormProps<T extends BaseEntity> {
  crudMode: CrudMode
  defaultValues?: T
  onSuccess: () => void
}

interface UseCrudFormProps<
  TFormValues extends FieldValues,
  TEntity extends BaseEntity
> extends Omit<UseFormProps<TFormValues>, 'resolver'> {
  crudMode: CrudMode
  formSchema: z.ZodType<any, any, any>
  entityId?: TEntity['id']
  transform?: (data: TFormValues) => Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>
  createItem?: (item: TEntity) => Promise<any>
  updateItem?: (item: TEntity) => Promise<any>
  onSuccess?: () => void
}

export const useCrudForm = <TFormValues extends FieldValues, TEntity extends BaseEntity>({
  crudMode,
  formSchema,
  entityId,
  transform,
  createItem,
  updateItem,
  onSuccess,
  ...useFormOptions
}: UseCrudFormProps<TFormValues, TEntity>) => {
  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    ...useFormOptions
  })

  const onSubmit = async (data: TFormValues) => {
    try {
      const baseData = transform ? transform(data) : data
      const now = generateTimestamp()

      if (crudMode === 'create') {
        if (!createItem) throw new Error('createItem is not provided')
        await createItem({
          ...baseData,
          id: entityId || generateId(),
          createdAt: now,
          updatedAt: now
        } as unknown as TEntity)
      } else {
        if (!entityId || !updateItem) throw new Error('Missing entityId or updateItem')
        await updateItem({
          ...baseData,
          id: entityId,
          updatedAt: now
        } as unknown as TEntity)
      }

      onSuccess?.()
    } catch (error) {
      console.error('Failed to submit form', error)
    }
  }

  return { form, onSubmit }
}
