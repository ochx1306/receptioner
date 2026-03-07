import { useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@app/components/ui/dialog'
import { MAX_WIDTH_CLASSES, type MaxWidthVariant } from '@/app/lib/ui'

interface BaseDialogProps {
  trigger: ReactNode
  title: string
  description: string
  hideDescriptionVisually?: boolean
  maxWidth?: MaxWidthVariant
  children: (onSuccess: () => void) => ReactNode
}

export const BaseDialog = ({
  trigger,
  title,
  description,
  hideDescriptionVisually = false,
  maxWidth = 'sm',
  children
}: BaseDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => setOpen(false)

  const widthClass = MAX_WIDTH_CLASSES[maxWidth]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`${widthClass} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={hideDescriptionVisually ? 'sr-only' : ''}>
            {description}
          </DialogDescription>
        </DialogHeader>

        {children(handleSuccess)}
      </DialogContent>
    </Dialog>
  )
}
