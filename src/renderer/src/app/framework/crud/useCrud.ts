import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { BaseEntity } from '@shared/app/lib/base'

interface CrudApi<T> {
  getAll: () => Promise<T[]>
  insert: (item: T) => Promise<{ success: boolean }>
  update: (item: T) => Promise<{ success: boolean }>
  delete: (id: string) => Promise<{ success: boolean }>
  bulkDelete: (ids: string[]) => Promise<{ success: boolean }>
}

/**
 * 汎用的なCRUD操作を提供する React Query カスタムフック
 * @param queryKeyName キャッシュを管理するためのキー (例: 'roles')
 * @param api window.api配下の対象オブジェクト (例: window.api.role)
 */
export const useCrud = <T extends BaseEntity>(queryKeyName: string, api: CrudApi<T>) => {
  const queryClient = useQueryClient()
  const queryKey = [queryKeyName]

  const {
    data: items = [],
    isLoading,
    error
  } = useQuery({
    queryKey,
    queryFn: () => api.getAll()
  })

  const insertMutation = useMutation({
    mutationFn: (item: T) => api.insert(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  const updateMutation = useMutation({
    mutationFn: (item: T) => api.update(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => api.bulkDelete(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  })

  return {
    items,
    isLoading,
    error,
    insertItem: insertMutation.mutateAsync,
    updateItem: updateMutation.mutateAsync,
    deleteItem: deleteMutation.mutateAsync,
    bulkDeleteItems: bulkDeleteMutation.mutateAsync,
    isMutating:
      insertMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      bulkDeleteMutation.isPending
  }
}
