import { ArrowBack } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import TaskList from '../components/list/TaskList'
import PageHeader from '../components/UI/PageHeader'
import Section from '../components/UI/Section'
import ViewTaskList from '../components/list/ViewTaskList'


export default function FilterLabelItemPage({pageItem}) {

    const [selectedSort, setSelectedSort] = useState({
        id: 0,
        order: 'asc'
    })

    const params = useParams()
    const navigate = useNavigate()
    const isFilter = pageItem === 'filter'
    const state = useSelector(state => state)
    const {showCompletedTasks} = state.userConfig
    const item = isFilter
        ? state.filters.find(el => el.id === +params.id)
        : state.labels.find(el => el.title === params.id)

    document.title = `${item.title}: Todo`

    const pageTitle = item
        ? item.title
        : isFilter
            ? 'Фильтр не найден'
            : 'Метка не найдена'

    return (
        <Box>
            <PageHeader
                pageTitle={pageTitle}
                componentsOnLeft={
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                }
                componentsOnRight={<ViewTaskList sort={{selectedSort, setSelectedSort}} />}
            />

            {isFilter
                ? <Section title={item.query}>
                    <TaskList
                        route={`filter/${item.query}`}
                        sort={selectedSort.id}
                        sortOrder={selectedSort.order}
                    />
                    {showCompletedTasks &&
                        <TaskList
                            route={`filter/${item.query}`}
                            completed
                            sort={selectedSort.id}
                            sortOrder={selectedSort.order}
                        />
                    }
                </Section>
                : <>
                    <TaskList
                        route={`label/${item.id}`}
                        sort={selectedSort.id}
                        sortOrder={selectedSort.order}
                    />
                    {showCompletedTasks &&
                        <TaskList
                            route={`label/${item.id}`}
                            completed
                            sort={selectedSort.id}
                            sortOrder={selectedSort.order}
                        />
                    }
                </>
            }
        </Box>
    )
}