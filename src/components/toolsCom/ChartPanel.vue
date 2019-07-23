<template>
<div class="chart_panel">
  <div class="title-bar">
    <div class="title">CHART</div>
    <div class="time-interval">
      <i class="material-icons">keyboard_arrow_left</i>
      <div class="interval">2019.7.1 - 2019.7.7</div>
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </div>
  <div class="chart-block">
    <bar-chart :height="250" :chartData="chartData"></bar-chart>
  </div>
</div>
</template>

<script>
import BarChart from '@/components/toolsCom/BarChart.vue';
export default {
  data() {
    return {
      chartData: {
        labels: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'], // 位於 x 軸的各筆數據 key
        datasets: [
          {
            label: 'Tomatos', // x 軸的標籤項目
            data: ['16', '12', '16', '8', '12', '4', '20', '24'], // 位於 y 軸對應的各筆數據 value
            backgroundColor: [
              'white', 'white', 'white', 'white', 'white', 'white', '#FF4384'
            ]
          }
        ]
      }
    };
  },
  components: {
    BarChart
  }
};
</script>

<style lang="scss" scoped>
.chart_panel {
  width: 100%;
  .title-bar {
    width: 100%;
    background-color: $title-bar-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    .title {
      width: 50%;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .time-interval {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      .interval {
        display: flex;
        color: white;
        font-size: 1rem;
        font-weight: bold;
      }
      i {
        margin: 0 0.5rem;
        text-align: center;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        transition: .3s;
        &:hover {
          color: $text-color;
        }
      }
    }
  }
  .chart-block {
    height: 250px;
  }
}
</style>
