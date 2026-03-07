import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppLayout } from '@/app/framework/layout'

const RootLayout = () => (
  <>
    <AppLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </AppLayout>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
