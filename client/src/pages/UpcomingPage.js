import React from 'react'
import { useSelector } from 'react-redux'
import TaskList from '../components/list/TaskList'
import Section from '../components/UI/Section'
import { getNamedDay, getNamedMonth } from '../utils/time'
import { getPreviousTasks } from '../utils/task'
import PageHeader from '../components/UI/PageHeader'


export default function UpcomingPage() {

    const state = useSelector(state => state)
    const previousTasks = getPreviousTasks(state.tasks)

    document.title = 'Предстоящее: Todo'

    const createUpcomingSections = () => {
        const arr = []
        if (previousTasks.some(el => !el.done)) {
            arr.push({title: 'Просрочено', taskList: <TaskList route='overdue' />})
        }
        for (let i = 0; i < 30; i++) {
            const date = new Date(Date.parse(new Date()) + ((1000 * 60 * 60 * 24) * i))
            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()
            const dayOfTheWeek = getNamedDay(date.getDay(), 'full')
            const namedMonth = getNamedMonth(month, 'abbr')
            arr.push({
                title: `${day} ${namedMonth} - ${dayOfTheWeek}`,
                taskList: <>
                    <TaskList route={`today/${year}-${month}-${day}`} />
                    {state.userConfig.showCompletedTasks &&
                        <TaskList route={`today/${year}-${month}-${day}`} completed />
                    }
                </>
            })
        }
        return arr
    }

    const upcomingTasks = createUpcomingSections()

    return (
        <>
            <PageHeader pageTitle="Предстоящее" />

            {upcomingTasks.map((el, index) =>
                <Section key={index} title={el.title}>
                    {el.taskList}
                </Section>
            )}
        </>
    )
}