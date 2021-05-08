const axios = require('axios')
const { Random } = require('koishi-core')

const APIList = require('./api-list')

const randInt = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min)

const sendImg = async (session, apiList) => {
  const img = await Random.pick(apiList)()
  try {
    if (img) {
      session.send(`[CQ:image,file=${img}]`)
    } else {
      throw Error('did not get image url.')
    }
  } catch (err) {
    console.log(err)
    session.send('发生了神秘错误。')
  }
}

Species = [
  'cat', 'dog(shiba)', 'bunny/rabbit', 'bird', 'duck',
  'fox', 'lizard', 'panda', 'redpanda', 'koala',
  'racoon', 'kangaroo', 'owl'
]

module.exports.name = 'animal-picture'

module.exports.apply = (ctx, config) => {
  ctx.command('animal <species>', '动物图')
    .usage('可用的 species：' + Species.join('、'))
    .option('gif', '-g 试图请求动图（不一定有用）')
    .action(async ({ session, options }, species) => {
      if (!species) return '未指定物种。'

      let gif = options.gif
      let apiList
      switch (species.toLowerCase()) {
        case 'cat':
          if (gif) apiList = [
            () => theCatDogApi('cat', true),
            () => edgeCats()
          ]
          else apiList = [
            () => theCatDogApi('cat'),
            () => randomCat(),
            () => someRandomApi('cat'),
            () => edgeCats(),
            () => nekosLife('meow')
          ]
          break
        case 'dog':
          if (gif) apiList = [
            () => theCatDogApi('dog', true)
          ]
          else apiList = [
            () => theCatDogApi('dog'),
            () => randomDog(),
            () => dogCeo(),
            () => someRandomApi('dog'),
            () => nekosLife('woof'),
            () => shibeOnline()
          ]
          break
        case 'bunny':
        case 'rabbit':
          apiList = [
            () => bunniesApi()
          ]
          break
        case 'bird':
        case 'birb':
          apiList = [
            () => someRandomApi('birb')
          ]
          break
        case 'duck':
          if (gif) apiList = [
            () => randomDuck(true)
          ]
          else apiList = [
            () => randomDuck()
          ]
          break
        case 'fox':
          apiList = [
            () => randomFox(),
            () => someRandomApi('fox')
          ]
          break
        case 'lizard':
          apiList = [
            () => nekosLife('lizard')
          ]
          break
        case 'panda':
          apiList = [
            () => someRandomApi('panda')
          ]
          break
        case 'redpanda':
          apiList = [
            () => someRandomApi('red_panda')
          ]
          break
        case 'koala':
          apiList = [
            () => someRandomApi('koala')
          ]
          break
        case 'racoon':
          apiList = [
            () => someRandomApi('racoon')
          ]
          break
        case 'kangaroo':
          apiList = [
            () => someRandomApi('kangaroo')
          ]
          break
        case 'owl':
          apiList = [
            () => floofyBot()
          ]
          break
        case 'shiba':
        case 'shibe':
          apiList = [
            () => shibeOnline()
          ]
          break
      }
      sendImg(session, apiList)
    })
}
