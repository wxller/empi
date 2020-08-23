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

const genOptions = (data) => ({
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
    name: '数量',
  },
  series: [
    {
      data,
      type: 'line',
    },
  ],
})

export default {
  name: 'InterActionLineChart',
  props: {
    data: Array,
  },
  computed: {
    options() {
      return genOptions(this.data)
    },
  },
}
</script>
