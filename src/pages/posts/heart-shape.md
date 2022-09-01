---
layout: '@/templates/BasePost.astro'
title: 【CSS】4步教你绘制爱心图案
description: 4步教你绘制爱心图案
pubDate: 2020-09-01T15:00:00Z
imgSrc: 'https://img-blog.csdnimg.cn/39cc586458fa47b7934921116e17b63c.png'
imgAlt: 'Image post 3'
---
## 实现原理
所谓爱心是指同情怜悯之心态（包括相应的一定行动），它是一种奉献精神，更是关怀、爱护人的思想感情，包括于所有情感之中。今天就用CSS实现一个爱心图案。
- 绘制一个正方形
- 利用伪元素绘制2个圆形
- 利用transform移动2个圆形拼成爱心
- 还原正方形背景色并旋转45度

## 1、绘制一个正方形

```javascript
<div className="heart"></div>
```

```javascript
.heart {
  width: 400px;
  height: 400px;
  margin: 20% auto auto;
  background-color: #ff5d60;
}
```
<img src="https://img-blog.csdnimg.cn/d48aee17527744c0ab72c3c996851a97.png"  width ="500" />

## 2、利用伪元素绘制二个圆
```javascript
<div className="heart"></div>
```

```javascript
.heart {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20% auto auto;
  background-color: transparent;


  &::before,&::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: #ff5d60;
    border-radius: 100%;
  }
}

```
<img src="https://img-blog.csdnimg.cn/6c8dc300144844cf85ce19b898f1bb61.png"  width ="500" />


## 3、利用transform移动这2个圆
```javascript
<div className="heart"></div>
```

```javascript
.heart {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20% auto auto;
  background-color: transparent;

  &::before,&::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: #ff5d60;
    border-radius: 100%;
  }
  
  &::before {
    transform: translateX(-50%);
  }
  &::after {
    transform: translateY(-50%);
  }
}
```
<img src="https://img-blog.csdnimg.cn/ebbbf038c816451aa663e4869990c872.png"  width ="500" />

## 4、还原正方形背景色并旋转45度
```javascript
<div className="heart"></div>
```

```javascript
.heart {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20% auto auto;
  
  &::before,&::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: #ff5d60;
    border-radius: 100%;
  }
  
  &::before {
    transform: translateX(-50%);
  }
  &::after {
    transform: translateY(-50%);
  }
  
  background-color: #ff5d60;
  transform: rotate(45deg);	
}

```
<img src="https://img-blog.csdnimg.cn/c5e7d9bce4ee4e65a5e926c840934cb3.png"  width ="500" />

<img src="https://img-blog.csdnimg.cn/39cc586458fa47b7934921116e17b63c.png"  width ="500" />


如果对你有帮助，帮忙点个赞，Thanks♪(･ω･)ﾉ





