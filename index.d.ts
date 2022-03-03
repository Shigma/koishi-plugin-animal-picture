import { Context } from 'koishi'

export interface RawAPIType {
  mapping?: Record<string, string>,
  species?: string | string[]
  url: string,
  endpoint: string,
  gif?: boolean
  inbound: boolean
}

export interface APIType extends RawAPIType {
  species: string[]
}

export interface ConfigObject {
  /**
   * 是否只使用在大陆能访问的 API。
   *
   * @default false
   */
  inbound?: boolean
}

export declare const apply: (ctx: Context, config: ConfigObject) => void