import { getStartEndDay } from "./time"

export const getPreviousTasks = (tasks) => {
    const today = getStartEndDay()
    return tasks.filter(el => Date.parse(el.date) < today.start)
}

export const getTodayAndPreviousTasks = (tasks) => {
    const today = getStartEndDay()
    return tasks.filter(el => Date.parse(el.date) <= today.end)
}

export const getTodayTasks = (tasks) => {
    const today = getStartEndDay()
    return tasks.filter(el => Date.parse(el.date) >= today.start && Date.parse(el.date) <= today.end)
}