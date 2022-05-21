const { s, Random, Schema: S } = require('koishi')

const RawAPIList = require('./api-list')

/** @type {import('./index').APIType[]} */
let APIList = RawAPIList.map(item => {
  if (item.mapping) item.species = Object.keys(item.mapping)
  if (typeof item.species == 'string') item.species = [item.species]
  return item
})

module.exports.name = 'animal-picture'

module.exports.schema = S.object({
  inbound: S.boolean().default(false)
    .description('是否只使用在大陆能访问的 API。'),
})

/**
 * @param {import('koishi').Context} ctx
 * @param {import('./index').Config} config
 */
module.exports.apply = (ctx, config) => {
  config = {
    inbound: false,
    ...config,
  }

  const log = ctx.logger('animal-picture')

  if (config.inbound) {
    APIList = APIList.filter(item => item.inbound == true)
  }

  let SpeciesList = new Set()
  APIList.forEach(item => {
    item.species.forEach(species => SpeciesList.add(species))
  })
  SpeciesList = Array.from(SpeciesList).sort()

  const SpeciesAPI = {}
  SpeciesList.forEach(species => SpeciesAPI[species] = [])
  APIList.forEach(item => {
    if ('mapping' in item) {
      for (const [species, value] of Object.entries(item.mapping)) {
        SpeciesAPI[species].push({
          url: item.url.replace('{}', value),
          gif: item.gif ?? '',
          endpoint: item.endpoint,
        })
      }
    } else {
      item.species.forEach(species => {
        SpeciesAPI[species].push({
          url: item.url,
          gif: item.gif ?? '',
          endpoint: item.endpoint,
        })
      })
    }
  })

  ctx.command('animal <species>', '动物图')
    .usage(`可用的 species: ${SpeciesList.join(', ')}`)
    .option('gif', '-g 试图请求动图（不一定有用）')
    .action(async ({ session, options }, species) => {
      if (!species) return session.execute('help animal')
      if (!SpeciesList.includes(species)) {
        return `没有此物种的图。\n可用的物种有：${SpeciesList.join(', ')}`
      }

      let apiList = [...SpeciesAPI[species]]
      if (options.gif) {
        const filteredList = apiList.filter(api => api.gif != '')
        if (filteredList) apiList = filteredList
      }

      const api = Random.pick(apiList)
      const apiUrl = api.url + (options.gif ? api.gif : '')

      try {
        let data
        data = await ctx.http.get(apiUrl)
        const endpoint = api.endpoint == '' ? [] : api.endpoint.split('.')

        for (const urlSeg of endpoint) {
          if (urlSeg == '[]') data = data[0]
          else data = data[urlSeg]
        }

        return s('image', { url: data })
      } catch (err) {
        log.warn('Something wrong happened during the request of the image')
        log.warn(err)
        return '发生了神秘错误。'
      }
    })
}
