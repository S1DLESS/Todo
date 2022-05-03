import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const LoadingContainer = styled(Box)`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Loader = styled(CircularProgress)`
    margin: 10px 45px 0;
`

export default function Loading() {
    return (
        <LoadingContainer>
            <Typography
                variant='h2'
                component="h1"
            >Todo</Typography>
            <Loader />
        </LoadingContainer>
    )
}