<template>
  <DxPieChart
    id="pie"
    :data-source="chartData"
    palette="Bright"
    :title="title"
    @point-click="pointClickHandler($event)"
    @legend-click="legendClickHandler($event)">
    <DxSeries
      :argument-field="argumentField"
      :value-field="valueField">
      <DxLabel :visible="true">
        <DxConnector :visible="true" :width="1"/>
      </DxLabel>
    </DxSeries>
    <DxSize :width="500"/>
    <DxExport :enabled="true"/>
  </DxPieChart>
</template>

<script>
  import DxPieChart, {
    DxSize,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport,
  } from 'devextreme-vue/pie-chart';

  export default {
    name: "PieChartComponent",
    components: {
      DxSize,
      DxSeries,
      DxLabel,
      DxPieChart,
      DxConnector,
      DxExport,
    },
    props: {
      chartData: {
        type: Array,
        default() {
          return [];
        },
      },
      seriesSource: {
        type: Array,
        default() {
          return [];
        },
      },
      argumentField: {
        type: String,
        default: 'argument',
      },
      valueField: {
        type: String,
        default: 'value',
      },
      title: {
        type: String,
        default: '',
      },
    },
    methods: {
      pointClickHandler(e) {
        this.toggleVisibility(e.target);
      },
      legendClickHandler(e) {
        const arg = e.target;
        const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

        this.toggleVisibility(item);
      },
      toggleVisibility(item) {
        item.isVisible() ? item.hide() : item.show();
      },
    }
  }
</script>

<style scoped>
  #pie {
    height: 440px;
    display: flex;
    justify-content: center;
  }
</style>