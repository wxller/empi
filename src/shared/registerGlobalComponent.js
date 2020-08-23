import Vue from 'vue'
import { Button, Divider, Icon, Row, Col, Modal, Alert, Table, Menu, Radio, DatePicker } from 'ant-design-vue'
import VueRouter from 'vue-router'
import ECharts from 'vue-echarts'

export function registerGlobalComponent() {
  Vue.use(VueRouter)
  Vue.component('v-chart', ECharts)
  Vue.use(Modal)
  Vue.component(Table.name, Table)
  Vue.component(Menu.name, Table)
  Vue.component(Menu.Item.name, Menu.Item)
  Vue.component(Alert.name, Alert)
  Vue.component(Button.name, Button)
  Vue.component(Button.Group.name, Button.Group)
  Vue.component(Radio.name, Radio)
  Vue.component(Radio.Button.name, Radio.Button)
  Vue.component(Radio.Group.name, Radio.Group)
  Vue.component(Divider.name, Divider)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker)
  Vue.component(Icon.name, Icon)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
}
