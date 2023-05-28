import axios from 'axios';

export const API_URL = `http://46.243.227.254:8080`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})
export default $api;
