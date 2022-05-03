const {Task, TaskLabel, Label, Project} = require('../models/models')


const getTasks = async (userId) => {
    const projects = await Project.findAll({where: {userId}})
    return await Task.findAll({where: {projectId: projects.map(el => el.id)}})
}

const getTaskLabels = async (userId) => {
    const labels = await Label.findAll({where: {userId}})
    return await TaskLabel.findAll({where: {labelId: labels.map(el => el.id)}})
}

const getBigOrderInTime = (taskList, date) => {
    const dayStart = new Date(date).setHours(0, 0, 0, 0)
    const dayEnd = new Date(date).setHours(23, 59, 59, 999)

    const arr = taskList.filter(el =>
        Date.parse(el.date) >= dayStart
        && Date.parse(el.date) <= dayEnd
    )

    if (!arr.length) {
        return 1
    }

    const bigOrder = arr.sort((a, b) => a.timeOrder - b.timeOrder)[arr.length - 1].timeOrder
    return bigOrder + 1
}

const getBigOrderInProject = (taskList, taskProjectId) => {
    const arr = taskList.filter(el => el.projectId === taskProjectId)
    if (!arr.length) {
        return 1
    }

    const bigOrder = arr.sort((a, b) => a.projectOrder - b.projectOrder)[arr.length - 1].projectOrder
    return bigOrder + 1
}

const getTimeOrder = (prevTimeOrder, prevDate, newDate, tasks) => {
    if (prevDate) {
        if (newDate) {
            if (isAnotherDay(prevDate, newDate)) {
                return getBigOrderInTime(tasks, newDate)
            } else {
                return prevTimeOrder
            }
        } else {
            return 0
        }
    } else {
        if (newDate) {
            return getBigOrderInTime(tasks, newDate)
        } else {
            return 0
        }
    }
}

const getProjectOrder = (prevProjectOrder, prevProjectId, newProjectId, tasks) => {
    if (prevProjectId === newProjectId) {
        return prevProjectOrder
    } else {
        return getBigOrderInProject(tasks, newProjectId)
    }
}

const isAnotherDay = (prevDate, newDate) => {
    const prevDay = new Date(prevDate).setHours(0, 0, 0, 0)
    const newDay = new Date(newDate).setHours(0, 0, 0, 0)

    return prevDay !== newDay
}

const compareLabels = (db, query) => {
    const outputArr = []

    query.forEach(queryEl => {
        const e = db.find(dbEl => dbEl === queryEl)
        if (!e) {
            outputArr.push({
                type: 'add',
                value: queryEl
            })
        }
    })

    db.forEach(dbEl => {
        const e = query.find(queryEl => queryEl === dbEl)
        if (!e) {
            outputArr.push({
                type: 'delete',
                value: dbEl
            })
        }
    })
    
    return outputArr
}

module.exports = {
    getTasks,
    getTaskLabels,
    getBigOrderInTime,
    getBigOrderInProject,
    getTimeOrder,
    getProjectOrder,
    isAnotherDay,
    compareLabels
}