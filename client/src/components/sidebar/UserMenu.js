import { Button, Divider, Menu, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Settings from '../settings/Settings'
import { useSelector } from 'react-redux'
import Avatar from '../UI/Avatar'
import Modal from '../UI/Modal'
import SettingsListItem from './SettingsListItem'
import LogOutListItem from './LogOutListItem'


const AccountButton = styled(Button)`
    border-radius: 0.5rem;
    width: 100%;
    justify-content: start;
    text-transform: none;
    color: #000;

    ${props => props.openmenu
        ? 'background-color: rgba(0, 0, 0, 0.1);'
        : `&:hover {
            background-color: rgba(0, 0, 0, 0.04);
        }`
    }
`

const Username = styled(Typography)`
    margin-left: 10px;
`

const AccountMenu = styled(Menu)`
    padding: 5px;
`

export default function UserMenu() {

    const navigate = useNavigate()

    const user = useSelector(state => state.user)

    const [modalOpen, setModalOpen] = useState(false)
    const [location, setLocation] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)

    const closeModal = () => {
        setModalOpen(false)
        navigate(location.pathname)
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={closeModal}
                component={
                    <Settings
                        location={location}
                        onCloseModal={closeModal}
                        sidebar
                    />
                }
            />
            <AccountButton openmenu={anchorEl} onClick={e => setAnchorEl(e.currentTarget)}>
                <Avatar user={user} />
                <Username noWrap={true}>{user.username || user.email}</Username>
            </AccountButton>
            <AccountMenu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <SettingsListItem 
                    setAnchorEl={el => setAnchorEl(el)}
                    setModalOpen={isOpen => setModalOpen(isOpen)}
                    setLocation={loc => setLocation(loc)}
                />
                <Divider />
                <LogOutListItem />
            </AccountMenu>
        </> 
    )
}