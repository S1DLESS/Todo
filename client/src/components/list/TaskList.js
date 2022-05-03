import { List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { filterTask } from '../../utils/filter'
import { checkOverdueTasks, checkTaskTime } from '../../utils/time'
import TaskItem from '../item/TaskItem'

export default function TaskList({route, completed = false, sort = 0, sortOrder = ''}) {

    const sortTasks = (tasks, sort, sortOrder) => {
        if (sort === 0) {
            return [...tasks]
        }
        if (sort === 1) {
            if (sortOrder === 'asc') {
                return [...tasks].sort((a, b) =>
                    a.title.toLowerCase() > b.title.toLowerCase()
                        ? 1
                        : a.title.toLowerCase() < b.title.toLowerCase()
                            ? -1
                            : 0
                )
            }
            if (sortOrder === 'desc') {
                return [...tasks].sort((a, b) =>
                    a.title.toLowerCase() < b.title.toLowerCase()
                        ? 1
                        : a.title.toLowerCase() > b.title.toLowerCase()
                            ? -1
                            : 0
                )
            }
        }
    }
    const taskList = useSelector(state => {
        if (route.match(/overdue/)) {
            const tasks = state.tasks
                .filter(el => el.date)
                .filter(el => !el.done)
                .filter(el => checkOverdueTasks(Date.parse(el.date)))

            return sortTasks(tasks, sort, sortOrder)
        }

        if (route.match(/today/)) {
            const match = route.match(/[^today/].*/)
            const date = match ? match[0] : ''
            
            const tasks = state.tasks
                .filter(el => el.date)
                .filter(el => checkTaskTime(Date.parse(el.date), date))
                .filter(el => !completed ? !el.done : el.done)
            
            if (sort === 0) {
                return sortTasks(tasks, sort, sortOrder).sort((a, b) => !completed
                    ? a.timeOrder - b.timeOrder
                    : Date.parse(b.completionDate) - Date.parse(a.completionDate))
            }
            return sortTasks(tasks, sort, sortOrder)
        }

        if (route.match(/project/)) {
            const projectId = route.match(/[^project/].*/)

            const tasks = state.tasks
                .filter(el => el.projectId === +projectId)
                .filter(el => !completed ? !el.done : el.done)

            if (sort === 0) {
                return sortTasks(tasks, sort, sortOrder).sort((a, b) => !completed
                    ? a.projectOrder - b.projectOrder
                    : Date.parse(b.completionDate) - Date.parse(a.completionDate))
            }
            return sortTasks(tasks, sort, sortOrder)
        }

        if (route.match(/filter/)) {
            const filterQuery = route.match(/[^filter/].*/)

            const tasks = state.tasks
                .filter(el => filterTask(el, filterQuery[0]))
                .filter(el => !completed ? !el.done : el.done)

            return sortTasks(tasks, sort, sortOrder)
        }

        if (route.match(/label/)) {
            const labelId = route.match(/[^label/].*/)[0]
            const tasks = state.taskLabels
                .filter(el => el.labelId === +labelId)
                .map(el => el.taskId)
                .filter(el => !completed ? !el.done : el.done)
                .map(taskId => state.tasks.find(el => el.id === taskId))

            return sortTasks(tasks, sort, sortOrder)
        }

        if (route.match(/search/)) {
            const searchQuery = route.split('/')[1]
            if (searchQuery) {
                if (!completed) {
                    return state.tasks.filter(el =>
                        el.title.toLowerCase().includes(searchQuery.toLowerCase())
                        && !el.done
                    )
                } else {
                    return state.tasks.filter(el =>
                        el.title.toLowerCase().includes(searchQuery.toLowerCase())
                        && el.done
                    )
                }
            } else {
                return []
            }
        }
    })
    
    const getItemSection = () => {
        if (route.match(/overdue/)) {
            return 'overdue'
        }
        if (route.match(/today/)) {
            return 'time'
        }
        if (route.match(/project/)) {
            return 'project'
        }
        if (route.match(/filter/)) {
            return 'filter'
        }
        if (route.match(/label/)) {
            return 'label'
        }
    }

    const isMovable = !!route.match(/overdue/)
        || !!route.match(/filter/)
        || !!route.match(/label/)
        || !!route.match(/search/)
        || sort
    
    return (
        <List>
            {taskList
                .map((task, index, arr) =>
                    <TaskItem
                        key={task.id}
                        task={task}
                        section={getItemSection()}
                        arrLength={arr.length}
                        isMovable={isMovable || task.done}
                    />)
            }
        </List>
    )
}