import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const Li = styled(Paper)`
    position: relative;
    min-height: 50px;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;

    &:first-child {
        margin-top: 0;
    }

    &:hover > #li-action-buttons {
        opacity: 1;
    }
`

const Inner = styled(Box)`
    display: flex;
    padding: 5px 10px;
    width: 100%;
    text-decoration: none;
    color: #000;
`

const Buttons = styled(Box)`
    position: absolute;
    top: 5px;
    right: 10px;

    display: flex;
    transition: opacity .05s;
    opacity: 0;
`

export default function ListItem({first, title, buttons, component, componentProps, children}) {
    return (
        <Li component="li" elevation={4}>
            <Inner component={component} {...componentProps}>
                {first && <Box>{first}</Box>}
                <Box>
                    <Typography component="h3" noWrap={true}>{title}</Typography>
                    {children}
                </Box>
            </Inner>
            <Buttons id="li-action-buttons">{buttons}</Buttons>
        </Li>
    )
}