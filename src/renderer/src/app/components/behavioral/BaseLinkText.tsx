import { Link, type LinkProps } from '@tanstack/react-router'
import { cn } from '@app/lib/cn'

interface BaseLinkTextProps extends LinkProps {
  label: string
  className?: string
}

export const BaseLinkText = ({ label, className, ...linkProps }: BaseLinkTextProps) => {
  return (
    <Link
      {...linkProps}
      className={cn('font-medium text-primary hover:underline underline-offset-4', className)}
    >
      {label}
    </Link>
  )
}
