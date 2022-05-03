import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createLabel, editLabel } from '../../http/labelAPI'
import { updateData } from '../../redux/actions'


const Form = styled.form`
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    min-width: 500px;
`

export default function LabelEdit({type, data, onCloseModal}) {

    const labels = useSelector(state => state.labels)
    const dispatch = useDispatch()
    const [label, setLabel] = useState({
        id: data ? data.id : 0,
        title: data ? data.title : ''
    })
    const [isAvailable, setIsAvailable] = useState(true)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const handleSubmit = e => {
        e.preventDefault()
        setError({status: false, message: ''})
        switch (type) {
            case "add":
                setLoading(true)
                createLabel({
                    title: label.title.replace(/\s*/, '').replace(/\s*$/, '').replace(/\s+/g, '_')
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
                editLabel({
                    title: label.title.replace(/\s*/, '').replace(/\s*$/, '').replace(/\s+/g, '_')
                }, label.id).then(res => {
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
        <Form onSubmit={handleSubmit}>
            <TextField
                label='Название метки'
                value={label.title}
                onChange={e => {
                    setLabel({...label, title: e.target.value})
                    setIsAvailable(!labels.find(el => el.title === e.target.value.replace(/\s*/, '').replace(/\s*$/, '').replace(/\s+/g, '_')))
                }}
                error={!isAvailable}
                helperText={!isAvailable ? 'Метка уже существует' : false}
            />
            <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}
                disabled={!label.title.match(/\S/) || !isAvailable}
            >
                {type === 'add' ? 'Добавить' : 'Сохранить'}
            </LoadingButton>
            {error.status && <Typography color='error'>{error.message}</Typography>}
        </Form>
    )
}