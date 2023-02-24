import axios from "axios"
const axiosConfig = {
    baseURL: "http://localhost:8000/api",
    withCredentials: true
}

const axiosInstance = axios.create(axiosConfig)
export default axiosInstance