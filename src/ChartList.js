export class ChartList {
  list = [];
  chartSettings;

  constructor(chartSettings) {
    this.chartSettings = chartSettings;
  }

  add(type, data) {
    const isDataPromise = data instanceof Promise;

    const chartData = {
      type,
      index: this.list.length,
      loading: isDataPromise,
      data: isDataPromise ? null : data,
      seriesSources: this.chartSettings[type].seriesSources,
      argumentField: this.chartSettings[type].argumentField,
      valueField: this.chartSettings[type].valueField,
      title: this.chartSettings[type].title,
      subTitle: this.chartSettings[type].subTitle,
      resolveData() {
        if (!isDataPromise) {
          return;
        }

        data.then(d => this.data = d).finally(() => this.loading = false);
      }
    };

    chartData.resolveData();
    this.list.push(chartData);

    return chartData;
  }
}
