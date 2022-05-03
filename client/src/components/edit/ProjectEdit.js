import { LoadingButton } from '@mui/lab'
import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { createProject, editProject } from '../../http/projectAPI'
import { updateData } from '../../redux/actions'


const Form = styled.form`
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    min-width: 500px;
`

export default function ProjectEdit({type, data, onCloseModal}) {

    const [project, setProject] = useState({
        id: data ? data.id : 0,
        title: data ? data.title : ''
    })
    const dispatch = useDispatch()

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
                createProject({
                    title: project.title.replace(/\s*/, '').replace(/\s*$/, '')
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
                editProject({
                    title: project.title.replace(/\s*/, '').replace(/\s*$/, '')
                }, project.id).then(res => {
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
                label='Название проекта'
                value={project.title}
                onChange={e => setProject({...project, title: e.target.value})}
            />
            <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}
                disabled={!project.title.match(/\S/)}
            >
                {type === 'add' ? 'Добавить' : 'Сохранить'}
            </LoadingButton>
            {error.status && <Typography color='error'>{error.message}</Typography>}
        </Form>
    )
}