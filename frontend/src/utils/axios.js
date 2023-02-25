import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://lets-chat-zyje.onrender.com/api",
    withCredentials: true
})
export default axiosInstance