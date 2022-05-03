import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { AccountCircleOutlined, Close, SettingsOutlined } from '@mui/icons-material'
import { Box } from '@mui/system'
import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import AccountSettings from './AccountSettings'
import GeneralSettings from './GeneralSettings'


const Wrapper = styled(Box)`
    display: flex;
    min-width: 700px;
    min-height: 450px;
`

const SettingsList = styled(List)`
    background-color: rgba(0, 0, 0, 0.025);
    min-width: 200px;
    padding: 10px;
`

const SettingsLink = styled(ListItemButton)`
    border-radius: 5px;
    padding: 0 0 0 5px;
`

const Li = styled(ListItem)`
    padding: 0;
    margin-top: 5px;

    &:first-child {
        margin-top: 0;
    }
`

const LiIcon = styled(ListItemIcon)`
    min-width: 40px;
`

const SettingsMain = styled(Box)`
    width: 100%;
    padding: 10px;
`

const SettingsHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
`

const settingsArr = [
    {
        link: '/settings/account',
        icon: <AccountCircleOutlined />,
        title: 'Аккаунт'
    },
    {
        link: '/settings/general',
        icon: <SettingsOutlined />,
        title: 'Основное'
    }
]

export default function Settings({location, onCloseModal, sidebar = ''}) {

    const newLocation = useLocation()

    const getSettingsTitle = (pathname) => {
        return settingsArr.find(el => el.link === pathname).title
    }

    return (
        <Wrapper>
            <SettingsList>
                {settingsArr.map(el =>
                    <Li key={el.link}>
                        <SettingsLink
                            component={Link}
                            to={el.link}
                            state={location}
                        >
                            <LiIcon>{el.icon}</LiIcon>
                            <ListItemText>{el.title}</ListItemText>
                        </SettingsLink>
                    </Li> 
                )}
            </SettingsList>
            <SettingsMain>
                <SettingsHeader>
                    <Typography variant='h6'>{getSettingsTitle(newLocation.pathname)}</Typography>
                    <IconButton onClick={() => onCloseModal()}>
                        <Close />
                    </IconButton>
                </SettingsHeader>
                <Routes>
                    <Route path={`${sidebar && '/settings'}/account`} element={<AccountSettings />} />
                    <Route path={`${sidebar && '/settings'}/general`} element={<GeneralSettings />} />
                </Routes>
            </SettingsMain>
        </Wrapper>
    )
}