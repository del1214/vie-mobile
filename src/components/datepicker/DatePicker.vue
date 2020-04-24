<template>
  <div>
    <MultiPicker :selectedValues="selectedValues" :hasKey="true" :multiItems="multiItems" v-on:valueChange="valueChange"></MultiPicker>
  </div>
</template>

<script>
import { MultiPicker } from '../../components/picker'
import moment from 'moment'
import { oneOf } from '../../utils/object'
import { companyPrefix } from '../../config/style.js'
import defaultLocale from './locale/zh_CN.js'
const prefixCls = `${companyPrefix}-date-picker`
const pickerPrefixCls = `${companyPrefix}-picker`
// 支持的几种模式
const [DATE, TIME, DATETIME, YEAR, MONTH] = ['DATE', 'TIME', 'DATETIME', 'YEAR', 'MONTH']

// 获得月份的最后一天
function getDaysInMonth(now) {
  return now.clone().endOf('month').date()
}

/*
* 垫 9 to 09
*/
function pad(n) {
  return n < 10 ? `0${n}` : n + ''
}

export default {
  components: {
    MultiPicker
  },
  props: {
    // 模式
    mode: {
      validator(value) {
        // 日期,时间,日期和时间,年,月
        return oneOf(value, [DATE, TIME, DATETIME, YEAR, MONTH])
      },
      type: String,
      default: DATE
    },
    // 分钟的步长 默认1
    minuteStep: {
      type: Number,
      default: 1
    },
    // 传过来的时间
    date: {
      type: Object
    },
    // 默认时间 没什么用
    defaultDate: {
      type: Object
    },
    // 最小时间
    minDate: {
      type: Object
    },
    // 最大时间
    maxDate: {
      type: Object
    },
    // class前缀,没事不要改
    prefixCls: {
      type: String,
      default: prefixCls
    },
    // pikcer class前缀,没事不要改
    pickerPrefixCls: {
      type: String,
      default: pickerPrefixCls
    },
    locale: {
      type: Object,
      default: function () {
        return Object.assign({}, defaultLocale)
      }
    }
  },
  data() {
    return {
      currDate: this.copyDate(this.date || this.defaultDate), // 当前时间
      defaultMinDate: null, // 默认最小时间
      defaultMaxDate: null, // 默认最大时间
      selectedValues: [], // 选中值遵循picker,值数组
      multiItems: [] // 实际渲染所需数组
    }
  },
  created() {
    const valueCols = this.getValueCols()
    let cols = valueCols.cols
    let value = valueCols.value
    this.multiItems = cols
    this.selectedValues = value
  },
  methods: {
    // 取出时间戳再重新构建一个moment对象
    copyDate(date) {
      return moment(date.valueOf())
    },
    clipDate(date) {
      const mode = this.mode
      const minDate = this.getMinDate()
      const maxDate = this.getMaxDate()
      if (mode === DATETIME) {
        if (date.isBefore(minDate)) {
          return minDate.clone()
        }
        if (date.isAfter(maxDate)) {
          return maxDate.clone()
        }
      } else if (mode === DATE) {
        if (date.isBefore(minDate, 'day')) {
          return minDate.clone()
        }
        if (date.isAfter(maxDate, 'day')) {
          return maxDate.clone()
        }
      } else {
        const maxHour = maxDate.hour()
        const maxMinutes = maxDate.minute()
        const minHour = minDate.hour()
        const minMinutes = minDate.minute()
        const hour = date.hour()
        const minutes = date.minute()
        if (hour < minHour || hour === minHour && minutes < minMinutes) {
          return minDate.clone()
        }
        if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
          return maxDate.clone()
        }
      }
      return date
    },
    // 得到公历
    getGregorianCalendar(arg) {
      return moment(arg)
    },
    // 得到默认最低日期
    getDefaultMinDate() {
      if (!this.defaultMinDate) {
        this.defaultMinDate = this.getGregorianCalendar([1900, 0, 1, 0, 0, 0])
      }
      return this.defaultMinDate
    },
    // 得到默认最高日期
    getDefaultMaxDate() {
      if (!this.defaultMaxDate) {
        this.defaultMaxDate = this.getGregorianCalendar([2049, 1, 1, 23, 59, 59])
      }
      return this.defaultMaxDate
    },
    getMinDate() {
      return this.minDate || this.getDefaultMinDate()
    },
    getMaxDate() {
      return this.maxDate || this.getDefaultMaxDate()
    },
    getDate() {
      return this.currDate || this.getDefaultMinDate()
    },
    getMinYear() {
      return this.getMinDate().year()
    },
    getMaxYear() {
      return this.getMaxDate().year()
    },
    getMinMonth() {
      return this.getMinDate().month()
    },
    getMaxMonth() {
      return this.getMaxDate().month()
    },
    getMinDay() {
      return this.getMinDate().date()
    },
    getMaxDay() {
      return this.getMaxDate().date()
    },
    getMinHour() {
      return this.getMinDate().hour()
    },
    getMaxHour() {
      return this.getMaxDate().hour()
    },
    getMinMinute() {
      return this.getMinDate().minute()
    },
    getMaxMinute() {
      return this.getMaxDate().minute()
    },
    // 获得日期数据
    getDateData() {
      let mode = this.mode
      let locale = this.locale
      let date = this.getDate()
      let selYear = date.year()
      let selMonth = date.month()
      let minDateYear = this.getMinYear()
      let maxDateYear = this.getMaxYear()
      let minDateMonth = this.getMinMonth()
      let maxDateMonth = this.getMaxMonth()
      let minDateDay = this.getMinDay()
      let maxDateDay = this.getMaxDay()
      let years = []
      for (let i = minDateYear; i <= maxDateYear; i++) {
        years.push({
          value: i + '',
          label: i + locale.year + ''
        })
      }
      // 年模式返回
      const yearCol = { key: 'year', values: years }
      if (mode === YEAR) {
        return [yearCol]
      }

      // 开始处理月
      let months = []
      let minMonth = 0
      let maxMonth = 11
      if (minDateYear === selYear) {
        minMonth = minDateMonth
      }
      if (maxDateYear === selYear) {
        maxMonth = maxDateMonth
      }
      for (let i = minMonth; i <= maxMonth; i++) {
        months.push({
          value: i + '',
          label: i + 1 + locale.month + ''
        })
      }
      const monthCol = { key: 'month', values: months }
      // 月模式返回
      if (mode === MONTH) {
        return [yearCol, monthCol]
      }

      let days = []
      let minDay = 1
      let maxDay = getDaysInMonth(date)

      // 此年 此月
      if (minDateYear === selYear && minDateMonth === selMonth) {
        minDay = minDateDay
      }
      if (maxDateYear === selYear && maxDateMonth === selMonth) {
        maxDay = maxDateDay
      }

      for (let i = minDay; i <= maxDay; i++) {
        days.push({
          value: i + '',
          label: i + locale.day + ''
        })
      }
      const dayCol = { key: 'day', values: days }
      // 年月日
      return [yearCol, monthCol, dayCol]
    },
    // 获得时间数据
    getTimeData() {
      let minHour = 0
      let maxHour = 23
      let minMinute = 0
      let maxMinute = 59
      let locale = this.locale
      let mode = this.mode
      let minuteStep = this.minuteStep
      let date = this.getDate()
      let minDateMinute = this.getMinMinute()
      let maxDateMinute = this.getMaxMinute()
      let minDateHour = this.getMinHour()
      let maxDateHour = this.getMaxHour()
      let hour = date.hour()
      if (mode === DATETIME) {
        let year = date.year()
        let month = date.month()
        let day = date.date()
        let minDateYear = this.getMinYear()
        let maxDateYear = this.getMaxYear()
        let minDateMonth = this.getMinMonth()
        let maxDateMonth = this.getMaxMonth()
        let minDateDay = this.getMinDay()
        let maxDateDay = this.getMaxDay()
        if (minDateYear === year && minDateMonth === month && minDateDay === day) {
          minHour = minDateHour
          if (minDateHour === hour) {
            minMinute = minDateMinute
          }
        }
        if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
          maxHour = maxDateHour
          if (maxDateHour === hour) {
            maxMinute = maxDateMinute
          }
        }
      } else {
        minHour = minDateHour
        if (minDateHour === hour) {
          minMinute = minDateMinute
        }
        maxHour = maxDateHour
        if (maxDateHour === hour) {
          maxMinute = maxDateMinute
        }
      }
      const hours = []
      for (let i = minHour; i <= maxHour; i++) {
        hours.push({
          value: i + '',
          label: pad(i) + locale.hour
        })
      }
      const hourCol = { key: 'hour', values: hours }

      const minutes = []
      for (let i = minMinute; i <= maxMinute; i += minuteStep) {
        minutes.push({
          value: i + '',
          label: pad(i) + locale.minute
        })
      }

      const minuteCol = { key: 'minute', values: minutes }
      return [hourCol, minuteCol]
    },
    // 核心方法,获得选中值与渲染数组
    getValueCols() {
      // 模式
      let mode = this.mode
      // 获得当前日期
      let date = this.getDate()
      // 列
      let cols = []
      // 选中值
      let value = []
      // 年模式
      if (mode === YEAR) {
        return {
          cols: this.getDateData(),
          value: [date.year() + '', date.month() + '']
        }
      }
      // 月模式
      if (mode === MONTH) {
        return {
          cols: this.getDateData(),
          value: [date.year() + '', date.month() + '']
        }
      }
      if (mode === DATETIME || mode === DATE) {
        cols = this.getDateData()
        value = [date.year() + '', date.month() + '', date.date() + '']
      }
      if (mode === DATETIME || mode === TIME) {
        cols = cols.concat(this.getTimeData())
        value = value.concat([date.hour() + '', date.minute() + ''])
      }
      return {
        value,
        cols
      }
    },
    valueChange(value, item, index) {
      let _value = parseInt(value, 10)
      let mode = this.mode
      let newValue = this.getDate().clone()
      if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
        switch (index) {
          case 0:
            newValue.year(_value)
            break
          case 1:
            newValue.month(_value)
            break
          case 2:
            newValue.date(_value)
            break
          case 3:
            newValue.hour(value)
            break
          case 4:
            newValue.minute(value)
            break
          default:
            break
        }
      } else {
        switch (index) {
          case 0:
            newValue.hour(_value)
            break
          case 1:
            newValue.minute(_value)
            break
          default:
            break
        }
      }
      newValue = this.clipDate(newValue)
      this.currDate = newValue
      let result = this.getValueCols()
      let cols = result.cols
      let values = result.value
      this.multiItems = cols
      this.selectedValues = values
      this.$emit('update:date', this.currDate)
    }
  }
}
</script>
