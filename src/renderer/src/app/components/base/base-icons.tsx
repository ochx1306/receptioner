import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, type LucideProps } from 'lucide-react'

type SemanticIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

const CreateIcon: SemanticIcon = forwardRef((props, ref) => <PlusIcon {...props} ref={ref} />)

const UpdateIcon: SemanticIcon = forwardRef((props, ref) => <PencilIcon {...props} ref={ref} />)

const DeleteIcon: SemanticIcon = forwardRef((props, ref) => <TrashIcon {...props} ref={ref} />)

export { CreateIcon, UpdateIcon, DeleteIcon }
