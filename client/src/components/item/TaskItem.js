import { FormGroup, Checkbox, Typography, IconButton, Button, Menu } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateData } from '../../redux/actions'
import { isExtremeItem } from '../../utils/order'
import { getNamedTime } from '../../utils/time'
import styled from 'styled-components';
import { getProjectTitle, isInboxProject } from '../../utils/project';
import { Box } from '@mui/system';
import ListItem from '../UI/ListItem';
import TaskEdit from '../edit/TaskEdit';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from '../edit/DateTimePicker';
import { deleteTask, moveTask, setDoneTask } from '../../http/taskAPI';
import { getLabelsIds, getLabelTitle } from '../../utils/label';
import Modal from '../UI/Modal';


const ButtonsWrapper = styled(Box)`
    display: flex;
    column-gap: 5px;
`

const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
        ${props => {
            switch (props.styledcolor) {
                case 1:
                    return 'color: rgba(255, 0, 0, 0.6)';
                case 2:
                    return 'color: rgba(255, 128, 0, 0.6)';
                case 3:
                    return 'color: rgba(0, 128, 255, 0.6)';
                case 4:
                    return 'color: rgba(0, 0, 0, 0.6)';
                default:
                    break;
            }
        }}
    }
    

    &.MuiCheckbox-root:hover {
        ${props => {
            switch (props.styledcolor) {
                case 1:
                    return 'background-color: rgba(255, 0, 0, 0.04);';
                case 2:
                    return 'background-color: rgba(255, 128, 0, 0.04);';
                case 3:
                    return 'background-color: rgba(0, 128, 255, 0.04);';
                case 4:
                    return 'background-color: rgba(0, 0, 0, 0.04);';
                default:
                    break;
            }
        }}
    }

    &.Mui-checked {
        ${props => {
            switch (props.styledcolor) {
                case 1:
                    return 'color: rgb(255, 0, 0);';
                case 2:
                    return 'color: rgb(255, 128, 0);';
                case 3:
                    return 'color: rgb(0, 128, 255);';
                case 4:
                    return 'color: rgba(0, 0, 0, 0.6);';
                default:
                    break;
            }
        }}
        
    }
`

export default function TaskItem({task, section, arrLength, isMovable}) {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleChange = (e) => {
        setDoneTask(e.target.checked, task.id)
            .then(res => dispatch(updateData(res)))
    }

    const handleMoveTask = (e, direction) => {
        e.stopPropagation()
        let order = 0
        if (direction === 'up') {
            order = section === 'time' ? task.timeOrder - 1 : task.projectOrder - 1
        }
        if (direction === 'down') {
            order = section === 'time' ? task.timeOrder + 1 : task.projectOrder + 1
        }
        moveTask(order, section, task.id)
            .then(res => dispatch(updateData(res)))
    }

    const handleDeleteTask = (e) => {
        e.stopPropagation()
        deleteTask(task.id)
            .then(res => dispatch(updateData(res)))
    }

    const closeTimePopup = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                component={
                    <TaskEdit
                        type='edit'
                        onCloseModal={() => setModalOpen(false)}
                        data={task}
                    />
                }
            />
            <ListItem
                componentProps={{onClick: () => setModalOpen(true)}}
                first={
                    <FormGroup>
                        <StyledCheckbox
                            styledcolor={task.priority}
                            checked={task.done}
                            onChange={handleChange}
                            onClick={e => e.stopPropagation()}
                        />
                    </FormGroup>
                }
                title={task.title}
                buttons={
                    <>
                        <IconButton
                            onClick={handleDeleteTask}
                        ><DeleteIcon /></IconButton>

                        {!isMovable &&
                            <>
                                {!isExtremeItem(state.tasks, task, section, 'first') &&
                                    <IconButton onClick={e => handleMoveTask(e, 'up')}
                                    ><ArrowDropUpIcon /></IconButton>
                                }
        
                                {!isExtremeItem(state.tasks, task, section, 'last') &&
                                    <IconButton onClick={e => handleMoveTask(e, 'down')}
                                    ><ArrowDropDownIcon /></IconButton>
                                }
                            </>
                        }
                    </>
                }
            >
                {task.description &&
                    <Typography
                        component='p'
                        variant='caption'
                    >{task.description}</Typography>
                }
                <ButtonsWrapper>
                    {((section !== 'time' && task.date) || (section === 'time' && task.hasTime)) &&
                    <>
                        <Button
                            color='secondary'
                            variant="outlined"
                            startIcon={<AccessTimeIcon />}
                            size="small"
                            onClick={e => {
                                e.stopPropagation()
                                setAnchorEl(e.currentTarget)
                            }}
                        >
                            {getNamedTime(Date.parse(task.date), task.hasTime, section === 'time' ? 'time' : 'dateTime')}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={closeTimePopup}
                            onClick={e => e.stopPropagation()}
                        >
                            <DateTimePicker
                                task={task}
                                onSave={closeTimePopup}
                            />
                        </Menu>
                    </>
                    }

                    {(section === 'time' || section === 'filter') &&
                        <Button
                            color='secondary'
                            variant="outlined"
                            size="small"
                            onClick={e => {
                                e.stopPropagation()
                                navigate(`/project/${isInboxProject(state.projects, task.projectId)
                                    ? 'inbox'
                                    : task.projectId}`
                                )
                            }}
                        >
                            {isInboxProject(state.projects, task.projectId)
                                ? 'Входящие'
                                : getProjectTitle(state.projects, task.projectId)
                            }
                        </Button>
                    }

                    {(getLabelsIds(task.id, state.taskLabels).length || null) &&
                        state.taskLabels.filter(el => el.taskId === task.id).map(el =>
                            <Button
                                key={el.id}
                                color='secondary'
                                variant="outlined"
                                startIcon={<LabelOutlinedIcon />}
                                size="small"
                                onClick={e => {
                                    e.stopPropagation()
                                    navigate(`/label/${getLabelTitle(state.labels, el.labelId)}`)
                                }}
                            >
                                {getLabelTitle(state.labels, el.labelId)}
                            </Button>
                        )
                    }
                </ButtonsWrapper>
            </ListItem>
        </>
    )
}