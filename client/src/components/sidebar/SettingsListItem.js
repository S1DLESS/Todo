import { Settings } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SettingsListItem({setAnchorEl, setModalOpen, setLocation}) {

    const location = useLocation()

    return (
        <MenuItem
            component={Link}
            to='/settings/account'
            state={location}
            onClick={() => {
                setLocation(location)
                setAnchorEl(null)
                setModalOpen(true)
        }}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText>Настройки</ListItemText>
        </MenuItem>
    )
}