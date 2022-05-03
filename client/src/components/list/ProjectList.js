import { Box, List, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ProjectItem from '../item/ProjectItem'
import ButtonModal from '../ButtonModal'


const Wrapper = styled(Box)`
    margin-top: 10px;
`
const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderTitle = styled(Typography)`
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    font-size: 0.875rem;
`

const Ul = styled(List)`
    margin-top: 10px;
    padding: 0;
`

export default function ProjectList() {

    const projectList = useSelector(state => state.projects.length
        ? state.projects.filter(el => !el.isInbox)
        : [])

    return (
        <Wrapper>
            <Header>
                <HeaderTitle>Проекты</HeaderTitle>
                <ButtonModal
                    component='ProjectAdd'
                    type='fab'
                    buttonProps={{id: "sidebar-add-project-button", sidebar: 'true'}}
                />
            </Header>
            <Ul>
                {projectList.map(project =>
                    <ProjectItem key={project.id} project={project} />
                )}
            </Ul>
        </Wrapper>
    )
}