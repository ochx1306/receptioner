import { createFileRoute } from '@tanstack/react-router'
import { TodoApp } from '@renderer/components/ToDoApp'

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
