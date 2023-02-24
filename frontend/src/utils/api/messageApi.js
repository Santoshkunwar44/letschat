import axiosInstance from "../axios";

export const getMessagesByChatId = (chatid) => axiosInstance.get(`/message?chatId=${chatid}`)
export const addNewMessage = (message) => axiosInstance.post(`/message/create`, message)


export const addNewMessageForNewChat = (data) => axiosInstance.post(`/message/new_message`, data)