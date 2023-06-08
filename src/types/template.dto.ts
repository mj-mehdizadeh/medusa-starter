export type Setting = { [key: string]: string | number | any }

export type Blocks<T = Setting> = { [key: string]: Section<T> }

export type Section<T = Setting, B = Setting> = {
  _: string
  disable: boolean
  blocks: Blocks<B>
  block_order?: string[]
  settings: T
}

export type Sections = { [key: string]: Section }

export type Template = {
  name: string
  sections: Sections
  order: string[]
}

export type Templates = { [key: string]: Template }
