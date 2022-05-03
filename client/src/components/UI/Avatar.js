import React from 'react'
import { Avatar as MuiAvatar } from '@mui/material'
import styled from 'styled-components'


const StyledMuiAvatar = styled(MuiAvatar)`
    ${props => props.size && `width: ${props.size}; height: ${props.size}`}
`
export default function Avatar({user, size = ''}) {
    
    const getLetter = (text) => {
        return text.match(/[a-zA-zа-яА-Я0-9]/)[0]
    }

    if (user.avatar) {
        return (
            <StyledMuiAvatar
                size={size}
                alt={user.username || user.email}
                src={`${process.env.REACT_APP_API_URL}avatars/${user.avatar}`}
            />
        )
    }
    
    return <StyledMuiAvatar>{getLetter(user.username || user.email)}</StyledMuiAvatar>
}