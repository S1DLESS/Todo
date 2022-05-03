import React, { useState } from 'react'
import { DatePicker, LoadingButton, LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import { TextField, Typography } from '@mui/material';
import styled from 'styled-components'
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { updateData } from '../../redux/actions';
import { editTask } from '../../http/taskAPI'


const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding: 0 5px;
`

export default function DateTimePicker({task, onSave}) {


    const [dateTime, setDateTime] = useState({
        date: task.date ? new Date(task.date) : null,
        time: task.hasTime ? new Date(task.date) : null
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const [disableSave, setDisableSave] = useState(false)

    const dispatch = useDispatch()

    const getTimestamp = (date, time) => {
        if (time) {
            const a = date.setHours(new Date(time).getHours())
            const b = new Date(a).setMinutes(new Date(time).getMinutes())
            return b
        } else {
            return Date.parse(date)
        }
    }

    const handleSubmit = () => {

        editTask({
            title: task.title,
            description: task.description,
            date: getTimestamp(dateTime.date, dateTime.time),
            hasTime: !!dateTime.time,
            projectId: task.project.id,
            priorityId: task.priority,
            labelIds: task.labels
        }, task.id).then(res => {
            if (!res.message) {
                dispatch(updateData(res))
                setLoading(false)
                onSave()
            } else {
                setLoading(false)
                setError({status: true, message: res.message})
            }
        })
    }

    return (
        <Wrapper>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <DatePicker
                    mask='__.__.____'
                    minDate={new Date()}
                    renderInput={props => <TextField {...props} />}
                    label="Дата"
                    value={dateTime.date}
                    onChange={newValue => setDateTime({...dateTime, date: newValue})}
                    onError={reason => setDisableSave(!!reason)}
                />
                <TimePicker
                    disabled={!dateTime.date || dateTime.date < new Date().setHours(0, 0, 0, 0)}
                    ampm={false}
                    renderInput={props => <TextField {...props} />}
                    label="Время"
                    value={dateTime.time}
                    onChange={newValue => setDateTime({...dateTime, time: newValue})}
                    onError={reason => setDisableSave(!!reason)}
                />
            </LocalizationProvider>
            <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}
                disabled={disableSave}
            >
                Изменить
            </LoadingButton>
            {error.status && <Typography color='error'>{error.message}</Typography>}
        </Wrapper>
    )
}