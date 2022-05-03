import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonModal from '../components/ButtonModal'
import TaskList from '../components/list/TaskList'
import Section from '../components/UI/Section'
import ViewTaskList from '../components/list/ViewTaskList'
import { getNamedDay, getNamedMonth } from '../utils/time'
import Modal from '../components/UI/Modal'
import Settings from '../components/settings/Settings'
import { getPreviousTasks, getTodayAndPreviousTasks } from '../utils/task'
import PageHeader from '../components/UI/PageHeader'


export default function TodayPage() {

    const location = useLocation()
    const navigate = useNavigate()

    const [selectedSort, setSelectedSort] = useState({
        id: 0,
        order: 'asc'
    })
    const [modalOpen, setModalOpen] = useState(!location.state
        ? location.pathname.split('/')[1] === 'settings'
        : false)

    const state = useSelector(state => state)

    const tasks = getTodayAndPreviousTasks(state.tasks)
    const previousTasks = getPreviousTasks(state.tasks)

    const date = new Date()
    const day = date.getDate()
    const month = getNamedMonth(date.getMonth(), 'abbr')
    const dayOfTheWeek = getNamedDay(date.getDay(), 'abbr')
    
    const todayDate = `${dayOfTheWeek} ${day} ${month}`

    document.title = "Сегодня: Todo"

    const closeModal = () => {
        setModalOpen(false)
        navigate('/today')
    }

    const taskList = (route, completed = false) => <TaskList
        route={route}
        completed={completed}
        sort={selectedSort.id}
        sortOrder={selectedSort.order}
    />

    const nullComponent = <Typography variant='h5'>На сегодня задач нет</Typography>

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={closeModal}
                component={<Settings onCloseModal={closeModal} />}
            />
            <PageHeader
                pageTitle="Сегодня"
                secondaryTitle={todayDate}
                componentsOnRight={<ViewTaskList sort={{selectedSort, setSelectedSort}} />}
            />
            <ButtonModal component='TaskAdd' />
            
            {tasks.length
                ? state.userConfig.showCompletedTasks
                    ? tasks.some(el => !el.done)
                        ? previousTasks.some(el => !el.done)
                            ? <>
                                <Section title='Просрочено'>
                                    {taskList('overdue')}
                                </Section>
                                <Section title={`${day} ${month} - Сегодня`}>
                                    {taskList('today')}
                                </Section>
                                {taskList('today', true)}
                            </>
                            : <>
                                {taskList('today')}
                                {taskList('today', true)}
                            </>
                        : taskList('today', true)
                    : tasks.some(el => !el.done)
                        ? previousTasks.some(el => !el.done)
                            ? <>
                                <Section title='Просрочено'>
                                    {taskList('overdue')}
                                </Section>
                                <Section title={`${day} ${month} - Сегодня`}>
                                    {taskList('today')}
                                </Section>
                            </>
                            : taskList('today')
                        : nullComponent
                : nullComponent
            }
        </>
    )
}