import { Box, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const Wrapper = styled(Box)`
    margin: 0 auto;
    padding: 20px;
    width: 600px;
    background-color: rgba(0, 0, 0, 0.025);
`

const Title = styled(Typography)`
    text-align: center;
`

const FormWrapper = styled(Box)`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`


export default function AuthPage({component}) {

    document.title = "Todo"

    return (
        <Wrapper>
            <Title variant="h2" component="h1">Todo</Title>
            <FormWrapper>
                {component}
            </FormWrapper>
        </Wrapper>
    )
}