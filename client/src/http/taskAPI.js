import { request } from "."


const taskRoute = 'tasks'

export const createTask = async (data) =>
    await request(`${taskRoute}`, 'POST', data)

export const editTask = async (data, taskId) =>
    await request(`${taskRoute}/${taskId}`, 'PUT', data)

export const moveTask = async (order, section, taskId) =>
    await request(`${taskRoute}/${taskId}?moveto=${order}&section=${section}`, 'PUT')

export const setDoneTask = async (isDone, taskId) =>
    await request(`${taskRoute}/${taskId}?setdone=${isDone}`, 'PUT')
    
export const deleteTask = async (taskId) =>
    await request(`${taskRoute}/${taskId}`, 'DELETE')