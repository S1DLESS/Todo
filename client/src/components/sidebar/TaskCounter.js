import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getInboxProject } from '../../utils/project'
import { getPreviousTasks, getTodayAndPreviousTasks, getTodayTasks } from '../../utils/task'


const TaskCount = styled(Typography)`
    font-size: 14px;
    ${props => props.hasoverdue
        ? 'color: rgba(255, 0, 0, 0.5);'
        : 'color: rgba(0, 0, 0, 0.5);'
    }
    text-align: center;
`

export default function TaskCounter({route}) {

    let hasOverdue = ''

    const count = useSelector(state => {
        const pathArr = route.split('/')
        if (pathArr[1] === 'project') {
            if (pathArr[2] === 'inbox') {
                const filteredTasks = state.tasks.filter(el => !el.done && el.projectId === getInboxProject(state.projects).id)
                return filteredTasks.length || ''
            } else {
                const filteredTasks = state.tasks.filter(el => !el.done && el.projectId === +pathArr[2])
                return filteredTasks.length || ''
            }
        }
        if (pathArr[1] === 'today') {
            const overdueTasks = getPreviousTasks(state.tasks).filter(el => !el.done)
            if (overdueTasks.length) {
                hasOverdue = 'true'
                const filteredTasks = getTodayAndPreviousTasks(state.tasks).filter(el => !el.done)
                return filteredTasks.length || ''
            } else {
                const filteredTasks = getTodayTasks(state.tasks).filter(el => !el.done)
                return filteredTasks.length || ''
            }
        }
    })

    return (
        <TaskCount hasoverdue={hasOverdue}>{count}</TaskCount>
    )
}