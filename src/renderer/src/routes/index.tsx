import { createFileRoute } from '@tanstack/react-router'
import { TodoApp } from '@/components/ToDoApp'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div className="p-2">
      <TodoApp />
    </div>
  )
}
