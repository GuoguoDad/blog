---
layout: '@/templates/BasePost.astro'
title: 【CSS】分享纯CSS实现Rain效果
description: 分享纯CSS实现Rain效果
pubDate: 2020-09-06T15:00:00Z
imgSrc: 'https://img-blog.csdnimg.cn/60a27e069e824a31942c3ebe981dd4f5.png'
imgAlt: 'Image post 3'
---

## 效果
<img src="https://img-blog.csdnimg.cn/92810edd8011495fbe3e0590f4f50d49.gif" />


## 实现原理
- 循环增加n多个雨点，这里写死的
- 利用animation 动画 无限向下滚动雨点

## 实现代码
### html
```javascript
  <div class="drop"></div>
  <div class="drop"></div>
  <div class="drop"></div>
  ...
```

### scss
```javascript
body {
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);
}

@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.drop {
  $total: 528;
  background:-webkit-gradient(linear,0% 0%,0% 100%, from(rgba(13,52,58,1) ), to(rgba(255,255,255,0.6)));
  background: linear-gradient(top, rgba(13,52,58,1) 0%, rgba(255,255,255,.6) 100%);
	width:1px;
	height:89px;
	position: absolute;
	bottom:200px;
  animation: fall .63s linear infinite;
  
  @for $i from 1 through $total {
    $drop-left: random_range(0, 2600) * 1px;
    $drop-top: random_range(-1000, 1400) * 1px;
    
    &:nth-child(#{$i}) {
      left: $drop-left;
      top: $drop-top;
    }
  }
}

@keyframes fall {
  to { margin-top:900px; }
}
```



## 最后
[点我预览](https://codepen.io/GuoguoDad/pen/RwyPjzV)












