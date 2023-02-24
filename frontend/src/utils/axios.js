import axios from "axios"
const axiosConfig = {
    baseURL: "https://lets-chat-u9hz.onrender.com/api",
    withCredentials: true
}

const axiosInstance = axios.create(axiosConfig)
export default axiosInstance