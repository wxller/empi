<template>
  <v-chart :options="options" />
</template>

<style>
.echarts {
  width: 100%;
}
</style>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

function genOptions(data) {
  const registers = data.map((i) => ({
    name: i.SYSTEM_NAME,
    value: i.REGISTER_COUNT,
  }))

  const legendData = data.map((i) => i.SYSTEM_NAME)

  return {
    title: {
      text: '注册系统',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      data: legendData,
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: registers,
      },
    ],
  }
}

export default {
  name: 'EMPIPieChart',
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
