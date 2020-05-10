<template>
  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs"

export default {
  name: "HistoryChart",
  extends: Pie,
  props: {
    chartData: Object,
  },
  mounted() {
    this.renderChart(this.chartData)
  }
}
</script>
