---
layout: '@/templates/BasePost.astro'
title: 移动端h5干货总结
description: 移动端h5干货总结
pubDate: 2022-09-13T09:20:00Z
imgSrc: '/assets/images/image-post4.jpeg'
imgAlt: 'Image post 4'
---

### CSS方向

##### 描绘像素边框

如何描绘`一像素边框`？

```
.line {
    height: 1px;
    position: relative;
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #EEEEEE;
      width: 200%;
      height: 1px;
      content: "";
      transform: scale(.5);
      transform-origin: left bottom;
    }
  }
复制代码
```

##### 控制文本溢出

如何控制文本做`单行溢出`和`多行溢出`？

```
.target-ele {
    width: 400px;
    line-height: 30px;
    font-size: 20px;
    &.single-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &.mult-ellipsis {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
}
复制代码
```

##### 美化表单外观

表单元素样式太丑希望自定义，`appearance:none`来帮你。

```
button,
input,
select,
textarea {
    appearance: none;
}
复制代码
```

##### 自动适应背景

使用`rem布局`声明一个元素背景，多数情况会将`background-size`声明为`cover`。可能在设计图对应分辨率的移动设备下，背景会完美贴合显示，但换到其他分辨率的移动设备下就会出现左右空出`1px`到`npx`的空隙。

此时将`background-size`声明为`100% 100%`，跟随`width`和`height`的变化而变化。反正`width`和`height`都是量好的实际尺寸。

```
.target-ele {
    width: 0.88rem;
    height: 0.88rem;
    background: url("xxxx.jpg") no-repeat center/100% 100%;
}
复制代码
```

##### 修改input placeholder样式
```
input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 12px;
}
复制代码
```


##### 修改input type=file 上传按钮样式
```
 <div className={styles.choseContainer}>
    <input
      multiple={false}
      type="file"
      accept="image/*"
      onChange={async (e) => {
        Toast.loading('上传中...', 0)
        const { url, err } = await uploadImageFile(e)
        Toast.hide()
        if (err) {
          Toast.fail(err.toString())
        } else {
          onImageAdd(url)
        }
      }}
    />
    <img className={styles.cameraIcon} src={cameraIcon} />
    <div className={styles.txtDes}>添加照片</div>
    <div className={styles.selectedNum}>
      ({files.length}/{max})
    </div>
  </div>
复制代码
```
```
.choseContainer {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  border-radius: 0.18rem;
  background: #f6f7fa;

  input {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    font-size: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
}
复制代码
```

##### 修改滚动条样式
```
div {
    overflow: auto;
    height: 100%;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-track {
      background-color: #f0f0f0;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: grey;
    }
}
复制代码
```

### JS方向

##### 禁止滑动穿透

`移动端浏览器`里出现弹窗时，若在屏幕上滑动能触发弹窗底下的内容跟着滚动，这个是众所周知的事情。

首先明确解决滑动穿透需保持哪些交互行为，那就是`除了弹窗内容能点击或滚动，其他内容都不能点击或滚动`。目前很多解决方案都无法做到这一点，全部解决方案都能禁止`<body>`的滚动行为却引发其他问题。

-   弹窗打开后内部内容无法滚动
-   弹窗关闭后页面滚动位置丢失
-   `Webview`能上下滑动露出底色

当打开弹窗时给`<body>`声明`position:fixed;left:0;width:100%`并动态声明`top`。声明`position:fixed`会导致`<body>`滚动条消失，此时会发现虽然无滑动穿透，但页面滚动位置早已丢失。通过`scrollingElement`获取页面当前滚动条偏移量并将其取负值且赋值给`top`，那么在视觉上就无任何变化。当关闭弹窗时移除`position:fixed;left:0;width:100%`和动态`top`。

`scrollingElement`可兼容地获取`scrollTop`和`scrollHeight`等属性，在`移动端浏览器`里屡试不爽。`document.scrollingElement.scrollHeight`可完美代替曾经的`document.documentElement.scrollHeight || document.body.scrollHeight`，一眼看上去就是代码减少了。

该解决方案在视觉上无任何变化，完爆其他解决方案，其实就是一种反向思维和障眼法。该解决方案完美解决`固定弹窗`和`滚动弹窗`对`<body>`全局滚动的影响，当然也可用于局部滚动容器里，因此很值得推广。

```
body.static {
    position: fixed;
    left: 0;
    width: 100%;
}
复制代码
```

```
const body = document.body;
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
openBtn.addEventListener("click", e => {
    e.stopPropagation();
    const scrollTop = document.scrollingElement.scrollTop;
    body.classList.add("static");
    body.style.top = `-${scrollTop}px`;
});
closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    body.classList.remove("static");
    body.style.top = "";
});
复制代码
```



