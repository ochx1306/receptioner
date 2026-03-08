import { createFileRoute } from '@tanstack/react-router'
import { RolePage } from '@/features/role/components/RolePage'

export const Route = createFileRoute('/roles')({
  component: RouteComponent
})

function RouteComponent() {
  return <RolePage />
}
