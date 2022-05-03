import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TaskList from '../components/list/TaskList'
import PageHeader from '../components/UI/PageHeader'


export default function SearchPage() {

    const [searchQuery, setSearchQuery] = useState('')
    const userConfig = useSelector(state => state.userConfig)

    return (
        <>
            <PageHeader pageTitle="Поиск" />

            <TextField
                type='search'
                label="Поиск"
                fullWidth
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <TaskList route={`search/${searchQuery}`} />
            {userConfig.showCompletedTasks && <TaskList route={`search/${searchQuery}`} completed />}
        </>
    )
}