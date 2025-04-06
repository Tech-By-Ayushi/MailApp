import axios from "axios";

// Creating Axios instance with default setting

const instance = axios.create({
    baseURL: "http://127.0.0.1:5000/"
});

// Adding the token in authorization header
instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default instance;
