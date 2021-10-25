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
  /**
   * 最大重复请求数。
   *
   * 有一些 API 会返回 .gifv 这种无法发送的图片，只能重复请求撞运气。
   *
   * 一般而言，不需要动这个配置项。
   *
   * @default 5
   */
  requestLimit?: number
}

export declare const apply: (ctx: Context, config: ConfigObject) => void