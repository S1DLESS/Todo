import React from 'react'
import { Modal as MuiModal, Paper } from '@mui/material';
import styled from 'styled-components'


const StyledModal = styled(MuiModal)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled(Paper)`
    background-color: #fff;
    border-radius: 10px;
`

export default function Modal({open, onClose, component}) {

    return (
        <StyledModal
            open={open}
            onClose={onClose}
        >
            <Content elevation={4}>
                {component}
            </Content>
        </StyledModal>
    )
}