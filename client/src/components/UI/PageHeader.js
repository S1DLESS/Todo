import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import styled from 'styled-components'


const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
`

const Title = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const PrimaryTitle = styled(Typography)`
    ${props => props.hasleftcomponent ? 'margin-left: 10px;' : ''}
`

const SecondaryTitle = styled(Typography)`
    margin-left: 10px;
`

export default function PageHeader({pageTitle, secondaryTitle = '', componentsOnRight = null, componentsOnLeft = null}) {
    return (
        <Header>
            <Title>
                {componentsOnLeft}
                <PrimaryTitle
                    hasleftcomponent={componentsOnLeft}
                    variant='h4'
                    component='h2'
                >
                    {pageTitle}
                </PrimaryTitle>
                {secondaryTitle && <SecondaryTitle component='span'>{secondaryTitle}</SecondaryTitle>}
            </Title>
            {componentsOnRight}
        </Header>
    )
}