const axios = require('axios')
const { Random } = require('koishi-core')

const APIList = require('./api-list')
APIList.map(item => {
  if ('mapping' in item) item.species = Object.keys(item.mapping)
  if (typeof item.species == 'string') item.species = [item.species]
})

const randInt = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min)

class Config {
  constructor (config) {
    config = { ...config }
    this.inbound = config.inbound ? true : false
  }
}

module.exports.name = 'animal-picture'

module.exports.apply = (ctx, config) => {
  config = new Config(config)
  let logger = ctx.logger('animal-picture')

  Species = new Set()
  APIList.forEach(item => {
    item.species.forEach(species => Species.add(species))
  })
  Species = Array.from(Species).sort()

  ctx.command('animal <species>', '动物图')
    .usage('可用的 species: ' + Species.join(', '))
    .option('gif', '-g 试图请求动图（不一定有用）')
    .action(async ({ options }, species) => {
      if (!species) return '未指定物种。'

    })
}
