---
layout: '@/templates/BasePost.astro'
title: React Native 如何实现吸顶效果
description: React Native 如何实现吸顶效果
pubDate: 2020-08-26T14:00:00Z
imgSrc: '/assets/images/image-post3.jpeg'
imgAlt: 'Image post 3'
---

## 前言
上个月接到一个需求对会员的数据展示、统计。这个也不复杂，当时定的技术是使用react-native实现，有吸顶的效果，在实现的过程中遇到的问题就记录一下。

## 效果
<img src="https://img-blog.csdnimg.cn/a911e8ccaa3e4c168cfafff0eb77534e.gif" />

## 思路
- 1、利用FlatList的stickyHeaderIndices属性实现
- 2、通过监听滚动，判断滚动位置来控制是否固定在顶部

## 实现1: 利用FlatList的stickyHeaderIndices属性实现
### 代码
```javascript
import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, findNodeHandle, NativeScrollEvent } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingHeader, LoadingFooter, PageFooter, Provider } from '@comps'
import { setState, resetFilter } from '@pages/member-analysis/slice'
import { PageBgEnum } from '@pages/member-analysis/enum'
import {
  getStoreCustomerStatistics,
  getPullNewStatistics,
  queryMemberList,
  Member
} from '@pages/member-analysis/service'
import { HeaderThemeEnum, px2Dp } from '@kit'
import { RootState, AppDispatch } from '@store'
import { common } from '@config/common'
import { WithScreenProps } from '@type'

import CardStatistics from '@pages/member-analysis/components/card-statistics'
import ConsumptionData from '@pages/member-analysis/components/consumption-data'
import UserListSelection from '@pages/member-analysis/components/user-list-selection'
import UserItem from '@pages/member-analysis/components/user-item'
import BottomButton from '@pages/member-analysis/components/bottom-btn'
import PhoneModal from '@pages/member-analysis/components/phone-modal'
import SourceChannelModal from '@pages/member-analysis/components/source-channel-modal'
import NoData from '@pages/member-analysis/components/no-data'

const MemberAnalysis = (props: MemberAnalysisProps) => {
  const { navigation, screenProps } = props
  const { storeCode } = screenProps

  const dispatch: AppDispatch = useDispatch()
  const dataRef = React.createRef<View>()
  const listRef = React.createRef<FlatList>()
  const {
    dataList,
    memberType,
    pageBgColor,
    currentPageNum,
    isLoading,
    hasMore,
    purchasedCategory,
    purchasedBrand,
    beginDate,
    endDate,
    sureFlag
  } = useSelector((state: RootState) => state.memberAnalysis)

  useEffect(() => {
    queryCustomerStatistics()
    queryPullNewStatistics()
  }, [])

  useEffect(() => {
    queryMemberListByPage(1)
  }, [sureFlag])

  return (
    <Provider>
      <View
        style={[
          styles.container,
          { paddingTop: px2Dp(88) + common.currentValue.statusBarHeight, backgroundColor: pageBgColor }
        ]}
      >
        <FloatingHeader
          onBack={() => dispatch(resetFilter())}
          title="会员分析"
          headerTheme={HeaderThemeEnum.transparent}
          navigation={navigation}
        />
        {dataList.length ? (
          <FlatList<Member>
            ref={listRef}
            data={dataList}
            style={styles.container}
            ListHeaderComponent={
              <>
                <CardStatistics />
                <View ref={dataRef} style={styles.bg}>
                  <ConsumptionData />
                </View>
              </>
            }
            stickyHeaderIndices={[1]}
            renderItem={({ item, index }) => {
              if (item?.itemType === 'topSelection' && index === 0) {
                return <UserListSelection navigation={navigation} />
              } else {
                return <UserItem key={item.snCustNum} data={item} navigation={navigation} />
              }
            }}
            ListEmptyComponent={<NoData />}
            onScroll={({ nativeEvent }) => onPageScroll(nativeEvent)}
            onEndReached={() => {
              if (!isLoading && hasMore) {
                queryMemberListByPage(currentPageNum + 1)
              }
            }}
            ListFooterComponent={
              isLoading && hasMore ? (
                <LoadingFooter />
              ) : !isLoading && !hasMore && dataList.length > 0 ? (
                <PageFooter />
              ) : null
            }
          />
        ) : null}
        <BottomButton navigation={navigation} />
        <PhoneModal />
        <SourceChannelModal />
      </View>
    </Provider>
  )

  async function queryCustomerStatistics() {
    getStoreCustomerStatistics(storeCode).then(res => {
      dispatch(setState({ consumption: res }))
    })
  }

  async function queryPullNewStatistics() {
    getPullNewStatistics(storeCode).then(res => {
      dispatch(setState({ pullNewList: res }))
    })
  }

  async function queryMemberListByPage(currentPage: number) {
    await dispatch(setState({ isLoading: true }))
    const params = {
      storeCode,
      memberType,
      categoryCode: purchasedCategory,
      brandCode: purchasedBrand,
      startTime: beginDate,
      endTime: endDate,
      pageNumber: currentPage,
      pageSize: 15
    }
    const res = await queryMemberList(params)
    const data = res?.dataList || []
    const list = currentPage === 1 ? data : dataList.concat(data)
    if (currentPage === 1) {
      list.unshift({ itemType: 'topSelection' })
    }

    dispatch(
      setState({
        isLoading: false,
        isSelectAll: false,
        dataList: list,
        totalCount: res.totalCount,
        currentPageNum: currentPage,
        hasMore: currentPage < res.totalPageCount
      })
    )
  }

  function onPageScroll(nativeEvent: NativeScrollEvent) {
    const offsetTop = nativeEvent.contentOffset.y

    dataRef.current?.measureLayout(
      findNodeHandle(listRef.current) || 0,
      (left: number, top: number) => {
        dispatch(
          setState({
            pageBgColor: offsetTop >= top ? PageBgEnum.WHITE : PageBgEnum.BLUE
          })
        )
      },
      () => {}
    )
  }
}

export default MemberAnalysis

type MemberAnalysisProps = WithScreenProps<{}> & NavigationInjectedProps

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    backgroundColor: 'transparent'
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: px2Dp(24),
    paddingVertical: px2Dp(18),
    justifyContent: 'space-between'
  }
})
```
### android端 必现如下错误， ios端正常
<img src="https://img-blog.csdnimg.cn/2d5466816eb041e0bd3d0ca719650252.png" width='350'/>

stickyHeaderIndices的值必须是数字数组,而且data的length必须大于0，不然在安卓会稳定触发index=xx，count=0的报错。也就是说用了stickyHeaderIndices这个属性，在
指定哪个子元素吸顶的时候，一定要保证这个元素已经渲染，首次渲染的时候，data为空或者为null的情况就要判断
<img src="https://img-blog.csdnimg.cn/c1fb9ccdc9874db8a3ececc24eeaccd1.png" width='450'/>


## 实现2: 通过监听滚动，判断滚动位置来控制是否固定在顶部
```javascript
const MemberAnalysis = (props: MemberAnalysisProps) => {
  const { navigation, screenProps } = props
  const { storeCode } = screenProps

  const dispatch: AppDispatch = useDispatch()
  const dataRef = React.createRef<View>()
  const listRef = React.createRef<FlatList>()
  const selectionRef = React.createRef<View>()
  const {
    dataList,
    memberType,
    pageBgColor,
    currentPageNum,
    isLoading,
    hasMore,
    purchasedCategory,
    purchasedBrand,
    beginDate,
    endDate,
    sureFlag
  } = useSelector((state: RootState) => state.memberAnalysis)

  useEffect(() => {
    queryCustomerStatistics()
    queryPullNewStatistics()
  }, [])

  useEffect(() => {
    queryMemberListByPage(1)
  }, [sureFlag])

  return (
    <Provider>
      <View
        style={[
          styles.container,
          { paddingTop: px2Dp(88) + common.currentValue.statusBarHeight, backgroundColor: pageBgColor }
        ]}
      >
        <FloatingHeader
          onBack={() => dispatch(resetFilter())}
          title="会员分析"
          headerTheme={HeaderThemeEnum.transparent}
          navigation={navigation}
        />
        <FixedUserListSelection navigation={navigation} />
        <FlatList<Member>
          ref={listRef}
          data={dataList}
          style={styles.container}
          ListHeaderComponent={
            <>
              <CardStatistics />
              <View ref={dataRef} style={styles.bg}>
                <ConsumptionData />
                <UserListSelection ref={selectionRef} isFixed={false} navigation={navigation} />
              </View>
            </>
          }
          initialNumToRender={15}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => {
            return <UserItem key={item.snCustNum} data={item} navigation={navigation} />
          }}
          ListEmptyComponent={<NoData />}
          onScroll={({ nativeEvent }) => onPageScroll(nativeEvent)}
          onEndReached={() => {
            if (!isLoading && hasMore) {
              queryMemberListByPage(currentPageNum + 1)
            }
          }}
          ListFooterComponent={
            isLoading && hasMore ? (
              <LoadingFooter />
            ) : !isLoading && !hasMore && dataList.length > 0 ? (
              <PageFooter />
            ) : null
          }
        />
        <BottomButton navigation={navigation} />
        <PhoneModal />
        <SourceChannelModal />
      </View>
    </Provider>
  )

  async function queryCustomerStatistics() {
    getStoreCustomerStatistics(storeCode).then(res => {
      dispatch(setState({ consumption: res }))
    })
  }

  async function queryPullNewStatistics() {
    getPullNewStatistics(storeCode).then(res => {
      dispatch(setState({ pullNewList: res }))
    })
  }

  async function queryMemberListByPage(currentPage: number) {
    await dispatch(setState({ isLoading: true }))
    const params = {
      storeCode,
      memberType,
      categoryCode: purchasedCategory,
      brandCode: purchasedBrand,
      startTime: beginDate,
      endTime: endDate,
      pageNumber: currentPage,
      pageSize: 15
    }
    const res = await queryMemberList(params)
    const data = res?.dataList || []
    const list = currentPage === 1 ? data : dataList.concat(data)

    dispatch(
      setState({
        isLoading: false,
        isSelectAll: false,
        dataList: list,
        totalCount: res.totalCount,
        currentPageNum: currentPage,
        hasMore: currentPage < res.totalPageCount
      })
    )
  }

  function onPageScroll(nativeEvent: NativeScrollEvent) {
    const offsetTop = nativeEvent.contentOffset.y

    dataRef.current?.measureLayout(
      findNodeHandle(listRef.current) || 0,
      (left: number, top: number) => {
        dispatch(
          setState({
            pageBgColor: offsetTop >= top ? PageBgEnum.WHITE : PageBgEnum.BLUE
          })
        )
      },
      () => {}
    )

    selectionRef.current?.measureLayout(
      findNodeHandle(listRef.current) || 0,
      (left: number, top: number) => {
        dispatch(
          setState({
            selectionFixed: offsetTop >= top
          })
        )
      },
      () => {}
    )
  }
}

export default MemberAnalysis

type MemberAnalysisProps = WithScreenProps<{}> & NavigationInjectedProps

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    backgroundColor: 'transparent'
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: px2Dp(24),
    paddingVertical: px2Dp(18),
    justifyContent: 'space-between'
  }
})
```
通过滚动距离进行判断
```javascript
 selectionRef.current?.measureLayout(
      findNodeHandle(listRef.current) || 0,
      (left: number, top: number) => {
        dispatch(
          setState({
            selectionFixed: offsetTop >= top
          })
        )
      },
      () => {}
    )
```
根据selectionFixed控制吸顶
<img src="https://img-blog.csdnimg.cn/b7108b7876a742b79eac07a4affe6d09.png" width='650'/>

## 总结
- 实现1是通过官方的api实现，动画效果更好，使用也简单些，缺点存在平台兼容问题
- 实现2是通过监听滚动，控制显示与隐藏，所以兼容性很好，缺点就是动画效果需要自己实
