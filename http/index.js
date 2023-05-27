import axios from 'axios';

export const API_URL = `https://demo-backend-s05i.onrender.com`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})
export default $api;
