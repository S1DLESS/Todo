import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateData } from '../../redux/actions'
import styled from 'styled-components'
import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker, LoadingButton, LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import { getLabelsIds } from '../../utils/label'
import { createTask, editTask } from '../../http/taskAPI'
import { getInboxProject } from '../../utils/project'


const Form = styled(Box)`
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    min-width: 500px;
`

const ChipWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`

const DateTimeWrapper = styled(Box)`
    display: flex;
    column-gap: 5px;
`

export default function TaskEdit({type, data, onCloseModal}) {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [task, setTask] = useState({
        id: data ? data.id : 0,
        title: data ? data.title : '',
        description: data ? data.description : '',
        date: data ? data.date ? new Date(data.date) : null : null,
        time: data ? data.hasTime ? new Date(data.date) : null : null,
        projectId: data ? data.projectId : getInboxProject(state.projects).id,
        priority: data ? data.priorityId : 4,
        labels: data ? getLabelsIds(data.id, state.taskLabels) : []
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const getTimestamp = (date, time) => {
        if (time) {
            const a = date.setHours(new Date(time).getHours())
            const b = new Date(a).setMinutes(new Date(time).getMinutes())
            return b
        } else {
            return Date.parse(date)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        setError({status: false, message: ''})
        switch (type) {
            case "add":
                setLoading(true)
                createTask({
                    title: task.title.replace(/\s*/, '').replace(/\s*$/, ''),
                    description: task.description.replace(/\s*/, '').replace(/\s*$/, ''),
                    date: new Date(getTimestamp(task.date, task.time)).toJSON(),
                    hasTime: !!task.time,
                    projectId: task.projectId,
                    priorityId: task.priority,
                    labelIds: task.labels
                }).then(res => {
                    if (!res.message) {
                        dispatch(updateData(res))
                        setLoading(false)
                        onCloseModal()
                    } else {
                        setLoading(false)
                        setError({status: true, message: res.message})
                    }
                })
                break;
            case "edit":
                setLoading(true)
                editTask({
                    title: task.title.replace(/\s*/, '').replace(/\s*$/, ''),
                    description: task.description.replace(/\s*/, '').replace(/\s*$/, ''),
                    date: new Date(getTimestamp(task.date, task.time)).toJSON(),
                    hasTime: !!task.time,
                    projectId: task.projectId,
                    priorityId: task.priority,
                    labelIds: task.labels
                }, task.id).then(res => {
                    if (!res.message) {
                        dispatch(updateData(res))
                        setLoading(false)
                        onCloseModal()
                    } else {
                        setLoading(false)
                        setError({status: true, message: res.message})
                    }
                })
                break;
            default:
                break;
        }
    }

    return (
        <Form component='form' onSubmit={handleSubmit}>
            <TextField
                label='Название задачи'
                value={task.title}
                onChange={e => setTask({...task, title: e.target.value})}
            />
            <TextField
                label='Описание'
                multiline
                maxRows={4}
                value={task.description}
                onChange={e => setTask({...task, description: e.target.value})}
            />
            <DateTimeWrapper>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <DatePicker
                        mask='__.__.____'
                        minDate={new Date()}
                        renderInput={props => <TextField {...props} />}
                        label="Дата"
                        value={task.date ? task.date : null}
                        onChange={newValue => setTask({...task, date: newValue})}
                    />
                    <TimePicker
                        disabled={!task.date || task.date < new Date().setHours(0, 0, 0, 0)}
                        ampm={false}
                        renderInput={props => <TextField {...props} />}
                        label="Время"
                        value={task.time ? task.time : null}
                        onChange={newValue => setTask({...task, time: newValue})}
                    />
                </LocalizationProvider>
            </DateTimeWrapper>
            <FormControl>
                <InputLabel id="project-input-label">Проект</InputLabel>
                <Select
                    value={task.projectId}
                    onChange={e => setTask({...task, projectId: e.target.value})}
                    input={<OutlinedInput label="Проект" />}
                    labelId="project-input-label"
                >
                    {state.projects.map(el =>
                        <MenuItem key={el.id} value={el.id}>{el.title}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="priority-input-label">Приоритет</InputLabel>
                <Select
                    value={task.priority}
                    onChange={e => setTask({...task, priority: e.target.value})}
                    input={<OutlinedInput label="Приоритет" />}
                    labelId="priority-input-label"
                >
                    {state.priorities.map(el =>
                        <MenuItem key={el.id} value={el.id}>{el.title}</MenuItem>  
                    )}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="labels-input-label">Метки</InputLabel>
                <Select
                    multiple
                    value={task.labels}
                    onChange={e =>
                        typeof e.target.value === 'string'
                            ? setTask({...task, labels: e.target.value.split(',')})
                            : setTask({...task, labels: e.target.value})}
                    input={<OutlinedInput label="Метки" />}
                    labelId="labels-input-label"
                    renderValue={(selected) =>
                        <ChipWrapper>
                            {selected.map((value) => (
                                <Chip key={value} label={state.labels.find(el => el.id === value).title} />
                            ))}
                        </ChipWrapper>
                    }
                >
                    {state.labels.map(el =>
                        <MenuItem key={el.id} value={el.id}>
                            <Checkbox checked={task.labels.indexOf(el.id) > -1} />
                            <ListItemText primary={el.title} />
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}
                disabled={!task.title.match(/\S/)}>
                {type === 'add' ? 'Добавить' : 'Сохранить'}
            </LoadingButton>
            {error.status && <Typography color='error'>{error.message}</Typography>}
        </Form>
    )
}