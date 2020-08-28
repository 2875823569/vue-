import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "../element-variables.scss";
import ECharts from "vue-echarts";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, ECharts);
Vue.config.productionTip = false;
import 'default-passive-events';
Date.prototype.myfunction = function(time){
  if(!time) return "未填写时间"
  let date = new Date()
  let thatDate = new Date(parseInt(time))
  let nowTime = date.getTime();

  let dur = parseInt((nowTime - time)/1000);
  if(dur<3600){
    return `${dur%60}分钟前`
  }else if(dur<(3600*24)){
    return `${parseInt(parseInt(dur/3600%60))}小时${parseInt(dur/60%60)}分钟前`
  }else{
    return `${thatDate.getFullYear()}年${thatDate.getMonth()+1}月${thatDate.getDay()}日 ${thatDate.getHours()}:${thatDate.getMinutes()}`
  }
}
Vue.component("v-chart", ECharts);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
