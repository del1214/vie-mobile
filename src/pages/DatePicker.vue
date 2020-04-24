<template>
  <div>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>DatePicker</p>
        </div>
        <div>
          <r-button @click="popupVisible = true">点我</r-button>
        </div>
        <div>
          <r-button @click="clickMe">增加最大最小值</r-button>
        </div>
        <div>不支持在DatePicker显示时修改maxDate或minDate,请在DatePicker隐藏(实际已销毁)时修改</div>
        <div>选中的时间为:{{popupDateFormated}}</div>
        <PopupDatePicker v-model="popupDate" :visible.sync="popupVisible" mode="DATETIME" title="选择时间" :minDate="popupMinDate" :maxDate="popupMaxDate" :miniteStep="5"></PopupDatePicker>
      </Card>
    </WingBlank>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>MinDate & MaxDate</p>
        </div>
        <DatePicker :date="minmaxDate" mode="DATE" :minDate="minDate" :maxDate="maxDate"></DatePicker>
      </Card>
    </WingBlank>

    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank>
      <Card :border="true">
        <div slot="headerTitle">
          <p>Year</p>
        </div>
        <DatePicker :date="year" mode="YEAR"></DatePicker>
      </Card>
    </WingBlank>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>Month</p>
        </div>
        <DatePicker :date="month" mode="MONTH"></DatePicker>
      </Card>
    </WingBlank>
    <WhiteSpace size="md"></WhiteSpace>

    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>Date</p>
        </div>
        <DatePicker :date="date"></DatePicker>
      </Card>
    </WingBlank>

    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>Time</p>
        </div>
        <DatePicker :date="time" mode="TIME"></DatePicker>
      </Card>
    </WingBlank>

    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>DateTime</p>
        </div>
        <DatePicker :date="dateTime" mode="DATETIME"></DatePicker>
      </Card>
    </WingBlank>
    <WhiteSpace size="md"></WhiteSpace>
  </div>
</template>
<script>
import Button from '@/components/button'
import { Card } from '@/components/card/'
import { WhiteSpace, WingBlank } from '@/components/space/'
import { DatePicker, PopupDatePicker } from '@/components/datepicker'
import moment from 'moment'
export default {
  components: {
    DatePicker,
    WhiteSpace,
    WingBlank,
    Card,
    PopupDatePicker,
    'r-button': Button
  },
  data() {
    return {
      popupVisible: false,
      popupDate: moment(),
      popupMinDate: moment('2014-12-14 18:00'),
      popupMaxDate: moment('2020-12-14 18:00'),
      date: moment(),
      year: moment(),
      month: moment(),
      time: moment(),
      dateTime: moment(),
      minmaxDate: moment(),
      minDate: moment('2014-12-14'),
      maxDate: moment('2020-12-14')
    }
  },
  methods: {
    clickMe(e) {
      this.popupMinDate = moment(this.popupMinDate.subtract(30, 'days').valueOf())
      this.popupMaxDate = moment(this.popupMaxDate.add(30, 'days').valueOf())
    }
  },
  computed: {
    popupDateFormated() {
      return this.popupDate.format('YYYY-MM-DD')
    }
  }
}
</script>
