import Vue from 'vue'
import App from './App.vue'
import { registerGlobalComponent } from './shared/registerGlobalComponent'
import { router } from './shared/router'

registerGlobalComponent()

/* 兼容低版本浏览器 */
import "@babel/polyfill";
import Es6Promise from "es6-promise";
Es6Promise.polyfill();

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
