import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import styled from 'styled-components'


const Button = styled(ListItemButton)`
    border-radius: 0.5rem;
    padding: 2px 12px;

    &.Mui-selected {
        background-color: #03c9d7;
        color: #fff;

        &:hover {
            background-color: #03c9d7; 
        }
    }
`

const Icon = styled(ListItemIcon)`
    min-width: 35px;
    ${props => props.active ? 'color: #fff;' : ''}

    & > .MuiSvgIcon-root {
        font-size: 1.25rem;
    }
`


export default function RouterLink({children, to, icon}) {
    const resolved = useResolvedPath(to)
    const isMatch = useMatch(resolved.pathname)

    return (
        <Button component={Link} to={to} selected={!!isMatch}>
            {icon && <Icon active={isMatch}>{icon}</Icon>}
            <ListItemText primaryTypographyProps={{noWrap: true}} primary={children} />
        </Button>
    )
}