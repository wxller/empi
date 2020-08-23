<template>
  <v-chart :options="options" />
</template>

<style>
.echarts {
  width: 100%;
}
</style>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { MONTHS } from '../shared/dataColumns'

function genOption(data) {
  return {
    title: {
      text: '匹配率',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: MONTHS,
      name: '月份',
    },
    yAxis: {
      type: 'value',
      name: '匹配率(%)',
    },
    series: [
      {
        data: data,
        type: 'line',
      },
    ],
  }
}

export default {
  name: 'EMPILineChart',
  props: {
    data: Array,
  },
  computed: {
    options() {
      return genOption(this.data)
    },
  },
}
</script>
