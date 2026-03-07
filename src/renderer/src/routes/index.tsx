import { createFileRoute } from '@tanstack/react-router'

import type { NavigateOptions } from '@tanstack/react-router'
import { ConfirmNavButton } from '@/app/framework/nav/ConfirmNavButton'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const navigateOptions: NavigateOptions = { to: '/about' }

  return (
    <div className="p-2">
      <ConfirmNavButton navigateOptions={navigateOptions} requireConfirm={false}>
        go to about
      </ConfirmNavButton>
    </div>
  )
}
