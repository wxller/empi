<template>
  <div id="shareDoc">
      <div class="wrapper">
          <div class="wrapper-item">
              <h1 class="doc-total">总数:{{docTotal}}万</h1>
              <v-chart class="chart docChart" ref="docEcharts" :options="categoryOption" ></v-chart>
          </div>
      </div>
      <div class="wrapper">
          <div class="wrapper-item">
              <v-chart class="chart" ref="sexEcharts" :options="sexOption" ></v-chart>
          </div>
          <div class="wrapper-item">
              <v-chart class="chart" ref="dayAveEcharts" :options="dayAveOption" ></v-chart>
          </div>
      </div>
      <div class="wrapper">
          <div class="wrapper-item">
               <h2>诊断排行</h2>
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
            docNum:[ 7,2,3,5,6,2,4,6,2,7,2,7,8,2,2,6,9,1,3,2,4,5,1,6,2,3,6,2,1,5,6,3,4,5,3,1,3,5,4,1,2,5,6,3,8,3,5,2,7,1,5,7,2 ],
            docName:['病理概要', '门（急）诊病历', '急诊留观病历', '西药处方', '中药处方', '检查记录','检验记录'
                    ,'治疗记录','一般手术记录','麻醉术前访视记录','麻醉记录','麻醉术后访视记录','输血记录','待产记录'
                    ,'阴道分娩记录','剖宫产记录','一般护理记录','病重（病危）护理记录','手术护理记录','生命体征测量记录'
                    ,'出入量记录','高值耗材使用记录','入院评估','护理计划','出院评估与指导','手术知情同意书','麻醉知情同意书'
                    ,'输血治疗同意书','特殊检查及特殊治疗同意书','病危（重）通知书','其他知情告知同意书','住院病案首页'
                    ,'中医住院病案首页','入院记录','24h内入出院记录','24h内入院死亡记录','首次病程记录','日常病程记录'
                     ,'上级医师查房记录','疑难病例讨论记录','交接班记录','转科记录','阶段小结','抢救记录','会诊记录'
                    ,'术前小结','术前讨论','术后首次病程记录','出院记录','死亡记录','死亡病例讨论记录','住院医嘱'
                    ,'出院小结'],
            sexOption:{},
            sexData:[
                {value: 7, name: '男'},
                {value: 3, name: '女'},
            ],
            dayAveOption:{},
            dayData: ['2020-03','2020-04','2020-05','2020-06','2020-07','2020-08'],
            dayAveData: [17,11,15,19,18,11],
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
            tableData:[
                {
                    rank: 1,
                    name:"zhangsan"
                }
            ]
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
                title: {
                    text: '文档数量'
                },
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
                title: {
                    text: '性别数量图',
                    subtext: '',
                    left: 'center'
                },
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
                title: {
                    text:'月平均图'
                },
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
<style scoped>
.wrapper{
    display: flex;
    flex-flow: row;
    
}
.wrapper-item{
    flex: 1;
}
.wrapper-item{
    position: relative;
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

