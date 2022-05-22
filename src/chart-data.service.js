import axios from "axios";
import { chartTypes } from './chart-types';

export const memoryStore = new Map();

export const getChartData = (type, url) => {
  return chartProviders[type](url);
};

export const getPieChartData = (url) => {
  const dataInCache = memoryStore.get(url);

  if (dataInCache) {
    return Promise.resolve(dataInCache);
  }

  return axios
    .get(url)
    .then(({data}) => remember(url, data))
    .catch(() => null);
};

export const getLineChartData = (url) => {
  const dataInCache = memoryStore.get(url);

  if (dataInCache) {
    return Promise.resolve(dataInCache);
  }

  return axios
    .get(url)
    .then(({data}) => remember(url, data))
    .catch(() => null);
};

function remember(url, data) {
  memoryStore.set(url, data);

  return data;
}

export const chartProviders = {
  [chartTypes.pie]: getPieChartData,
  [chartTypes.line]: getLineChartData,
};
