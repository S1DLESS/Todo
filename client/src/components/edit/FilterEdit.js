import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { createFilter, editFilter } from '../../http/filterAPI'
import { updateData } from '../../redux/actions'


const Form = styled.form`
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    min-width: 500px;
`

export default function FilterEdit({type, data, onCloseModal}) {

    const dispatch = useDispatch()
    const [filter, setFilter] = useState({
        id: data ? data.id : 0,
        title: data ? data.title : '',
        query: data ? data.query : ''
    })

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
                createFilter({
                    title: filter.title.replace(/\s*/, '').replace(/\s*$/, ''),
                    query: filter.query.replace(/\s*/, '').replace(/\s*$/, '')
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
                editFilter({
                    title: filter.title.replace(/\s*/, '').replace(/\s*$/, ''),
                    query: filter.query.replace(/\s*/, '').replace(/\s*$/, '')
                }, filter.id).then(res => {
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
                label='Название фильтра'
                value={filter.title}
                onChange={e => {
                    setFilter({...filter, title: e.target.value})
                }}
            />
            <TextField
                label='Фильтрующий запрос'
                value={filter.query}
                onChange={e => {
                    setFilter({...filter, query: e.target.value})
                }}
            />
            <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}
                disabled={!filter.title.match(/\S/)}
            >
                {type === 'add' ? 'Добавить' : 'Сохранить'}
            </LoadingButton>
            {error.status && <Typography color='error'>{error.message}</Typography>}
        </Form>
    )
}
