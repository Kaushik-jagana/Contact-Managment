// src/services/api.ts

import axios from 'axios';

const BASE_URL = 'https://disease.sh/v3/covid-19';

// Fetch worldwide COVID-19 data
export const fetchWorldWideData = async () => {
  const res = await axios.get(`${BASE_URL}/all`);
  return res.data;
};

// Fetch country-specific COVID-19 data
export const fetchCountryCases = async () => {
  const res = await axios.get(`${BASE_URL}/countries`);
  return res.data;
};

// Fetch historical COVID-19 data for the graph
export const fetchGraphData = async () => {
  const res = await axios.get(`${BASE_URL}/historical/all?lastdays=all`);
  return res.data;
};
