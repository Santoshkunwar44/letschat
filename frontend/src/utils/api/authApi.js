import axiosInstance from "../axios";

export const registerApi = (data) => axiosInstance.post("/user/register", data)
export const loginApi = (data) => axiosInstance.post("/user/login", data)
export const getLoggedInUserApi = () => axiosInstance.get("/user/loggedInUser")
export const logoutApi = () => axiosInstance.get("/user/logout")