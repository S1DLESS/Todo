import { TextField, Typography } from '@mui/material'
import {LoadingButton} from '@mui/lab'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { editSettings } from '../../http/userAPI'
import { updateData } from '../../redux/actions'
import Avatar from '../UI/Avatar'


const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export default function AccountSettings() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const form = useRef(null)
    
    const [data, setData] = useState({
        username: user.username || '',
        email: user.email,
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const handleSubmit = e => {
        e.preventDefault()
        setError({status: false, message: ''})
        setLoading(true)

        const formData = new FormData(form.current)
        editSettings(formData).then(res => {
            if (!res.message) {
                dispatch(updateData(res))
            } else {
                setError({status: true, message: res.message})
            }
            setLoading(false)
        })
    }

    return (
        <div>
            <Form
                ref={form}
                onSubmit={handleSubmit}
            >
                <div>
                    <Typography>Фото</Typography>
                    <Avatar user={user} size='100px' />
                    <input
                        name='avatar'
                        type='file'
                        accept="image/png, image/jpeg"
                    />
                </div>
                <TextField
                    name='username'
                    label='Имя пользователя'
                    value={data.username}
                    onChange={e => setData({...data, username: e.target.value})}
                ></TextField>
                <TextField
                    name='email'
                    label='Адрес электронной почты'
                    value={data.email}
                    onChange={e => setData({...data, email: e.target.value})}
                ></TextField>
                <TextField
                    name='password'
                    label='Новый пароль'
                    type='password'
                    value={data.password}
                    onChange={e => setData({...data, password: e.target.value})}
                ></TextField>
                <LoadingButton
                    type='submit'
                    loading={loading}
                    variant='contained'
                >Сохранить</LoadingButton>
                {error.status && <Typography color='error'>{error.message}</Typography>}
            </Form>
        </div>
    )
}