import axios from "axios";

// export const API_URL = `http://localhost:5000`
// export const API_URL = 'http://47.243.251.74:5000'

export const API_URL = 'http://localhost:3000'


const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL
})


// Добавляем interceptor для перехвата ошибки 401
$api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // Перенаправляем на страницу логина
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default $api;