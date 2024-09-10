import axios from "axios";

const baseUrl = '/home/FotisTouman/fantasiaapi/fantasybooks/';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
    
})

// Knox way of adding authorization to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        else {
            config.headers.Authorization = ``
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    } 
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
    if(error.response && error.response.status === 401)
        localStorage.removeItem('token')
    
    }
    console.error("Error response:", error.response);
        return Promise.reject(error);
)

export default axiosInstance;
