import { request } from "."


const projectRoute = 'projects'

export const createProject = async (data) =>
    await request(`${projectRoute}`, 'POST', data)

export const editProject = async (data, projectId) =>
    await request(`${projectRoute}/${projectId}`, 'PUT', data)

export const deleteProject = async (projectId) =>
    await request(`${projectRoute}/${projectId}`, 'DELETE')