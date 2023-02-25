import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://lets-chat-rt5f.onrender.com/api",
    withCredentials: true
})
export default axiosInstance