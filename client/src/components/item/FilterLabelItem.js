import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFilter } from '../../http/filterAPI'
import { deleteLabel } from '../../http/labelAPI'
import { updateData } from '../../redux/actions'
import FilterEdit from '../edit/FilterEdit'
import LabelEdit from '../edit/LabelEdit'
import ListItem from '../UI/ListItem'
import Modal from '../UI/Modal'

export default function FilterLabelItem({el, link, isFilter}) {

    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        if (isFilter) {
            deleteFilter(id).then(res => dispatch(updateData(res)))
        } else {
            deleteLabel(id).then(res => dispatch(updateData(res)))
        }
    }
    
    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                component={isFilter 
                    ? <FilterEdit
                        type='edit'
                        data={el}
                        onCloseModal={() => setModalOpen(false)}
                    />
                    : <LabelEdit
                        type='edit'
                        data={el}
                        onCloseModal={() => setModalOpen(false)}
                    />
                }
            />
            <ListItem
                component={Link}
                componentProps={{to: link}}
                title={el.title}
                buttons={
                    <>
                        <IconButton
                            onClick={() => handleDelete(el.id)}
                        ><Delete /></IconButton>
                        <IconButton
                            onClick={() => setModalOpen(true)}
                        ><Edit /></IconButton>
                    </>
                }
            >
            </ListItem>
        </>
    )
}