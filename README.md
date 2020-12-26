# koishi-plugin-animal-picture

一个用于[Koishi](https://github.com/koishijs/koishi)的用来发各种动物图的插件。其实主要是用来学习Git和GitHub以及npm怎么用而搞出来的，所以会有各种各样的bug，而且非常不好用。连help都没写。

另外，大部分使用的网络图库API都会大量地使用外网网址，若bot在内网布置的话会有一大堆CQ码裸奔。这个问题大概会提供一个选项，但现在没有。



安装后的调用方法：

animal [species] <-g | --gif>

species: 物种，存在cat（猫）、dog（狗）、bunny/rabbit（兔子）、bird/birb（鸟）、duck（鸭子）、fox（狐狸）、lizard（蜥蜴）、panda（大熊猫）、redpanda（小熊猫）、koala（考拉）、racoon（浣熊）、kangaroo（袋鼠）、owl（猫头鹰）。其中可以专门指定shiba（柴犬），调用dog时也会概率出柴犬图。

-g, --gif: 试图搜索gif。这个指令实际上只有猫图和狗图有用。



另外，猫头鹰图可能发不出来，原因未调查也暂时懒得修（跑）