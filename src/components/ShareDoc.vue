<template>
  <div id="shareDoc">
      <div class="wrapper">
          <div class="title">共享文档数量统计</div>
          <div class="wrapper-item">
              <h1 class="doc-total">总数:{{docTotal}}万</h1>
              <v-chart class="chart docChart" ref="docEcharts" :options="categoryOption" ></v-chart>
          </div>
      </div>
      <div class="wrapper-row">
          <div class="wrapper-row-item">
              <div class="title">患者性别统计图</div>
              <v-chart class="chart" ref="sexEcharts" :options="sexOption" ></v-chart>
          </div>
          <div class="wrapper-row-item">
              <div class="title">共享文档生成月平均图</div>
              <v-chart class="chart" ref="dayAveEcharts" :options="dayAveOption" ></v-chart>
          </div>
      </div>
      <div class="wrapper">
          <div class="wrapper-item">
               <div class="title">诊断排名top10</div>
               <a-table class="rankTable" 
                bordered 
                :rowKey="getRowKey"
                :columns="tableHeader" 
                :pagination="false" 
                :data-source="tableData"></a-table>
          </div>
      </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import { fetchShareRank, fetchGender, fetchShareDocumen, fetchShareDocumenByMonth  } from '../api/shareDocApi'
import { getRequestData } from '../shared/getRequestData.js'
export default {
    name:"shareDoc",
    data() {
        return {
            categoryOption:{},
            docTotal: 0,
            docNum:[],
            docName:[],
            sexOption:{},
            sexData:[],
            dayAveOption:{},
            dayData: [],
            dayAveData: [],
            tableHeader:[
                {
                    title: '排名',
                    dataIndex: 'rank',
                    width: 80,
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    width: 500,
                }
            ],
            tableData:[]
        }
    },
    mounted() {
        this.init()
    },
    methods:{
        init(){
            this.docEchartsInit()
            this.sexEchartsInit()
            this.dayAveEchartsInit()
            this.rankTableInit()
        }, 
        async docEchartsInit(){
            const _this = this
            const resData = await getRequestData(fetchShareDocumen)()
            _this.docName = resData.map(item=>{
                return item.DOC_NAME
            })
            _this.docNum = resData.map(item=>{
                return item.TOTAL
            })
            _this.categoryOption = {
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b} <br /> {c}万',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    top: '4%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name: '数量/万',
                },
                yAxis: {
                    type: 'category',
                    data: _this.docName,
                    name: '名称',
                    axisLabel: {
                        interval: 0
                    }
                },
                series: [
                    {
                        type: 'bar',
                        data: _this.docNum,
                        label: {
                            show: true,
                            formatter: '{c} 万',
                            color: '#000',
                            position: 'right'
                        },
                    }
                ]
            }
            _this.docTotal = _this.docNum.reduce((total,nextValue)=>{
                return total+nextValue
            })
        },
        async sexEchartsInit(){
            const _this = this
            const resData = await getRequestData(fetchGender)()
            _this.sexData = resData.map(item=>{
                return {
                    value:item.TOTAL,
                    name:item.SEX
                }
            })
            _this.sexOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: '15',
                    data: ['男', '女']
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '45%'],
                        data: _this.sexData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },
        async dayAveEchartsInit(){
            const _this = this
            let resData = await getRequestData(fetchShareDocumenByMonth)()
            resData = resData.sort((a,b)=>{
                let aTime = new Date(a.CREATE_TIME)
                let bTime = new Date(b.CREATE_TIME)
                return aTime < bTime ? -1 : 1
            })
            _this.dayData = resData.map(item=>{
                return item.CREATE_TIME
            })
            _this.dayAveData = resData.map(item=>{
                return item.TOTAL
            })
            _this.dayAveOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: _this.dayData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: _this.dayAveData,
                    type: 'line'
                }]
            }
        },
        async rankTableInit(){
            const _this = this 
            let resData = await getRequestData(fetchShareRank)()
            resData = resData.sort((a,b)=>{
                return b.total - a.total
            })
            _this.tableData = resData.map((item,index)=>{
                return {
                    rank: index + 1,
                    name: item.name
                }
            })
        },
        getRowKey(record){
            return record.rank
        }
    }

}

</script>
<style lang="scss" scoped>
.wrapper{
    display: flex;
    flex-flow: column;
    .wrapper-item{
        position: relative;
        flex: 1;
    }
}
.wrapper-row{
    display: flex;
    .wrapper-row-item{
        position: relative;
        flex: 1;
        display: flex;
        flex-flow: column;
    }
}
.docChart{
    height: 1400px;
}
.doc-total{
    position: absolute;
    left: 45%;
    z-index: 99;
}
.chart{
    margin: 0 auto;
    width: 100%;
}
.rankTable{
    margin: 0 auto;
}
</style>

