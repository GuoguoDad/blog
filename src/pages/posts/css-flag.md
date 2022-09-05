---
layout: '@/templates/BasePost.astro'
title: 【CSS】纯CSS绘制五星红旗 🇨🇳
description: 纯CSS绘制五星红旗
pubDate: 2020-09-05T15:00:00Z
imgSrc: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9838e8a12e74c52b9a23af2965586ec~tplv-k3u1fbpfcp-zoom-1.image'
imgAlt: 'Image post 3'
---
---
theme: channing-cyan
---

## 前言
还有二十多天就国庆了，给大家分享一个CSS纯前端绘制国旗的过程 🇨🇳

## 1、绘制五角星
### 1、绘制一个三角形

```javascript
 <div class="big-start"></div>
```

```javascript
 .big-start {
    position: relative;
    width: 0;
    height: 0;
    top: 120px;
    left: 60px;
    border-right: 80px solid transparent;
    border-left: 80px solid transparent;
    border-bottom: 56px solid #FFEC73;
  }
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/633d0df9ac7848929d15410adbeb3386~tplv-k3u1fbpfcp-zoom-1.image"  width="500"/>

### 2、再利用伪元素绘制2个三角形

```javascript
 <div class="big-start"></div>
```

```javascript
 .big-start {
    position: relative;
    width: 0;
    height: 0;
    top: 120px;
    left: 60px;
    border-right: 80px solid transparent;
    border-left: 80px solid transparent;
    border-bottom: 56px solid #FFEC73;
	
	&::before {
      position: absolute;
      width: 0;
      height: 0;
      content: "";
      border-right: 24px solid transparent;
      border-left: 24px solid transparent;
      border-bottom: 64px solid red;
    }

    &::after {
      position: absolute;
      width: 0;
      height: 0;
      content: "";
      border-right: 80px solid transparent;
      border-left: 80px solid transparent;
      border-bottom: 56px solid blue;
    }
  }
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81aa01c9e1a44dd1aea5cbd44b99eb4a~tplv-k3u1fbpfcp-zoom-1.image" width="500"/>

### 3、调整位置和角度

```javascript
 <div class="big-start"></div>
```

```javascript
 .big-start {
    position: relative;
    width: 0;
    height: 0;
    top: 120px;
    left: 60px;
    border-right: 80px solid transparent;
    border-left: 80px solid transparent;
    border-bottom: 56px solid #FFEC73;
	
	&::before {
      position: absolute;
      width: 0;
      height: 0;
      top: -44px;
      left: -54px;
      content: "";
      border-right: 24px solid transparent;
      border-left: 24px solid transparent;
      border-bottom: 64px solid red;
      transform: rotate(-35deg);
    }

    &::after {
      position: absolute;
      width: 0;
      height: 0;
      top: 3px;
      left: -85px;
      content: "";
      border-right: 80px solid transparent;
      border-left: 80px solid transparent;
      border-bottom: 56px solid blue;
      transform: rotate(-70deg);
    }
  }
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c814d61769bd46568d6fba4320ee4d8e~tplv-k3u1fbpfcp-zoom-1.image"  width="500"/>

## 2、绘制国旗
### 1、绘制国旗背景，宽高3:2

```javascript
<div class="five-start-red-flag"></div>
```

```javascript
.five-start-red-flag {
  --flag-color: red;
   
  width: 780px;
  height: 520px;
  margin: 5% auto auto;
  background-color: var(--flag-color);
}
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1250246e2f94f028e25f96b6deb432c~tplv-k3u1fbpfcp-zoom-1.image"  width="500"/>

### 2、绘制大小五角星

```javascript
<div class="five-start-red-flag">
  <div class="big-start"></div>
  <div class="samll-start-1"></div>
  <div class="samll-start-2"></div>
  <div class="samll-start-3"></div>
  <div class="samll-start-4"></div>
</div>

```

```javascript

.five-start-red-flag {
  --start-color: #FFEC73;
  --flag-color: red;
   
  position: relative;
  width: 780px;
  height: 520px;
  margin: 5% auto auto;
  background-color: var(--flag-color);
  
  .big-start {
    position: relative;
    width: 0;
    height: 0;
   
    border-right: 80px solid transparent;
    border-left: 80px solid transparent;
    border-bottom: 56px solid var(--start-color);

    &::before {
      position: absolute;
      width: 0;
      height: 0;
      top: -44px;
      left: -54px;
      content: "";
      border-right: 24px solid transparent;
      border-left: 24px solid transparent;
      border-bottom: 64px solid var(--start-color);
      transform: rotate(-35deg);
    }

    &::after {
      position: absolute;
      width: 0;
      height: 0;
      top: 3px;
      left: -85px;
      content: "";
      border-right: 80px solid transparent;
      border-left: 80px solid transparent;
      border-bottom: 56px solid var(--start-color);
      transform: rotate(-70deg);
    }

    transform: rotate(35deg);
  }
  
  
   .samll-start-1, .samll-start-2, .samll-start-3, .samll-start-4 {
    position: relative;
    width: 0;
    height: 0;
    top: -10px;
    left: 260px;
    border-right: 26px solid transparent;
    border-left: 26px solid transparent;
    border-bottom: 18px solid var(--start-color);

    &::before {
      position: absolute;
      width: 0;
      height: 0;
      top: -12px;
      left: -17px;
      content: "";
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      border-bottom: 21px solid var(--start-color);
      transform: rotate(-35deg);
    }

    &::after {
      position: absolute;
      width: 0;
      height: 0;
      top: 1px;
      left: -27px;
      content: "";
      border-right: 26px solid transparent;
      border-left: 26px solid transparent;
      border-bottom: 18px solid var(--start-color);
      transform: rotate(-70deg);
    }
  }
}
```
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95cf4cbe542c4bf6a1ac317e1b07e095~tplv-k3u1fbpfcp-watermark.image?"  width="500"/>

### 3、调整大小五角星位置和角度

```javascript
.five-start-red-flag {
  --start-color: #FFEC73;
  --flag-color: red;
   
  position: relative;
  width: 780px;
  height: 520px;
  margin: 5% auto auto;
  background-color: var(--flag-color);
  
  .big-start {
    position: relative;
    width: 0;
    height: 0;
    top: 120px;
    left: 60px;
    border-right: 80px solid transparent;
    border-left: 80px solid transparent;
    border-bottom: 56px solid var(--start-color);

    &::before {
      position: absolute;
      width: 0;
      height: 0;
      top: -44px;
      left: -54px;
      content: "";
      border-right: 24px solid transparent;
      border-left: 24px solid transparent;
      border-bottom: 64px solid var(--start-color);
      transform: rotate(-35deg);
    }

    &::after {
      position: absolute;
      width: 0;
      height: 0;
      top: 3px;
      left: -85px;
      content: "";
      border-right: 80px solid transparent;
      border-left: 80px solid transparent;
      border-bottom: 56px solid var(--start-color);
      transform: rotate(-70deg);
    }
    transform: rotate(35deg);
  }
  
  
   .samll-start-1, .samll-start-2, .samll-start-3, .samll-start-4 {
    position: relative;
    width: 0;
    height: 0;
    top: -10px;
    left: 260px;
    border-right: 26px solid transparent;
    border-left: 26px solid transparent;
    border-bottom: 18px solid var(--start-color);

    &::before {
      position: absolute;
      width: 0;
      height: 0;
      top: -12px;
      left: -17px;
      content: "";
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      border-bottom: 21px solid var(--start-color);
      transform: rotate(-35deg);
    }

    &::after {
      position: absolute;
      width: 0;
      height: 0;
      top: 1px;
      left: -27px;
      content: "";
      border-right: 26px solid transparent;
      border-left: 26px solid transparent;
      border-bottom: 18px solid var(--start-color);
      transform: rotate(-70deg);
    }
  }
  
  .samll-start-1 {
    transform: rotate(-20deg);
  }
  
  .samll-start-2 {
    top: 35px;
    left: 320px;
    transform: rotate(10deg)
  }
  .samll-start-3 {
    top: 100px;
    left: 320px;
    transform: rotate(30deg);
  }
  
  .samll-start-4 {
    top: 140px;
    transform: rotate(45deg);
  }
}
```
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9838e8a12e74c52b9a23af2965586ec~tplv-k3u1fbpfcp-zoom-1.image"  width="500"/>

## 在线预览
[点我预览](https://codepen.io/GuoguoDad/pen/poVvrvM)



您的鼓励（点赞、关注、收藏）是我持续创作的动力，如果对你有帮助，支持一下，Thanks♪(･ω･)ﾉ 🇨🇳





