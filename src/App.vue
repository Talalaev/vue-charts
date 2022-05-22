<template>
  <div id="app">
    <div class="app-head">
      <CreateChartComponent @selected="onSelected"/>
    </div>

    <div class="app-body">
      <div v-for="chart of chartList.list" :key="chart.index">
        <span v-if="chart.loading">loading...</span>
        <ErrorLoading v-if="!chart.loading && !chart.data"/>

        <component
          v-if="!chart.loading && chart.data"
          v-bind:is="chartComponents[chart.type]"
          :chartData="chart.data"
          :series-source="chart.seriesSources"
          :argument-field="chart.argumentField"
          :value-field="chart.valueField"
          :title="chart.title"
          :sub-title="chart.subTitle"/>
      </div>
    </div>

  </div>
</template>

<script>
import CreateChartComponent from './components/CreateChart.vue';
import LineChartComponent from './components/LineChart.vue'
import PieChartComponent from './components/PieChart';
import ErrorLoading from "./components/ErrorLoading";
import { getChartData } from './chart-data.service.js';
import { chartTypes } from './chart-types.js';
import { ChartList } from './ChartList';


export default {
  name: 'App',
  components: {
    CreateChartComponent,
    LineChartComponent,
    PieChartComponent,
    ErrorLoading,
  },
  data() {
    return {
      chartList: new ChartList({
        [chartTypes.pie]: {
          seriesSources: null,
          argumentField: 'Группа',
          valueField: 'Доля',
          title: 'Процентов к месяцу',
          subTitle: '(без понятия процент чего)',
        },
        [chartTypes.line]: {
          seriesSources: [
            { value: 'Процент', name: 'Дата' },
          ],
          argumentField: 'Дата',
          valueField: null,
          title: 'Процентов к месяцу',
          subTitle: '(без понятия процент чего)',
        },
      }),
      chartComponents: {
        [chartTypes.line]: LineChartComponent,
        [chartTypes.pie]: PieChartComponent
      },
    };
  },
  methods: {
    async onSelected({type, source}) {
      this.chartList.add(type, getChartData(type, source));
    },
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app .app-head {
    position: sticky;
    top: 0;
    padding: 18px 12px;
    background: #fff;
    box-shadow: 1px 1px 4px #dadada;
  }

  #app .app-body {
    margin: 80px 0 0 0;
    padding: 0 20px;
  }

  #app .data-loading-error-img {
    height: 200px;
    width: auto;
    display: block;
    margin: auto;
  }
</style>
