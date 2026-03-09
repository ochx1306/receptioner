import { createRootRoute, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppLayout } from '@/app/framework/layout'
import appLogoSrc from '@/assets/app-window.png'
import { APP_CONFIG } from '@/config/app'
import { MAIN_NAV_ITEMS, SUB_NAV_ITEMS } from '@/config/nav-items'

const RootLayout = () => (
  <>
    <AppLayout
      appName={APP_CONFIG.name}
      appLogoSrc={appLogoSrc}
      sidebarContentItems={MAIN_NAV_ITEMS}
      sidebarFooterItems={SUB_NAV_ITEMS}
      version={APP_CONFIG.version}
    >
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </AppLayout>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
