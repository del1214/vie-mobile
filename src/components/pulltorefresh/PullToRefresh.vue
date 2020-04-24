<template>
  <div class="vue-pull-to-wrapper" :style="{ height: wrapperHeight, transform: `translate3d(0, ${diff}px, 0)` }">
    <div v-show="topLoadMethod&&showTop" :style="{ height: `${topBlockHeight}px`, marginTop: `${-topBlockHeight}px` }" class="action-block">
      <div :class="showSpinner?spinnerType:'default-text'" :style="{'line-height':`${topBlockHeight}px`}">{{ showSpinner?'':topText }}</div>
    </div>
    <div class="scroll-container">
      <div v-show="noResult">
        <slot name="no-result"></slot>
      </div>
      <slot></slot>
      <div v-show="noMore">
        <slot name="no-more"></slot>
      </div>
    </div>
    <div v-show="bottomLoadMethod&&showBottom" :style="{ height: `${bottomBlockHeight}px`, marginBottom: `${-bottomBlockHeight}px` }" class="action-block">
      <div :class="showSpinner?spinnerType:'default-text'" :style="{'line-height':`${bottomBlockHeight}px`}">{{ showSpinner?'':bottomText }}</div>
    </div>
  </div>
</template>
<script>
const TOP_DEFAULT_CONFIG = {
  // 下拉时提示文字
  pullText: '下拉刷新',
  // 下拉释放提示文字
  triggerText: '释放更新',
  // 下拉加载时文字
  loadingText: '加载中...',
  // 成功文字
  doneText: '加载完成',
  // 失败文字
  failText: '加载失败',
  // 加载完毕等待时间
  loadedStayTime: 400,
  // 默认距离和高度一样
  stayDistance: 50,
  // 高度差多少触发
  triggerDistance: 70
}

const BOTTOM_DEFAULT_CONFIG = {
  // 上拉时提示文字
  pullText: '上拉加载',
  // 上拉释放提示文字
  triggerText: '释放更新',
  // 上拉加载时文字
  loadingText: '加载中...',
  // 成功文字
  doneText: '加载完成',
  // 失败文字
  failText: '加载失败',
  // 没有更多
  'no-moreText': '没有更多',
  // 没有数据
  'no-resultText': '没有数据',
  // 加载完毕等待时间
  loadedStayTime: 400,
  // 默认距离和高度一样
  stayDistance: 50,
  // 高度差多少触发
  triggerDistance: 70
}

const LOADING_CONFIG = {
  // loading时的类型 spinner or text
  type: 'spinner',
  // spinner 时的  loading 风格
  style: 'default'
}

const SPINNER_STYLE = {
  bubbles: 'loading-bubbles',
  circles: 'loading-circles',
  default: 'loading-default',
  spiral: 'loading-spiral',
  waveDots: 'loading-wave-dots'
}
// 节流方法
function throttle(fn, delay, mustRunDelay = 0) {
  let timer = null
  let tStart
  return function() {
    const context = this
    const args = arguments
    const tCurr = +new Date()
    clearTimeout(timer)
    if (!tStart) {
      tStart = tCurr
    }
    if (mustRunDelay !== 0 && tCurr - tStart >= mustRunDelay) {
      fn.apply(context, args)
      tStart = tCurr
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}
export default {
  name: 'vue-pull-to',
  props: {
    // 滑动阈值（数值越大，滑动越慢）
    distanceIndex: {
      type: Number,
      default: 2
    },
    // 顶部高度
    topBlockHeight: {
      type: Number,
      default: 50
    },
    // 底部高度
    bottomBlockHeight: {
      type: Number,
      default: 50
    },
    // 高度
    wrapperHeight: {
      type: String,
      default: '100%'
    },
    loadingConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 下拉刷新方法
    topLoadMethod: {
      type: Function
    },
    // 上拉加载方法
    bottomLoadMethod: {
      type: Function
    },
    // 下拉刷新节流
    isThrottleTopPull: {
      type: Boolean,
      default: true
    },
    // 下拉刷新节流
    isThrottleBottomPull: {
      type: Boolean,
      default: true
    },
    // 滚动节流
    isThrottleScroll: {
      type: Boolean,
      default: true
    },
    // 顶部反弹
    isTopBounce: {
      type: Boolean,
      default: true
    },
    // 底部反弹
    isBottomBounce: {
      type: Boolean,
      default: true
    },
    // 顶部配置对象
    topConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 底部配置对象
    bottomConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    autoLoad: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 滚动的元素
      scrollEl: null,
      // 初始滚动0
      startScrollTop: 0,
      // Y方向初始0
      startY: 0,
      // 当前Y0
      currentY: 0,
      // 滚动差值0
      distance: 0,
      // 方向
      direction: '',
      // 位移值0
      diff: 0,
      // touch前的位移值
      beforeDiff: 0,
      // 顶部提示文字
      topText: '',
      // 底部提示文字
      bottomText: '',
      // 状态-pull, trigger, loading
      state: '',
      // 到达底部
      bottomReached: false,
      // 下拉方法
      throttleEmitTopPull: null,
      // 上拉方法
      throttleEmitBottomPull: null,
      // 滚动方法
      throttleEmitScroll: null,
      // 无限滚动方法
      throttleOnInfiniteScroll: null,
      noResult: false,
      noMore: false
    }
  },
  computed: {
    _topConfig: function() {
      return Object.assign({}, TOP_DEFAULT_CONFIG, this.topConfig)
    },
    _bottomConfig: function() {
      return Object.assign({}, BOTTOM_DEFAULT_CONFIG, this.bottomConfig)
    },
    _loadingConfig: function() {
      return Object.assign({}, LOADING_CONFIG, this.loadingConfig)
    },
    showTop() {
      // 下拉 或者 状态为 no-result
      return this.direction === 'down' || this.state === 'loaded-no-result'
    },
    showBottom() {
      // 上拉 并且 状态不为no-result和no-more
      return this.direction === 'up' && this.state !== 'loaded-no-result' && this.diff
    },
    showSpinner() {
      return this._loadingConfig.type === 'spinner' && this.state === 'loading'
    },
    spinnerType() {
      return SPINNER_STYLE[this._loadingConfig.style] || SPINNER_STYLE.default
    }
  },
  methods: {
    // 上下拉-修改提示文字
    actionPull() {
      // 状态为pull
      this.state = 'pull'
      this.direction === 'down'
        // 顶部提示文字-下拉刷新
        ? this.topText = this._topConfig.pullText
        // 底部提示文字-上拉加载
        : this.bottomText = this._bottomConfig.pullText
    },
    // 释放-是下拉还是上拉
    actionTrigger() {
      // 状态为trigger
      this.state = 'trigger'
      this.direction === 'down'
        // 顶部提示文字-释放更新
        ? this.topText = this._topConfig.triggerText
        // 底部提示文字-释放更新
        : this.bottomText = this._bottomConfig.triggerText
    },
    // 正在加载
    actionLoading() {
      // 状态为loading
      this.$emit('onLoading')
      this.state = 'loading'
      if (this.direction === 'down') {
        // 下拉,顶部提示文字修改,然后掉下拉方法
        this.topText = this._topConfig.loadingText
        /* eslint-disable no-useless-call */
        this.topLoadMethod.call(this, this.actionLoaded)
        // 滚动到顶部部初始状态-默认和顶部高度相同
        this.scrollTo(this._topConfig.stayDistance)
      } else {
        // 上拉,底部文字修改,然后掉上拉方法
        this.bottomText = this._bottomConfig.loadingText
        this.bottomLoadMethod.call(this, this.actionLoaded)
        // 滚动到底部初始状态-默认和底部状态相同
        this.scrollTo(-this._bottomConfig.stayDistance)
      }
    },
    // 加载完毕-调用改组件回调,在这里处理顶部底部加载结束时组件状态
    actionLoaded(loadState) {
      // 状态为-加载结束状态  done, fail, no-more, no-result, reset
      this.state = `loaded-${loadState}`
      let loadedStayTime
      // 加载结束提示文字
      if (this.direction === 'down') {
        // 下拉,顶部提示文字加载完毕或加载失败
        this.topText = this._topConfig[loadState + 'Text'] || '加载完成'
        // 加载完毕等待时间
        loadedStayTime = this._topConfig.loadedStayTime
      } else {
        // 上拉,底部提示文字
        this.bottomText = this._bottomConfig[loadState + 'Text']
        // 加载完毕等待时间
        loadedStayTime = this._bottomConfig.loadedStayTime
      }
      // 位移归0
      if (this.diff && loadState !== 'reset') {
        setTimeout(() => {
          this.scrollTo(0)
          // reset state
          if (loadState !== 'no-more' && loadState !== 'no-result') {
            setTimeout(() => {
              this.state = ''
            }, 200)
          }
        }, loadedStayTime)
      }

      if (loadState === 'done' || loadState === 'fail') {
        // 加载完成或失败
        this.noResult = false
        this.noMore = false
      } else if (loadState === 'no-more') {
        // 没有更多
        this.noResult = false
        this.noMore = true
      } else if (loadState === 'reset') {
        // 重置
        this.noResult = false
        this.noMore = false
        this.initData()
      } else if (loadState === 'no-result') {
        // 没有结构
        this.noResult = true
        this.noMore = false
      } else {
        // 传入的loadState不合格
        console.warn('请传入done,fail,no-more,no-result,reset')
      }
    },
    scrollTo(y, duration = 200) {
      this.$el.style.transition = `${duration}ms`
      // 设置位移值
      this.diff = y
      // 过渡完毕后,将过渡时间清除
      setTimeout(() => {
        this.$el.style.transition = ''
      }, duration)
    },
    // 检测滚动到底
    checkBottomReached() {
      // 滚动距离+高度+1 大于等于 滚动高度
      return this.scrollEl.scrollTop + this.scrollEl.offsetHeight + 1 >= this.scrollEl.scrollHeight
    },
    // TouchStart
    handleTouchStart(event) {
      // Y方向起点
      this.startY = event.touches[0].clientY
      // 位移初始量
      this.beforeDiff = this.diff
      // 初始滚动距离
      this.startScrollTop = this.scrollEl.scrollTop
      // 是否滚动到底
      this.bottomReached = this.checkBottomReached()
    },
    // TouchMove
    handleTouchMove(event) {
      event.preventDefault()
      event.stopPropagation()
      // 当前Y方向位置
      this.currentY = event.touches[0].clientY
      // 滑动长度 = (当前Y - 开始Y) / 阀值  +  初始位移
      this.distance = (this.currentY - this.startY) / this.distanceIndex + this.beforeDiff

      // 加载中禁止拖动
      if (this.state === 'loading') {
        return false
      }
      // 上拉
      if (this.distance <= 0) {
        // 无结果或者无更多数据
        if (this.state === 'loaded-no-result' || this.state === 'loaded-no-more') {
          return false
        }
      } else {
        // 下拉刷新-不显示
        this.noMore = false
      }
      // 大于0 方向 向下, 反之向上
      this.direction = this.distance > 0 ? 'down' : 'up'
      if (this.startScrollTop === 0 && this.direction === 'down' && this.isTopBounce) {
        // 初始未滚动,方向下拉,顶部反弹
        // 设置位移量
        this.diff = this.distance
        // 顶部节流 调节流方法, 不节流直接触发top-pull
        this.isThrottleTopPull ? this.throttleEmitTopPull(this.diff) : this.$emit('top-pull', this.diff)
        // 下拉方法不存在
        if (typeof this.topLoadMethod !== 'function') return

        if (this.distance < this._topConfig.triggerDistance &&
          this.state !== 'pull' && this.state !== 'loading') {
          // 滚动长度不可以触发,状态不是pull也不是loading,
          // 只修改顶部提示文字
          this.actionPull()
        } else if (this.distance >= this._topConfig.triggerDistance &&
          this.state !== 'trigger' && this.state !== 'loading') {
          // 滚动长度可以触发,修改提示文字
          this.actionTrigger()
        }
      } else if (this.bottomReached && this.direction === 'up' && this.isBottomBounce) {
        // 到达底部,方向上拉,底部反弹
        // 设置位移
        this.diff = this.distance
        // 底部节流 调节流方法, 不节流直接触发bottom-pull
        this.isThrottleBottomPull ? this.throttleEmitBottomPull(this.diff) : this.$emit('bottom-pull', this.diff)
        // 底部方法不存在
        if (typeof this.bottomLoadMethod !== 'function') return

        if (Math.abs(this.distance) < this._bottomConfig.triggerDistance &&
          this.state !== 'pull' && this.state !== 'loading') {
          // 滚动长度不能触发底部,状态不是pull也不是loading
          // 修改底部提示文字
          this.actionPull()
        } else if (Math.abs(this.distance) >= this._bottomConfig.triggerDistance &&
          this.state !== 'trigger' && this.state !== 'loading') {
          // 滚动长度可以触发,修改提示文字
          this.actionTrigger()
        }
      }
      return false
    },
    // touchEnd
    handleTouchEnd(event) {
      event.stopPropagation()
      // 有位移
      if (this.diff !== 0) {
        // 可以触发
        if (this.state === 'trigger') {
          // 触发loading
          this.actionLoading()
          return
        }

        // pull cancel
        this.scrollTo(0)
      }
    },
    // scroll
    handleScroll(event) {
      // 滚动节流
      this.isThrottleScroll ? this.throttleEmitScroll(event) : this.$emit('scroll', event)
      this.throttleOnInfiniteScroll()
    },
    // 无限滚动
    onInfiniteScroll() {
      // 滚动到底
      if (this.checkBottomReached()) {
        this.$emit('infinite-scroll')
      }
    },
    // 绑事件
    bindEvents() {
      this.scrollEl.addEventListener('touchstart', this.handleTouchStart)
      this.scrollEl.addEventListener('touchmove', this.handleTouchMove)
      this.scrollEl.addEventListener('touchend', this.handleTouchEnd)
      this.scrollEl.addEventListener('scroll', this.handleScroll)
    },
    // 节流方式触发事件
    throttleEmit(delay, mustRunDelay = 0, eventName) {
      const throttleMethod = function() {
        const args = [...arguments]
        args.unshift(eventName)
        // 触发对应事件,上下拉时参数为位移值,滚动时为滚动对象
        this.$emit.apply(this, args)
      }
      // throttleMethod 回调方法 delay 延迟回调  mustRunDelay间隔多少秒掉回调
      return throttle(throttleMethod, delay, mustRunDelay)
    },
    // 节流方法
    createThrottleMethods() {
      // 延迟200秒  间隔300秒 触发 top-pull
      this.throttleEmitTopPull = this.throttleEmit(200, 300, 'top-pull')
      // 延迟200秒  间隔300秒 触发 bottom-pull
      this.throttleEmitBottomPull = this.throttleEmit(200, 300, 'bottom-pull')
      // 延迟100秒  间隔150秒 触发 scroll
      this.throttleEmitScroll = this.throttleEmit(100, 150, 'scroll')
      // 触发无限滚动, 间隔400秒
      this.throttleOnInfiniteScroll = throttle(this.onInfiniteScroll, 400)
    },
    // 初始化
    init() {
      this.createThrottleMethods()
      this.scrollEl = this.$el.querySelector('.scroll-container')
      this.bindEvents()
    },
    removeEvent() {
      this.scrollEl.removeEventListener('touchstart', this.handleTouchStart)
      this.scrollEl.removeEventListener('touchmove', this.handleTouchMove)
      this.scrollEl.removeEventListener('touchend', this.handleTouchEnd)
      // 触发
      this.scrollEl.removeEventListener('scroll', this.handleScroll)
    },
    initData() {
      this.diff = this.topBlockHeight
      this.topText = this._topConfig.loadingText
      this.direction = 'down'
      this.state = 'loading'
      this.bottomLoadMethod && this.bottomLoadMethod.call(this, this.actionLoaded)
    }
  },
  mounted() {
    this.init()
    if (this.autoLoad) {
      this.initData()
    }
  },
  beforeDestroy() {
    this.removeEvent()
  }
}
</script>

<style scoped>
.vue-pull-to-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-container {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.vue-pull-to-wrapper .action-block {
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.default-text {
  height: 100%;
  text-align: center;
  font-size: 14px;
}
.action-block [class^="loading-"]{
    width: 28px;
    height: 28px;
    border-radius: 50%;
}
</style>
