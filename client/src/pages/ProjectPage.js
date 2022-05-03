import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { getInboxProject, getProjectTitle } from '../utils/project'
import ViewTaskList from '../components/list/ViewTaskList'
import ButtonModal from '../components/ButtonModal'
import TaskList from '../components/list/TaskList';
import PageHeader from '../components/UI/PageHeader';


export default function ProjectPage() {
    
    const params = useParams()
    const isInbox = params.id === 'inbox'
    
    const [selectedSort, setSelectedSort] = useState({
        id: 0,
        order: 'asc'
    })

    const state = useSelector(state => state)
    const inboxProject = getInboxProject(state.projects)
    const isCustomProject = state.projects.some(el => el.id === +params.id)
    const projectTitle = isInbox ? "Входящие" : getProjectTitle(state.projects, +params.id)
    const projectId = isInbox ? inboxProject.id : +params.id
    const tasks = state.tasks.filter(el => el.projectId === projectId)
    const noTasksText = isInbox ? 'Похоже, всё организовано как надо' : 'Чем займётесь?'

    document.title = `${projectTitle}: Todo`

    const taskList = (completed = false) => <TaskList
        route={`project/${projectId}`}
        completed={completed}
        sort={selectedSort.id}
        sortOrder={selectedSort.order}
    />

    const nullComponent = <Typography variant='h5'>{noTasksText}</Typography>

    if (isCustomProject || isInbox) {
        return (
            <>
                <PageHeader
                    pageTitle={projectTitle}
                    componentsOnRight={<ViewTaskList sort={{selectedSort, setSelectedSort}} />}
                />
                <ButtonModal component='TaskAdd' />
                
                {tasks.length
                    ? state.userConfig.showCompletedTasks
                        ? tasks.some(el => !el.done)
                            ? <>
                                {taskList()}
                                {taskList(true)}
                            </>
                            : taskList(true)
                        : tasks.some(el => !el.done)
                            ? taskList()
                            : nullComponent
                    : nullComponent
                }
            </>
        )
    } else {
        return (
            <Typography variant='h4' component='h2'>Проект не найден</Typography>
        )
    }
}