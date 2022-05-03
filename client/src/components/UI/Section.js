import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const Header = styled(Box)`
    display: flex;
    align-items: flex-end;
`

const HeaderTitle = styled(Typography)`
    width: 100%;
`

export default function Section({title, secondaryAction, children}) {
    return (
        <Box>
            <Header>
                <HeaderTitle>{title}</HeaderTitle>
                {secondaryAction}
            </Header>
            <Divider />
            {children}
        </Box>
    )
}