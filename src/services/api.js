import axios from 'axios';

const api = axios.create({
    baseURL: process.env.APP_REACT_URL_API,
});

export default api;