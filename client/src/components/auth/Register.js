import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context'
import styled from 'styled-components'
import { LoadingButton } from '@mui/lab'
import { registration } from '../../http/userAPI'


const Title = styled(Typography)`
    text-align: center;
`

const LoginLink = styled(Button)`
    text-decoration: none;
    color: #03c9d7;
    font-weight: 500;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export default function Register() {

    const {setAuth, setKeepLogged} = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: '',
        keepLogged: false
    })

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const signUp = () => {
        setError({status: false, message: ''})
        setLoading(true)
        registration({email: form.email, password: form.password})
            .then(res => {
                if (res.token) {
                    if (form.keepLogged) {
                        localStorage.setItem('auth', res.token)
                        setKeepLogged(true)
                    } else {
                        sessionStorage.setItem('auth', res.token)
                    }
                    setAuth({isAuth: true, isLoading: true})
                } else {
                    setError({status: true, message: res.message})
                    setLoading(false)
                }
            })
    }

    return (
        <>
            <Title variant='h4' component="h2">Регистрация</Title>
            <Form>
                <TextField
                    type="email"
                    label="Адрес электронной почты"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})} />
                <TextField
                    type="password"
                    label="Пароль"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})} />
                <FormGroup>
                    <FormControlLabel
                        checked={form.keepLogged}
                        onChange={e => setForm({...form, keepLogged: e.target.checked})}
                        control={<Checkbox />}
                        label="Не выходить" />
                </FormGroup>
                {error.status && <Typography color='error'>{error.message}</Typography>}
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={signUp}
                >Зарегистрироваться</LoadingButton>
            </Form>
            <LoginLink component={Link} to="/login">Войти</LoginLink>
        </>
    )
}