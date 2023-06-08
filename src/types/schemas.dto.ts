export type SettingSchema = {
  type:
    | "text"
    | "boolean"
    | "number"
    | "url"
    | "color"
    | "image_picker"
    | "richtext"
    | "select"
    | "menu"
  id: string
  default: string | number | any
  label: string
  hint?: string
  options?: {
    value: number | string
    label: string
  }[]
  width?: number
  height?: number
  multiple?: boolean
}

export type BlockSchema = {
  _: string
  name: string
  max_blocks?: number
  groups?: string[]
  settings: SettingSchema[]
  blocks?: string[]
}
export type Schemas = { [key: string]: BlockSchema }
