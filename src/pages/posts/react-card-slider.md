---
layout: '@/templates/BasePost.astro'
title: 【react-card-slider】教你实现滑动卡片
description: 教你实现滑动卡片
pubDate: 2020-09-01T09:40:00Z
imgSrc: '/assets/images/image-post3.jpeg'
imgAlt: 'Image post 3'
---


## 效果
<img src="https://img-blog.csdnimg.cn/74feeeeea8c94f5dbf8eecdf2cc2781c.gif" />

## 思路
通过zIndex控制层级，opacity控制透明度，transform 控制卡片缩放程度，marginLeft控制位置，剩下的就是计算的事了

## 实现
### card-slider.tsx
```javascript

import React from 'react'

export type CardProps = {
  opacity: number
  scale: number
  loop?: boolean
  width: number
  disablePrev?: boolean
  disableNext?: boolean
  boxWidth: number
  index?: number
  list: any[]
  renderItem(data: any): React.ReactNode
  onChange?: (index: number, data: any) => void
  style?: React.CSSProperties
}
type CardState = {
  activeIndex: number
  moving: boolean
}

export default class CardSlider extends React.Component<CardProps, CardState> {
  static defaultProps: Partial<CardProps> = {
    opacity: 0.9,
    scale: 0.9,
    loop: false,
    disablePrev: false,
    disableNext: false
  }

  constructor(props: CardProps) {
    super(props)
    this.state = {
      activeIndex: props.index || 0,
      moving: false
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.index !== nextProps.index) {
      this.setState({
        activeIndex: nextProps.index
      })
    }
  }

  // 卡片总数量
  get totalCount() {
    return this.props.list.length
  }

  // 间隔宽度
  get gridWidth() {
    const isEven = this.totalCount % 2 === 0
    const { width, boxWidth } = this.props
    return (boxWidth - width) / (isEven ? this.totalCount : this.totalCount - 1)
  }

  // 禁用prev
  get disablePrev() {
    const { loop, disablePrev } = this.props
    const { activeIndex } = this.state
    if (disablePrev) return true
    return !loop && activeIndex === 0
  }

  // 禁用prev
  get disableNext() {
    const { loop, disableNext } = this.props
    const { activeIndex } = this.state
    if (disableNext) return true
    return !loop && activeIndex === this.totalCount - 1
  }

  /**
   * offset: 是左或者右的第几个
   * direction: 1:右侧：-1：左侧
   */
  getDirection(index: number) {
    const { activeIndex } = this.state
    let direction = 1
    if (
      index - activeIndex > this.totalCount / 2 ||
      (index - activeIndex < 0 && index - activeIndex > -this.totalCount / 2)
    ) {
      direction = -1
    }

    let offset = Math.abs(index - activeIndex)
    if (offset > this.totalCount / 2) {
      offset = activeIndex + this.totalCount - index
    }
    if (index - activeIndex < -this.totalCount / 2) {
      offset = this.totalCount + index - activeIndex
    }
    return {
      direction,
      offset
    }
  }

  render() {
    const { list, renderItem, opacity, scale, width, boxWidth, style = {} } = this.props
    return (
      <div style={{ ...styles.wrapper, ...style }}>
        <div style={{ ...styles.content, width: boxWidth }}>
          {list.map((data, index) => {
            const { direction, offset } = this.getDirection(index)
            const realScale = Math.pow(scale, offset)
            return renderItem({
              key: index,
              ...data,
              style: {
                position: 'absolute',
                left: '50%',
                marginLeft: this.gridWidth * direction * offset + direction * ((width / 2) * (1 - realScale)),
                zIndex: this.totalCount - offset,
                opacity: Math.pow(opacity, offset),
                transform: `translateX(-50%) translateZ(0) scale(${realScale})`,
                transition: 'all 300ms'
              }
            })
          })}
        </div>
        {!this.disablePrev && (
          <a href="javascript:;" style={{ ...styles.btn, left: 35 }} onClick={this.handlePrev}>
            {'<'}
          </a>
        )}
        {!this.disableNext && (
          <a href="javascript:;" style={{ ...styles.btn, right: 35 }} onClick={this.handleNext}>
            {'>'}
          </a>
        )}
      </div>
    )
  }

  handlePrev = () => {
    let { activeIndex } = this.state
    if (this.disablePrev) return
    activeIndex = --activeIndex < 0 ? this.totalCount - 1 : activeIndex
    this.setState({ activeIndex })
    this.handleChange(activeIndex)
  }

  handleNext = () => {
    let { activeIndex } = this.state
    if (this.disableNext) return
    activeIndex = ++activeIndex >= this.totalCount ? 0 : activeIndex
    this.setState({ activeIndex })
    this.handleChange(activeIndex)
  }

  handleChange = (index: number) => {
    const { list, onChange } = this.props
    onChange && onChange(index, list[index])
  }
}

const styles: { [name: string]: React.CSSProperties } = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  content: {
    height: 210,
    position: 'relative'
  },
  btn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 36,
    height: 36,
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24
  }
}
```


### card-item.tsx
```javascript
import React from 'react'

const CardItem = ({ style, url }) => {
  return (
    <div
      style={{
        width: 375,
        height: 208,
        background: '#000',
        color: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        ...style
      }}
    >
      <img src={url} width="100%" height="100%" />
    </div>
  )
}
export default CardItem
```

### App.tsx
```javascript

import CardSlider from './card-slider'
import CardItem from './card-item'
import './App.scss'

const list = [
  {
    name: '1',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/218369/27/14203/132191/6226a702E5a0b9236/a11294e884bc7635.jpg!cr_1053x420_4_0!q70.jpg'
  },
  {
    name: '2',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/158791/25/27003/106834/620c4bc2Efb15fc57/7c89841a597ce41b.jpg!cr_1053x420_4_0!q70.jpg'
  },
  {
    name: '3',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/117358/2/22877/138901/6228342eE68ae2c88/f8a9adb2642c1313.jpg!cr_1053x420_4_0!q70.jpg'
  },
  {
    name: '4',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/121592/2/24818/138081/622ccc8fEdf840f95/cd229433d699c70c.jpg!cr_1053x420_4_0!q70.jpg'
  },
  {
    name: '5',
    url: 'https://imgcps.jd.com/ling-cubic/danpin/lab/amZzL3QxLzE2Mjc4Mi8zNi85MTM4LzQ0NjQ1MS82MDQwN2Q4MUVkMDlmMWM5OC9jZWVmOWU0OWVkNzlkNjZkLnBuZw/6Zi_6L-q6L6-5pav6LeR5q2l6Z6L/5qmh6IO25aSW5bqV/60586f6fa1b18f3314204f2d/cr_1125x449_0_166/s/q70.jpg'
  },
  {
    name: '6',
    url: 'https://imgcps.jd.com/img-cubic/creative_server_cid/v2/2000755/10041170380456/FocusActivity/CkNqZnMvdDEvMjExMDQ2LzIyLzExMTc3Lzc0NTA0LzYxYTU4MzAwRWU1YjQ0OTcxL2Q5YjE5NzlmOGJkMjAzNzIuanBnEgs4NDIteGNfMF81MjABOPOOekIWChLkuprnkZ_lo6vot5HmraXpnosQAEIQCgzpkpzmg6DnmbvlnLoQAUIQCgznq4vljbPmiqLotK0QAkIKCgbkvJjpgIkQBw/cr_1053x420_4_0/s/q70.jpg'
  },
  {
    name: '7',
    url: 'https://m15.360buyimg.com/mobilecms/jfs/t1/117358/2/22877/138901/6228342eE68ae2c88/f8a9adb2642c1313.jpg!cr_1053x420_4_0!q70.jpg'
  }
]

export default function App() {
  return (
    <div style={{ paddingTop: '20%'}}>
      <CardSlider
        list={list}
        renderItem={CardItem}
        width={375}
        boxWidth={500}
        opacity={0.75}
        scale={0.9}
        disableNext={false}
        disablePrev={false}
        onChange={(index: number, data: any) => {
          console.log(index, data)
        }}
      />
    </div>
  )
}
```

## 在线预览
[点我预览](https://codesandbox.io/s/80kmct)
