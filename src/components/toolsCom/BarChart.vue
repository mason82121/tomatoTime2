<script>
import { Bar, mixins } from 'vue-chartjs';
import Chart from 'chart.js';
const { reactiveProp } = mixins;

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 16;

export default {
  mixins: [reactiveProp],
  extends: Bar,
  props: { // 待會會從父組件傳入圖表資料
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      options: { // option 類似圖表的 config 檔，可以在此客製圖表樣式及其他細節
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: 'white',
              display: false
            },
            ticks: {
              beginAtZero: true,
              stepSize: 4 // 設定 y 軸的數字級距
            }
          }],
          xAxes: [{
            barPercentage: 0.6,
            gridLines: {
              color: 'white',
              display: false
            }
          }]
        }
      }
    };
  },
  mounted() {
    this.renderLineChart(); // 首次渲染圖表的 function 寫在 mounted，此處把 renderChart 拉成獨立的 function 因為會重複使用
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.chartData, this.options); // 官方文件 api 提供的 renderChart() 方法，一定需要這兩個參數
    }
  }
};
</script>
