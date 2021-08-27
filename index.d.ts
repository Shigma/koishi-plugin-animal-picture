import { Context } from 'koishi'

export interface ConfigObject {
  /**
   * Whether to only use the APIs that can visited in China mainland.
   * Set it to `true` if it is so.
   *
   * @default false
   */
  inbound?: boolean
  /**
   * Maximum repeat request number.
   *
   * Some API returns non-sendable image formats (like `gifv`)
   * when making request.
   *
   *
   * Normally this option need not to be changed.
   *
   * @default 5
   */
  requestLimit?: number
}

export const apply: (ctx: Context, config: ConfigObject) => void