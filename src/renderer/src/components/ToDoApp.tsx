import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function TodoApp() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')

  // データの取得 (READ)
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => window.api.getTodos()
  })

  // データの追加 (CREATE)
  const mutation = useMutation({
    mutationFn: (newTitle: string) => window.api.addTodo(newTitle),
    onSuccess: () => {
      // 成功したらキャッシュを破棄して再フェッチを促す
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setTitle('')
    }
  })

  if (isLoading) return <div>読み込み中...</div>

  return (
    <div>
      <h1>ローカルTodoアプリ</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいTodoを追加"
        />
        <button onClick={() => mutation.mutate(title)}>追加</button>
      </div>
    </div>
  )
}
