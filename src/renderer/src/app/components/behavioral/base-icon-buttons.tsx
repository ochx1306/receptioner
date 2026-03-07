import { BaseIconButton, type BaseIconButtonProps } from '../base/BaseIconButton'
import { CreateIcon, UpdateIcon, DeleteIcon } from '../base/base-icons'

type SemanticIconButtonProps = Omit<BaseIconButtonProps, 'icon' | 'label'> & {
  label?: string
}

const CreateIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={CreateIcon} label="作成" {...props} />
}

const UpdateIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={UpdateIcon} label="更新" {...props} />
}

const DeleteIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={DeleteIcon} label="削除" {...props} />
}

export { CreateIconButton, UpdateIconButton, DeleteIconButton, type SemanticIconButtonProps }
