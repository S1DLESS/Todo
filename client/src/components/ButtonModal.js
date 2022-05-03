import { Add } from '@mui/icons-material'
import { Button, Fab } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import FilterEdit from './edit/FilterEdit'
import LabelEdit from './edit/LabelEdit'
import ProjectEdit from './edit/ProjectEdit'
import TaskEdit from './edit/TaskEdit'
import Modal from './UI/Modal'


const StyledFab = styled(Fab)`
    ${props => props.flp
        ? 'margin-bottom: 5px;'
        : ''
    }
    ${props => props.sidebar
        ? 'opacity: 0;'
        : ''
    }
    min-height: 30px;
    width: 30px;
    height: 30px;

    & > .MuiSvgIcon-root {
        font-size: 1.3rem;
    }
`

export default function ButtonModal({component, type = 'default', buttonProps = {}}) {

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const modalComponent = () => {
        if (component === 'TaskAdd') {
            return <TaskEdit type='add' onCloseModal={() => setIsOpen(false)} />
        }
        if (component === 'ProjectAdd') {
            return <ProjectEdit type='add' onCloseModal={() => setIsOpen(false)} />
        }
        if (component === 'FilterAdd') {
            return <FilterEdit type='add' onCloseModal={() => setIsOpen(false)} />
        }
        if (component === 'LabelAdd') {
            return <LabelEdit type='add' onCloseModal={() => setIsOpen(false)} />
        }
    }

    return (
        <>
            {type === 'default' &&
                <Button
                    variant='contained'
                    onClick={() => setIsOpen(true)}
                >Добавить задачу</Button>
            }
            {type === 'fab' &&
                <StyledFab {...buttonProps} onClick={() => setIsOpen(true)}>
                    <Add />
                </StyledFab>
            }
            <Modal open={isOpen} onClose={closeModal} component={modalComponent()} />
        </>
    )
}