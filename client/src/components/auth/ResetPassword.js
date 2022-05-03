import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button, TextField, Typography } from '@mui/material'
import { AuthContext } from '../../context'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { reset } from '../../http/userAPI'


const Title = styled(Typography)`
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export default function ResetPassword() {

    const {setAuth, setKeepLogged} = useContext(AuthContext)

    const [email, setEmail] = useState('')

    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const [loading, setLoading] = useState(false)

    const resetPassword = () => {
        setError({status: false, message: ''})
        setLoading(true)
        reset({email})
            .then(res => {
                if (res.token) {
                    localStorage.setItem('auth', res.token)
                    setKeepLogged(true)
                    setAuth({isAuth: true, isLoading: true})
                } else {
                    setError({status: true, message: res.message})
                    setLoading(false)
                }
            })
    }

    return (
        <>
            <Title variant="h4" component="h2">Восстановление пароля</Title>
            <Typography>Пожалуйста, введите адрес электронной почты, связанный с вашей учетной записью</Typography>
            <Form>
                <TextField
                    type="email"
                    label="Адрес электронной почты"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                {error.status && <Typography color='error'>{error.message}</Typography>}
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={resetPassword}
                >Сбросить пароль</LoadingButton>
            </Form>
            <Button component={Link} to="/login">Войти</Button>
        </>
    )
}