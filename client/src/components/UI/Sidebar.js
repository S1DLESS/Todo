import { Inbox, Today, DateRange, FilterNone, Search } from '@mui/icons-material'
import { List, ListItem, Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import RouterLink from './RouterLink'
import ProjectList from '../list/ProjectList'
import UserMenu from '../sidebar/UserMenu'
import TaskCounter from '../sidebar/TaskCounter'


const Aside = styled(Box)`
    min-width: 250px;
    max-width: 400px;
    padding: 10px 10px 10px 20px;

    &:hover {
        #sidebar-add-project-button {
            opacity: 1;
        }
    }
`

const Ul = styled(List)`
    margin-top: 10px;
    padding: 0;
`

const Li = styled(ListItem)`
    margin-top: 7px;
    padding: 0;

    &:first-child {
        margin-top: 0;
    }
`

export default function Sidebar() {

    return (
        <Aside component="aside">
            <UserMenu />
            <Ul>
                <Li>
                    <RouterLink to="/search" icon={<Search />}>Поиск</RouterLink>
                </Li>
                <Li secondaryAction={<TaskCounter route="/project/inbox" />}>
                    <RouterLink to="/project/inbox" icon={<Inbox />}>Входящие</RouterLink>
                </Li>
                <Li secondaryAction={<TaskCounter route="/today" />}>
                    <RouterLink to="/today" icon={<Today />}>Сегодня</RouterLink>
                </Li>
                <Li>
                    <RouterLink to="/upcoming" icon={<DateRange />}>Предстоящее</RouterLink>
                </Li>
                <Li>
                    <RouterLink to="/filters-labels" icon={<FilterNone />}>Фильтры и метки</RouterLink>
                </Li>
            </Ul>
            <ProjectList />
        </Aside>
    )
}