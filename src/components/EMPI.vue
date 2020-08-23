<template>
  <div class="table-wrapper">
    <section class="tool-sift">
      <a-month-picker
        placeholder="选择月份"
        v-model="date"
        @change="getEmpiTable"
      />
    </section>
    <a-table
      :scroll="{ y: '30vh' }"
      :columns="empiColumns"
      :data-source="empiData"
      :pagination="false"
      :rowKey="genEmpiRowKey"
    >
      <span slot="patientCount" slot-scope="text">{{ text }}</span>
      <span slot="registerCount"></span>
      <span slot="exactCount"></span>
      <span slot="dimMatch"></span>
      <span slot="matchRatio" slot-scope="text">{{ text }} %</span>
    </a-table>
    <a-divider dashed />
    <a-table
      :scroll="{ y: '30vh' }"
      :columns="empiUseColumns"
      :data-source="systemUseData"
      :pagination="false"
      :rowKey="genSysUseRowKey"
    >
      <span slot="SYSTEM_NAME" slot-scope="text">{{ text }}</span>
      <span slot="INVOKE_COUNT"></span>
      <span slot="REGISTER_COUNT"></span>
    </a-table>
    <a-divider dashed />
    <section class="charts">
      <EMPILineChart :data="lineChartData" />
      <EMPIPieChart :data="systemUseData" />
    </section>
  </div>
</template>

<script>
import { EMPI_COLUMNS, EMPI_USE_COLUMNS } from "../shared/dataColumns";
import EMPILineChart from "./EMPILineChart";
import EMPIPieChart from "./EMPIPieChart";
import moment from "moment";
import {
  fetchEmpiTable,
  fetchMatchLine,
  fetchSysUseTable,
} from "../api/empiApi";
import { parseLineData } from "../shared/parseLineData";
import { getRequestData } from "../shared/getRequestData";

export default {
  name: "EMPI",
  components: {
    EMPILineChart,
    EMPIPieChart,
  },
  data() {
    return {
      empiData: [],
      systemUseData: [],
      date: moment(),
      empiColumns: EMPI_COLUMNS,
      empiUseColumns: EMPI_USE_COLUMNS,
      showModal: false,
      lineChartData: [],
    };
  },
  mounted() {
    this.getEmpiTable();
    this.getSysUseTable();
    this.getMatchLine();
  },
  methods: {
    onMonthChange(date) {
      console.log("date", date);
    },
    async getEmpiTable(date) {
      let year;
      let month;
      if (date == null) {
        year = moment().year();
        month = moment().month() + 1;
      } else {
        year = date.year();
        month = date.month() + 1;
      }

      const res = await getRequestData(fetchEmpiTable)({ year, month });
      this.empiData = res;
    },
    async getMatchLine() {
      const res = await getRequestData(fetchMatchLine)();
      this.lineChartData = parseLineData(res, "avgRatio");
    },
    async getSysUseTable() {
      const res = await getRequestData(fetchSysUseTable)();
      this.systemUseData = res;
    },
    genEmpiRowKey(record) {
      return record.id;
    },
    genSysUseRowKey(record) {
      return record.SYSTEM_NAME;
    },
  },
};
</script>

<style scoped lang="scss">
.table-wrapper {
  margin-top: 10px;
  .tool-sift {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .charts {
    display: flex;
    justify-content: space-around;
  }
}
</style>
