import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import {
  PlusIcon,
  PencilIcon,
  Copy,
  TrashIcon,
  Save,
  FileOutputIcon,
  type LucideProps
} from 'lucide-react'

export type SemanticIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

export const CreateIcon: SemanticIcon = forwardRef((props, ref) => (
  <PlusIcon {...props} ref={ref} />
))

export const UpdateIcon: SemanticIcon = forwardRef((props, ref) => (
  <PencilIcon {...props} ref={ref} />
))

export const CopyIcon: SemanticIcon = forwardRef((props, ref) => <Copy {...props} ref={ref} />)

export const DeleteIcon: SemanticIcon = forwardRef((props, ref) => (
  <TrashIcon {...props} ref={ref} />
))

export const SaveIcon: SemanticIcon = forwardRef((props, ref) => <Save {...props} ref={ref} />)

export const ExportIcon: SemanticIcon = forwardRef((props, ref) => (
  <FileOutputIcon {...props} ref={ref} />
))
