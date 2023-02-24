import axiosInstance from "../axios";

export const chatOfUserApi = (userId) => axiosInstance.get(`/chat/${userId}`)
export const getChatById = (chatId) => axiosInstance.get(`/chat/byChatId/${chatId}`)
export const getChatByBothUsers = (senderId, receiverId) => axiosInstance.get(`/chat/byUsersId/${senderId}/${receiverId}`)
export const deleteChat = (chatId) => axiosInstance.delete(`/chat/${chatId}`)