import axios from 'axios';
import {
  transformCountriesData,
  transformCountryData,
} from '../helpers/transformCountries';

axios.defaults.baseURL = 'https://restcountries.com/v3.1';

export const getCountries = async signal => {
  const { data } = await axios.get('/region/europe', { signal });
  const countries = transformCountriesData(data);

  return countries;
};

export const fetchCountry = async (id, signal) => {
  const { data } = await axios.get(`/name/${id}`, { signal });
  const country = transformCountryData(data);

  return country[0];
};

export const fetchByRegion = async (region, signal) => {
  const { data } = await axios.get(`/region/${region}`, { signal });
  const countries = transformCountriesData(data);

  return countries;
};
