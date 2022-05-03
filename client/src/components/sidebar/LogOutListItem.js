import { Logout } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../../context'
import { deleteAllData } from '../../redux/actions'

export default function LogOutListItem() {

    const dispatch = useDispatch()

    return (
        <AuthContext.Consumer>
            {({auth, setAuth, keepLogged, setKeepLogged}) =>
                <MenuItem onClick={() => {
                    if (keepLogged) {
                        localStorage.removeItem('auth')
                        setKeepLogged(false)
                    } else {
                        sessionStorage.removeItem('auth')
                    }
                    dispatch(deleteAllData())
                    setAuth({...auth, isAuth: false})
                }}>
                    <ListItemIcon><Logout /></ListItemIcon>
                    <ListItemText>Выйти</ListItemText>
                </MenuItem>
            }
        </AuthContext.Consumer>
    )
}