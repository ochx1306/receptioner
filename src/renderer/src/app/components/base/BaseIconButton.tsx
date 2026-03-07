import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@app/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@app/components/ui/tooltip'
import { cn } from '@app/lib/cn'

export interface BaseIconButtonProps extends ComponentProps<typeof Button> {
  icon: LucideIcon
  label: string
  showLabel?: boolean
  tooltipContent?: string | null
  iconClassName?: string
}

export const BaseIconButton = ({
  icon: Icon,
  label,
  showLabel = true,
  className,
  tooltipContent,
  iconClassName,
  children,
  ...props
}: BaseIconButtonProps) => {
  const shouldShowTooltip = tooltipContent !== null && (!showLabel || tooltipContent !== undefined)

  const finalTooltipContent = tooltipContent || label

  const buttonElement = (
    <Button
      size={showLabel ? 'default' : 'icon'}
      className={cn('gap-2', className)}
      aria-label={label}
      {...props}
    >
      <Icon className={cn('h-4 w-4', iconClassName)} aria-hidden="true" />
      {showLabel && <span>{label}</span>}
      {children}
    </Button>
  )

  if (!shouldShowTooltip) {
    return buttonElement
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
      <TooltipContent>{finalTooltipContent}</TooltipContent>
    </Tooltip>
  )
}
