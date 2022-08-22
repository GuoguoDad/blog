---
layout: '@/templates/BasePost.astro'
title: 【基础篇】div + css 布局
description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi.
pubDate: 2020-02-01T00:00:00Z
imgSrc: '/assets/images/image-post7.jpeg'
imgAlt: 'Image post 7'
---

### 布局方法
基于盒状模型，依赖 display 属性 + position属性 + float属性。

**display属性**
**规定元素应该生成的框的类型。**  用于定义建立布局时元素生成的显示框类型。

-   `none`： 此元素不会被显示。
-   `inline`(默认)： 默认。此元素会被显示为内联元素，元素前后没有换行符。
-   `block`： 此元素将显示为块级元素，此元素前后会带有换行符。
-   `inline-block`： 行内块元素。
-   `list-item`： 此元素会作为列表显示。
-   `run-in`： 此元素会根据上下文作为块级元素或内联元素显示。
-   `table`： 此元素会作为块级表格来显示(类似 `<table>`)，表格前后带有换行符。
-   `inline-table`： 此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。
-   `table-row`： 此元素会作为一个表格行显示（类似 `<tr>`）
-   `table-column`： 此元素会作为一个表格行显示（类似 <col>）
-   `table-cell`： 此元素会作为一个表格单元格显示类似 `<td>` 和 `<th>`
-   `table-caption`： 此元素会作为一个表格标题显示类似 `<caption>`
-   `inherit `： 规定应该从父元素继承 display 属性的值。



**position属性常用值**

**检索对象的定位方式。** 当 `position`的值为非 `static`时，其层叠级别通过 `z-index`属性定义。

-   `static`(默认)： 对象遵循常规流。此时4个定位偏移属性不会被应用。
-   `relative`：对象遵循常规流，并且参照自身在常规流中的位置通过 `top`， `right`， `bottom`， `left`这4个定位偏移属性进行偏移时不会影响常规流中的任何元素。
-   `absolute`： 对象脱离常规流，此时偏移属性参照的是离自身最近的定位祖先元素，如果没有定位的祖先元素，则一直回溯到 `body`元素。盒子的偏移位置不影响常规流中的任何元素，其 `margin`不与其他任何margin折叠。
-   `fixed`： 与 `absolute`一致，但偏移定位是以窗口为参考。当出现滚动条时，对象不会随着滚动。


**z-index属性**

**设置元素的堆叠顺序。** 拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。元素可拥有负的 z-index 属性值。 `z-index` 仅能在定位元素上奏效

**float属性**

**定义元素在哪个方向浮动。**  浮动元素会生成一个块级框，而不论它本身是何种元素。

-   `left`： 元素向左浮动。
-   `right`： 元素向右浮动。
-   `none`(默认)： 默认值。元素不浮动，并会显示在其在文本中出现的位置。
-   `inherit`： 规定应该从父元素继承 float 属性的值。

**注意：**  使用浮动后，建议要有清除浮动的操作。建议使用以下代码：
```
 E:before,
    E:after {
      display: table;
      content: " ";
    }

    E:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }
```


**overflow属性**

**规定当内容溢出元素框时发生的事情。**  如果值为 `scroll`，不论是否需要，用户代理都会提供一种滚动机制。因此，有可能即使元素框中可以放下所有内容也会出现滚动条。

-   `visible`(默认)： 默认值。内容不会被修剪，会呈现在元素框之外。
-   `hidden`： 内容会被修剪，并且其余内容是不可见的。
-   `scroll`： 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
-   `auto`： 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
-   `inherit`： 规定应该从父元素继承 overflow 属性的值。


**visibility属性**

**规定元素是否可见。** 是否显示一个元素生成的元素框。这意味着元素仍占据其本来的空间，不过可以完全不可见。值 collapse 在表中用于从表布局中删除列或行。 即使不可见的元素也会占据页面上的空间。请使用 "display" 属性来创建不占据页面空间的不可见元素。

-   `visible`(默认)： 默认值。默认值。元素是可见的。
-   `hidden`： 元素是不可见的。
-   `collapse`： 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。
-   `inherit`： 规定应该从父元素继承 visibility 属性的值。


### 案例
#### 效果
<img src="/assets/images/frontend-pic1.png"/>
#### html代码
<img src="/assets/images/frontend-pic3.jpeg" width="380"/>

#### 分别是flaot布局、position布局、display布局、flex布局
<img src="/assets/images/frontend-pic2.png" />

