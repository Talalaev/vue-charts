import axios from "axios";
import { chartTypes } from './chart-types';

export const getChartData = (type, url) => {
  return chartProviders[type](url);
};

export const getPieChartData = (url) => {
  return axios
    .get(url)
    .then(({data}) => (data))
    .catch(() => null);
};

export const getLineChartData = (url) => {
  return axios
    .get(url)
    .then(({data}) => (data))
    .catch(() => null);
};

export const chartProviders = {
  [chartTypes.pie]: getPieChartData,
  [chartTypes.line]: getLineChartData,
};
