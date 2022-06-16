<template>
  <div class="Echarts">
    <div id="main" style="width: 600px; height: 400px; margin:20px"></div>
  </div>
</template>

<script>
export default {
  name: "Charts",
  methods: {
    modelCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 散点图：https://blog.csdn.net/weiweitb8/article/details/78190236
      // 指定图表的配置项和数据
      var option = {
        title: {
          // 标题设置
          text: "模型评价指标", 
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["Models", "node2vec+attnmove", "vgae+ctle+transformaer"],
            ["Blank Acc", 0.34, 0.56],
            ["Recall3", 0.51, 0.63],
            ["Recall5", 0.55, 0.66],
          ],
        },
        xAxis: { type: "category" },
        yAxis: { min: 0, max: 1 },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.modelCharts();
  },
};
</script>

<style>
</style>
