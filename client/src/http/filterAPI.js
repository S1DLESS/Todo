import { request } from "."


const filterRoute = 'filters'

export const createFilter = async (data) =>
    await request(`${filterRoute}`, 'POST', data)

export const editFilter = async (data, filterId) =>
    await request(`${filterRoute}/${filterId}`, 'PUT', data)

export const deleteFilter = async (filterId) =>
    await request(`${filterRoute}/${filterId}`, 'DELETE')