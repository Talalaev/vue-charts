<template>
  <DxChart
    id="chart"
    :data-source="chartData"
    palette="Violet">
    <DxCommonSeriesSettings :type="'line'" :argument-field="argumentField"/>
    <DxSeries
      v-for="series in seriesSource"
      :key="series.value"
      :value-field="series.value"
      :name="series.name"/>
    <DxMargin :bottom="20"/>
    <DxArgumentAxis :value-margins-enabled="false" discrete-axis-division-mode="crossLabels">
      <DxGrid :visible="true"/>
    </DxArgumentAxis>
    <DxLegend vertical-alignment="bottom" horizontal-alignment="center" item-text-position="bottom"/>
    <DxExport :enabled="true"/>
    <DxTitle :text="title">
      <DxSubtitle :text="subTitle"/>
    </DxTitle>
    <DxTooltip :enabled="true"/>
  </DxChart>
</template>

<script>
  import {
    DxChart,
    DxArgumentAxis,
    DxGrid,
    DxExport,
    DxSeries,
  } from 'devextreme-vue/chart';
  import {
    DxCommonSeriesSettings,
    DxLegend,
    DxMargin,
    DxSubtitle,
    DxTitle,
    DxTooltip
  } from "devextreme-vue/pie-chart";

  export default {
    name: "LineChartComponent",
    components: {
      DxChart,
      DxArgumentAxis,
      DxGrid,
      DxMargin,
      DxLegend,
      DxTitle,
      DxCommonSeriesSettings,
      DxSubtitle,
      DxTooltip,
      DxExport,
      DxSeries,
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
      title: {
        type: String,
        default: '',
      },
      subTitle: {
        type: String,
        default: '',
      },
    }
  }
</script>

<style scoped>
  .options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
  }

  .option {
    margin-top: 10px;
  }

  .caption {
    font-size: 18px;
    font-weight: 500;
  }

  .option > span {
    margin-right: 14px;
  }

  .option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
  }
</style>