import { LoadingButton } from '@mui/lab'
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../context'
import { login } from '../../http/userAPI'


const Options = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const RegisterLink = styled(Link)`
    text-decoration: none;
    color: #03c9d7;
    font-weight: 500;
`

const ResetPasswordLink = styled(Typography)`
    text-decoration: none;
    color: #03c9d7;
    font-weight: 500;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`


export default function Login() {

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

    const signIn = () => {
        setError({status: false, message: ''})
        setLoading(true)
        login({email: form.email, password: form.password})
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
            <Typography>Вы здесь впервые? <RegisterLink to="/register">Создайте учетную запись</RegisterLink></Typography>
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
                <Options>
                    <FormGroup>
                        <FormControlLabel
                            checked={form.keepLogged}
                            onChange={e => setForm({...form, keepLogged: e.target.checked})}
                            control={<Checkbox />}
                            label="Не выходить" />
                    </FormGroup>
                    <ResetPasswordLink component={Link} to="/reset-password">Забыли пароль?</ResetPasswordLink>
                </Options>
                {error.status && <Typography color='error'>{error.message}</Typography>}
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={signIn}
                >Войти</LoadingButton>
            </Form>
        </>
    )
}