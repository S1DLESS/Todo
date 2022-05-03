const { Op } = require("sequelize");
const {Task, Project, TaskLabel, Label} = require('../models/models')
const ApiError = require('../error/ApiError')
const {getTasks, getTaskLabels, getBigOrderInTime, getBigOrderInProject, getTimeOrder, getProjectOrder, isAnotherDay, compareLabels} = require('../utils/task');
const sequelize = require('../db');



class TaskController {

    async create(req, res, next) {
        try {
            const {title, description, date, hasTime, projectId, priorityId, labelIds} = req.body
            const tasks = await getTasks(req.user.id)
            const taskLabels = await getTaskLabels(req.user.id)

            const timeOrder = date ? getBigOrderInTime(tasks, date) : 0
            const projectOrder = getBigOrderInProject(tasks, projectId)

            const task = await Task.create({
                title,
                description,
                date,
                hasTime,
                timeOrder,
                projectOrder,
                projectId,
                priorityId
            })

            if (labelIds.length) {
                for (const id of labelIds) {
                    await TaskLabel.create({taskId: task.id, labelId: id})
                } 
            }

            const newTasks = await getTasks(req.user.id)
            const newTaskLabels = await getTaskLabels(req.user.id)

            return res.json({tasks: newTasks, taskLabels: newTaskLabels})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        const {id} = req.params

        if (req.query && req.query.moveto) {
            //move
            try {
                const order = req.query.moveto
                const task = await Task.findOne({where: {id}})

                if (req.query.section === 'time') {
                    const isBiggerOrder = order > task.timeOrder

                    const startDayTimestamp = new Date(task.date).setHours(0, 0, 0, 0)
                    const startDayJson = new Date(startDayTimestamp).toJSON()
                    const endDayTimestamp = new Date(task.date).setHours(23, 59, 59, 999)
                    const endDayJson = new Date(endDayTimestamp).toJSON()
                    
                    if (isBiggerOrder) {
                        await sequelize.query(`update tasks 
                        set "timeOrder" = "timeOrder"-1 
                        where date between '${startDayJson}' and '${endDayJson}' 
                        and "timeOrder" between ${task.timeOrder + 1} and ${order} 
                        and "projectId" = ${task.projectId}`)
                    } else {
                        await sequelize.query(`update tasks 
                        set "timeOrder" = "timeOrder"+1 
                        where date between '${startDayJson}' and '${endDayJson}' 
                        and "timeOrder" between ${order} and ${task.timeOrder - 1} 
                        and "projectId" = ${task.projectId}`)
                    }

                    task.set({
                        timeOrder: order
                    })
                    await task.save()
                }
                
                if (req.query.section === 'project') {
                    const isBiggerOrder = order > task.projectOrder

                    if (isBiggerOrder) {
                        await sequelize.query(`update tasks 
                        set "projectOrder" = "projectOrder"-1 
                        where "projectOrder" between ${task.projectOrder + 1} and ${order} 
                        and "projectId" = ${task.projectId}`)
                    } else {
                        await sequelize.query(`update tasks 
                        set "projectOrder" = "projectOrder"+1 
                        where "projectOrder" between ${order} and ${task.projectOrder - 1} 
                        and "projectId" = ${task.projectId}`)
                    }

                    task.set({
                        projectOrder: order
                    })
                    await task.save()
                }

                const newTasks = await getTasks(req.user.id)
                return res.json({tasks: newTasks})
            } catch (e) {
                next(ApiError.badRequest(`Move-task-error: ${e.message}`))
            }

        } else if (req.query && req.query.setdone) {
            //setDone
            try {
                const task = await Task.findOne({where: {id}})

                if (req.query.setdone === 'true') {
                    await sequelize.query(`update tasks 
                    set "projectOrder" = "projectOrder"-1 
                    where "projectOrder" > ${task.projectOrder} 
                    and "projectId" = ${task.projectId}`)

                    if (task.date) {
                        const startDayTimestamp = new Date(task.date).setHours(0, 0, 0, 0)
                        const startDayJson = new Date(startDayTimestamp).toJSON()
                        const endDayTimestamp = new Date(task.date).setHours(23, 59, 59, 999)
                        const endDayJson = new Date(endDayTimestamp).toJSON()

                        await sequelize.query(`update tasks 
                        set "timeOrder" = "timeOrder"-1 
                        where date between '${startDayJson}' and '${endDayJson}' 
                        and "timeOrder" > ${task.timeOrder} 
                        and "projectId" = ${task.projectId}`)
                    }

                    task.set({
                        done: true,
                        projectOrder: null,
                        timeOrder: null,
                        completionDate: new Date().toJSON()
                    })
                } else if (req.query.setdone === 'false') {
                    const tasks = await getTasks(req.user.id)
                    const timeOrder = task.date ? getBigOrderInTime(tasks, task.date) : 0
                    const projectOrder = getBigOrderInProject(tasks, task.projectId)

                    task.set({
                        done: false,
                        projectOrder,
                        timeOrder,
                        completionDate: null
                    }) 
                }
                
                await task.save()
                const newTasks = await getTasks(req.user.id)

                return res.json({tasks: newTasks})
            } catch (e) {
                next(ApiError.badRequest(`SetDone-task-error: ${e.message}`))
            }

        } else {
            //edit
            try {
                const {title, description, date, hasTime, projectId, priorityId, labelIds} = req.body
                const task = await Task.findOne({where: {id}})
                const tasks = await getTasks(req.user.id)

                if ((task.date && !date) || (task.date && isAnotherDay(task.date, date))) {
                    const startDayTimestamp = new Date(task.date).setHours(0, 0, 0, 0)
                    const startDayJson = new Date(startDayTimestamp).toJSON()
                    const endDayTimestamp = new Date(task.date).setHours(23, 59, 59, 999)
                    const endDayJson = new Date(endDayTimestamp).toJSON()

                    await sequelize.query(`update tasks 
                    set "timeOrder" = "timeOrder"-1 
                    where date between '${startDayJson}' and '${endDayJson}' 
                    and "timeOrder" > ${task.timeOrder} 
                    and "projectId" = ${task.projectId}`)
                }

                if (task.projectId !== projectId) {
                    await sequelize.query(`update tasks 
                    set "projectOrder" = "projectOrder"-1 
                    where "projectOrder" > ${task.projectOrder} 
                    and "projectId" = ${task.projectId}`)
                }

                task.set({
                    title,
                    description,
                    date,
                    hasTime,
                    timeOrder: getTimeOrder(task.timeOrder, task.date, date, tasks),
                    projectOrder: getProjectOrder(task.projectOrder, task.projectId, projectId, tasks),
                    projectId,
                    priorityId
                })
                await task.save()

                const TaskLabels = await TaskLabel.findAll({where: {taskId: id}})
                const arr = TaskLabels.map(el => el.labelId)
                const compare = compareLabels(arr, labelIds)
                if (compare.length) {
                    for (const el of compare) {
                        if (el.type === 'add') {
                            await TaskLabel.create({taskId: id, labelId: el.value})
                        }
                        if (el.type === 'delete') {
                            await TaskLabel.destroy({where: {taskId: id, labelId: el.value}})
                        }
                    }
                }

                const newTasks = await getTasks(req.user.id)
                const newTaskLabels = await getTaskLabels(req.user.id)

                return res.json({tasks: newTasks, taskLabels: newTaskLabels})    
            } catch (e) {
                next(ApiError.badRequest(`Edit-task-error: ${e.message}`))
            }
        }
    }

    async test(req, res, next) {
        const {id} = req.params
        const TaskLabels = await TaskLabel.findAll({where: {taskId: id}})
        const arr = TaskLabels.map(el => el.labelId)

        return res.json(arr)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const task = await Task.findOne({where: {id}})
            if (!task) {
                return next(ApiError.badRequest('Задача не найдена'))
            }

            if (task.date) {
                const startDayTimestamp = new Date(task.date).setHours(0, 0, 0, 0)
                const startDayJson = new Date(startDayTimestamp).toJSON()
                const endDayTimestamp = new Date(task.date).setHours(23, 59, 59, 999)
                const endDayJson = new Date(endDayTimestamp).toJSON()

                await sequelize.query(`update tasks 
                set "timeOrder" = "timeOrder"-1 
                where date between '${startDayJson}' and '${endDayJson}' 
                and "timeOrder" > ${task.timeOrder} 
                and "projectId" = ${task.projectId}`)
            }

            await sequelize.query(`update tasks 
            set "projectOrder" = "projectOrder"-1 
            where "projectOrder" > ${task.projectOrder} 
            and "projectId" = ${task.projectId}`)

            await task.destroy()
            await TaskLabel.destroy({where: {taskId: id}})

            const tasks = await getTasks(req.user.id)
            const taskLabels = await getTaskLabels(req.user.id)

            return res.json({tasks, taskLabels})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TaskController()