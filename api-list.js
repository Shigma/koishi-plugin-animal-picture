/**
 * @type {import('./index').TypeRawAPI[]}
 */
module.exports = [
  {
    mapping: {
      cat: 'cat', dog: 'dog', bird: 'birb', fox: 'fox',
      panda: 'panda', redpanda: 'red_panda', koala: 'koala',
      racoon: 'racoon', kangaroo: 'kangaroo'
    },
    url: 'https://some-random-api.ml/img/{}',
    endpoint: 'link', inbound: false
  },
  {
    mapping: { cat: 'meow', dog: 'woof' },
    url: 'https://nekos.life/api/v2/img/{}',
    endpoint: 'url', inbound: true
  },
  {
    species: 'cat',
    url: 'https://api.thecatapi.com/v1/images/search',
    gif: '?mime_types=gif',
    endpoint: '[].url', inbound: true
  },
  {
    species: 'cat',
    url: 'https://aws.random.cat/meow',
    endpoint: 'file', inbound: true
  },
  {
    species: 'cat',
    url: 'http://edgecats.net/random',
    endpoint: '', inbound: false
  },
  {
    species: 'dog',
    url: 'https://api.thedogapi.com/v1/images/search',
    gif: '?mime_types=gif',
    endpoint: '[].url', inbound: true
  },
  {
    species: 'dog',
    url: 'https://dog.ceo/api/breeds/image/random',
    endpoint: 'message', inbound: true
  },
  {
    species: ['dog', 'shiba'],
    url: 'http://shibe.online/api/shibes',
    endpoint: '[]', inbound: true
  },
  {
    species: 'rabbit',
    url: 'https://api.bunnies.io/v2/loop/random/?media=gif',
    endpoint: 'media.gif', inbound: true
  },
  {
    species: 'duck',
    url: 'https://random-d.uk/api/v1/random',
    gif: '?type=gif',
    endpoint: 'url', inbound: true
  },
  {
    species: 'fox',
    url: 'https://randomfox.ca/floof',
    endpoint: 'image', inbound: true
  }
]