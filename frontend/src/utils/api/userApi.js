import axiosInstance from "../axios";

export const searchUserApi = (searchQuery) => axiosInstance.get(`/user/search?search_query=${searchQuery}`)
export const getUserById = (userId) => axiosInstance.get(`/user/${userId}`)
export const searchUserByIdApi = (userId) => axiosInstance.get(`/user/search?userId=${userId}`)
export const updateUserApi = (data, userId) => axiosInstance.put(`/user/${userId}`, data)