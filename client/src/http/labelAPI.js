import { request } from "."


const labelRoute = 'labels'

export const createLabel = async (data) =>
    await request(`${labelRoute}`, 'POST', data)

export const editLabel = async (data, labelId) =>
    await request(`${labelRoute}/${labelId}`, 'PUT', data)

export const deleteLabel = async (labelId) =>
    await request(`${labelRoute}/${labelId}`, 'DELETE')