import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem('localStorage') || '{}').token || undefined;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete config.headers['Authorization'];
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errorMessage = error.response?.data?.message;
    return Promise.reject(new Error(errorMessage));
});

export default api;