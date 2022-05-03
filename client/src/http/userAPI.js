import { request } from "."


const userRoute = 'user'

export const tokenCheck = async () =>
    await request(`${userRoute}/auth`)

export const getAllData = async () =>
    await request(`${userRoute}/data`)

export const registration = async (data) =>
    await request(`${userRoute}/registration`, 'POST', data)

export const login = async (data) =>
    await request(`${userRoute}/login`, 'POST', data)

export const reset = async (data) =>
    await request(`${userRoute}/reset`, 'POST', data)

export const editSettings = async (data) =>
    await request(`${userRoute}/edit/account`, 'PUT', data, 'FormData')

export const editAccountSettings = async (data) =>
    await request(`${userRoute}/edit/settings`, 'PUT', data)