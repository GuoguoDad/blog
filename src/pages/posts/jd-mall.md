---
layout: '@/templates/BasePost.astro'
title: 高仿京东商城安卓App
description: 高仿京东商城安卓App，集成react native 热更新功能.
pubDate: 2020-02-05T00:00:00Z
imgSrc: '/assets/images/jd_mall_banner.jpeg'
imgAlt: ''
---


# 简介
高仿京东商城项目具有完整的结构，代码整洁规范，结构清晰，集成React-Native热更功能，功能还在持续更新中...如果对你有帮助，给个star
1. 使用kotlin语言开发，项目使用模块化开发，降低了耦合性
2. 网络使用 retrofit2 + okhttp3方式，进行了高度的封装
3. [使用leakcanary 内存泄漏检测](https://github.com/square/leakcanary)
4. [基于MVI架构(airbnb的Mavericks)开发](https://airbnb.io/mavericks/#/README)
5. [使用本地mock模拟服务端](https://github.com/mirrajabi/okhttp-json-mock)
6. [采用ARouter路由管理](https://github.com/alibaba/ARouter/tree/master)
7. 集成RN热更功能， 用户设置为rn写的页面，[rn工程请见](https://github.com/GuoguoDad/jd_mall_rn.git)


# MVI架构
![在这里插入图片描述](https://img-blog.csdnimg.cn/1da9b4350ad74accbc8cfb826f9de102.png#pic_center)


MVI即Model-View-Intent，它受前端框架的启发，提倡一种单向数据流的设计思想，非常适合数据驱动型的UI展示项目：

* Model: 与其他MVVM中的Model不同的是，MVI的Model主要指UI状态（State）。当前界面展示的内容无非就是UI状态的一个快照：例如数据加载过程、控件位置等都是一种UI状态
* View: 与其他MVX中的View一致，可能是一个Activity、Fragment或者任意UI承载单元。MVI中的View通过订阅Intent的变化实现界面刷新（不是Activity的Intent、后面介绍）
* Intent: 此Intent不是Activity的Intent，用户的任何操作都被包装成Intent后发送给Model进行数据请求

# 下载

##Apk下载链接： [Apk下载链接](https://www.pgyer.com/FYfa)


# 首页
<img src="https://img-blog.csdnimg.cn/8612bf5c481741e39b7c42e95920f418.png#pic_center" width="600" />

# 分类
<img src="https://img-blog.csdnimg.cn/9586f0d6768d4c4caf1923d320ab6d5b.png#pic_center" width="600" />

# 购物车
<img src="https://img-blog.csdnimg.cn/bc7091314e244b2d91c20d1894df3df7.png#pic_center" width="600" />

# 我的
<img src="https://img-blog.csdnimg.cn/2c60a05fd8e04c49933fbedae86da79b.png#pic_center" width="600" />

# 商品详情
<img src="https://img-blog.csdnimg.cn/3f2997d2f25b4987a84b7b3bc21ea3ae.png#pic_center" width="600" />

# 账户设置(react-native页面-拉取远程的bundle)
<img src="https://img-blog.csdnimg.cn/f9b34fa793ee48df85b0778797be6fa6.png#pic_center" width="600" />

# 第三方库
| 库                       | 功能                      |
| ----------------------- | ----------------------    |
| **retrofit2**           | **网络**                   |
| **okHttp3**             | **网络**                   |
| **mavericks**           | **MVI框架**                |
| **BaseRecyclerViewAdapterHelper**  | **万能适配器**   |
| **PhotoView**           | **图片预览**                |
| **ARouter**             | **组件化路由**              |
| **coil**                | **图片加载**                |
| **XPopup**              | **弹窗组件**                |
| **banner**              | **滚动图**                  |
| **SmartRefreshLayout**  | **智能下拉刷新框架**         |
| **gson**                | **json解析**                |
| **leakcanary**          | **内存泄漏检测库**           |

# 项目地址
https://github.com/GuoguoDad/jd_mall
