<template>
  <div class="table-wrapper">
    <div class="title">交互服务访问量统计</div>
    <section class="tool-sift">
      <a-month-picker placeholder="选择年月" v-model="date" @change="getInteractionTable" />
    </section>
    <a-table
      :scroll="{ y: '30vh' }"
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :rowKey="genRowKey"
    >
      <span slot="serviceName" slot-scope="text">{{ text }}</span>
      <span slot="total"></span>
      <span slot="upstream"></span>
      <span slot="downstream"></span>
      <span slot="action">
        <a>查看日志</a>
      </span>
    </a-table>
    <section>
      <div class="title">交互服务访问量趋势图</div>
      <InterActionLineChart :data="lineData" />
    </section>
  </div> 
</template>

<script>
import { INTERACTION_COLUMNS } from '../shared/dataColumns'
import { parseLineData } from '../shared/parseLineData'
import InterActionLineChart from './InterActionLineChart'
import moment from 'moment'
import { fetchInteractionTable, fetchInteractionLineData } from '../api/interactionApi'
import { getRequestData } from '../shared/getRequestData'

export default {
  name: 'Interaction',
  components: {
    InterActionLineChart, 
  },
  mounted() {
    this.getInteractionTable()
    this.getInteractionLineData()
  },
  data() {
    return {
      date: moment(),
      columns: INTERACTION_COLUMNS,
      tableData: [],
      lineData: [],
    }
  },
  methods: {
    async getInteractionTable(date) {
      let year
      let month
      if (date == null) {
        year = moment().year()
        month = moment().month() + 1
      } else {
        year = date.year()
        month = date.month() + 1
      }

      const res = await getRequestData(fetchInteractionTable)({ year, month })
      this.tableData = res
    },
    async getInteractionLineData() {
      const res = await getRequestData(fetchInteractionLineData)()
      this.lineData = parseLineData(res, 'sumTotal')
    },
    genRowKey(record) {
      return `${record.serviceName}-${record.countYear}-${record.countMonth}`
    },
  },
}
</script>

<style scoped lang="scss">
.table-wrapper {
  margin-top: 10px;
  .tool-sift {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }
}
</style>
