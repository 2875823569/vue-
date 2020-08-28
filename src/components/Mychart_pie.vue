<template>
  <div class="mypie-echart"></div>
</template>

<script>
// import ECharts from "vue-echarts";
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/";
// import "echarts/lib/component/polar";

export default {
  data() {
    return {};
  },
  mounted() {
    console.log();
    this.drawLine(document.querySelector(".mypie-echart"));
  },
  methods: {
    drawLine() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.querySelector(".mypie-echart"));
      myChart.setOption({
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.mypie-echart {
  width: 100%;
  height: 100%;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
