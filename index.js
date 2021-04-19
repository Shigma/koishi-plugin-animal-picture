const axios = require('axios')
const { Random } = require('koishi-core')

const theCatDogApi = async (species, gif) => {
  try {
    let res = await axios.get(`https://api.the${species}api.com/`
      + `v1/images/search${gif ? '?mime_types=gif' : ''}`)
    let img = res.data[0].url
    return img
  } catch (err) {
    if (err) console.log(err)
  }
}

const randomCat = async () => {
  try {
    let res = await axios.get('https://aws.random.cat/meow')
    let img = res.data.file
    return img
  } catch (err) {
    console.log(err)
  }
}

const edgeCats = async () => {
  try {
    let res = await axios.get('http://edgecats.net/random')
    let img = res.data
    return img
  } catch (err) {
    console.log(err)
  }
}

const dogCeo = async () => {
  try {
    let res = await axios.get('https://dog.ceo/api/breeds/image/random')
    let img = res.data.message
    return img
  } catch (err) {
    console.log(err)
  }
}

const randomDog = async () => {
  try {
    let res = await axios.get('https://random.dog/woof.json')
    let img = res.data.url
    return img
  } catch (err) {
    console.log(err)
  }
}

const someRandomApi = async (species) => {
  try {
    let res = await axios.get(`https://some-random-api.ml/img/${species}`)
    let img = res.data.link
    return img
  } catch (err) {
    console.log(err)
  }
}

const bunniesApi = async () => {
  try {
    let res = await axios.get(`https://api.bunnies.io/`
      + `v2/loop/random/?media=gif`)
    let img = res.data.media.gif
    return img
  } catch (err) {
    console.log(err)
  }
}

const randomDuck = async (gif) => {
  try {
    let res = await axios.get(`https://random-d.uk/api/v1/random`
      + `${gif ? '?type=gif' : ''}`)
    let img = res.data.url
    return img
  } catch (err) {
    console.log(err)
  }
}

const randomFox = async () => {
  try {
    let res = await axios.get('https://randomfox.ca/floof')
    let img = res.data.image
    return img
  } catch (err) {
    console.log(err)
  }
}

const nekosLife = async (species) => {
  try {
    let res = await axios.get(`https://nekos.life/api/v2/img/${species}`)
    let img = res.data.url
    return img
  } catch (err) {
    console.log(err)
  }
}

const floofyBot = async () => {
  try {
    let test = false
    let img
    while (!test) {
      let res = await axios.get('http://pics.floofybot.moe/owl')
      img = res.data.image
      if (img.match(/.(jpe?g|png|gif)$/)) test = true
    }
    return img
  } catch (err) {
    console.log(err)
  }
}

const shibeOnline = async () => {
  try {
    let res = await axios.get('http://shibe.online/api/shibes')
    let img = res.data[0]
    return img
  } catch (err) {
    console.log(err)
  }
}

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
