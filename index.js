const axios = require('axios')
const randI = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min)

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
    let res = await axios.get('http://pics.floofybot.moe/owl')
    let img = res.data.image
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
  let choose = randI(0, apiList.length - 1)
  let img = await apiList[choose].apply()
  try {
    if (img) {
      session.$send(`[CQ:image,file=${img}]`)
    } else {
      throw Error('did not get image url.')
    }
  } catch (err) {
    console.log(err)
    session.$send('发生了神秘错误。')
  }
}

module.exports.name = 'koishi-plugin-animal-picture'

module.exports.apply = (ctx, pluginOptions) => {
  ctx.command('animal [species]')
    .option('gif', '-g')
    .action(async ({ session, options }, species) => {
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
          apiList = [
            () => shibeOnline()
          ]
          break
      }
      sendImg(session, apiList)
    })
}