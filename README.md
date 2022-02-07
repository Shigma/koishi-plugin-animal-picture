# koishi-plugin-animal-picture

[![npm](https://img.shields.io/npm/v/koishi-plugin-animal-picture?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-animal-picture)
[![npm-download](https://img.shields.io/npm/dw/koishi-plugin-animal-picture?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-animal-picture)

一个用于 [**Koishi v3**](https://github.com/koishijs/koishi) 的用来发各种动物图的插件。主要是用来学习 Git， GitHub 和 npm 怎么用而弄出来的，所以会有各种各样的 bug，而且不怎么好用。

图源均为网上搜索的外部图库，不对图片内容负责。

## 安装方法

```shell
npm i koishi-plugin-animal-picture
```

然后参照 [安装插件](https://koishi.js.org/guide/context.html#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6) 继续安装。

## 使用方法

```
animal <species>
```

**species**：可查询的物种，通过 `help animal` 或者 `animal -h` 可查看。

| 可选选项 | 默认值 | 说明 |
| - | - | - |
| `-g, --gif` | `false` | 试图请求 gif 图 **\*1** |

**\*1** 虽然这个选项经常没用，因为这取决于请求图库能不能单独查询 gif 图。另外，设置该值为 false 并不会使得指令不请求 gif 图。

## 插件配置项

这个插件无需任何配置项即可使用，同时也提供了一些可能会用到的配置项。一些不太可能会用到的配置项就摸了。

| 配置项 | 默认值 | 说明 |
| - | - | - |
| `inbound` | `false` | 是否只使用内网能访问的图源。如果 bot 的服务器在内网，请设置为 `true` |
| `requestLimit` | 5 | 最大重复请求数。有一些图源返回的图片资源格式并不一定是平台可发送的图片，所以可能需要重复请求。一般情况下不需要更改这个配置项 |

## Q&A

- 为什么有时候 CQ 码会裸奔？

这可能是因为你的服务器的网络太菜了，或者你使用的是内联网，没法获取到图片。

- 我想要 [ 某个物种 ] 图！

我不会也懒得自建图床，所以如果有野生的随机图片 API 那就很好，但没有的话就摸了。

- 发现了个 bug！

这很正常。

## 更新记录

### v1.0.0

对 v4 做了一个很简陋的适配。如果仍然需要用于 v3 版本，请使用 v0.2 版本。