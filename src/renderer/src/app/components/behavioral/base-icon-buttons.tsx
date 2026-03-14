import { BaseIconButton, type BaseIconButtonProps } from '../base/BaseIconButton'
import {
  CreateIcon,
  UpdateIcon,
  CopyIcon,
  DeleteIcon,
  SaveIcon,
  ExportIcon
} from '../base/base-icons'

type SemanticIconButtonProps = Omit<BaseIconButtonProps, 'icon' | 'label'> & {
  label?: string
}

const CreateIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={CreateIcon} label="作成" {...props} />
}

const UpdateIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={UpdateIcon} label="更新" {...props} />
}

const CopyIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={CopyIcon} label="コピー" {...props} />
}

const DeleteIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={DeleteIcon} label="削除" {...props} />
}

const SaveIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={SaveIcon} label="保存" {...props} />
}

const ExportIconButton = (props: SemanticIconButtonProps) => {
  return <BaseIconButton icon={ExportIcon} label="エクスポート" {...props} />
}

export {
  CreateIconButton,
  UpdateIconButton,
  CopyIconButton,
  DeleteIconButton,
  SaveIconButton,
  ExportIconButton,
  type SemanticIconButtonProps
}
