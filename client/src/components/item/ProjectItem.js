import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deleteProject } from '../../http/projectAPI'
import { updateData } from '../../redux/actions'
import ProjectEdit from '../edit/ProjectEdit'
import TaskCounter from '../sidebar/TaskCounter'
import RouterLink from '../UI/RouterLink'
import Modal from '../UI/Modal'


const TaskCounterWrapper = styled(Box)`
    min-width: 34px;
`

const ActionButton = styled(IconButton)`
    display: none;
    padding: 7px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.14)
    }

    & > .MuiSvgIcon-root {
        font-size: 1.25rem;
    }
`

const LiHoverStyles = `
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.04);

    ${ActionButton} {
        display: inline-flex;
    }

    ${TaskCounterWrapper} {
        display: none;
    }
`

const Li = styled(ListItem)`
    margin-top: 7px;
    padding: 0;

    & > a:hover {
        background-color: transparent;
    }

    ${props => props.openmenu ? LiHoverStyles : `&:hover {${LiHoverStyles}}`}

    &:first-child {
        margin-top: 0;
    }

    & > .MuiListItemSecondaryAction-root {
        right: 5px;
    }
`

export default function ProjectItem({project}) {

    const [anchorEl, setAnchorEl] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = () => {
        deleteProject(project.id).then(res => dispatch(updateData(res)))
    }

    const openEditModal = () => {
        setAnchorEl(null)
        setModalOpen(true)
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                component={
                    <ProjectEdit
                        type='edit'
                        data={project}
                        onCloseModal={() => setModalOpen(false)}
                    />
                }
            />
            <Li openmenu={anchorEl} secondaryAction={
                <>
                    <TaskCounterWrapper>
                        <TaskCounter route={`/project/${project.id}`} />
                    </TaskCounterWrapper>
                    <ActionButton onClick={e => setAnchorEl(e.currentTarget)}>
                        <MoreVert />
                    </ActionButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={openEditModal}>
                            <ListItemIcon><Edit /></ListItemIcon>
                            <ListItemText>Редактировать проект</ListItemText>
                        </MenuItem>
                        
                        <MenuItem onClick={handleDelete}>
                            <ListItemIcon><Delete /></ListItemIcon>
                            <ListItemText>Удалить проект</ListItemText>
                        </MenuItem>
                    </Menu>
                </>
            }>
                <RouterLink to={`/project/${project.id}`}>{project.title}</RouterLink>
            </Li>
        </>
    )
}