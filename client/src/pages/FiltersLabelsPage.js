import React from 'react'
import Section from '../components/UI/Section'
import FilterLabelsList from '../components/list/FilterLabelsList'
import ButtonModal from '../components/ButtonModal'
import PageHeader from '../components/UI/PageHeader'


export default function FiltersLabelsPage() {

    document.title = 'Фильтры и метки: Todo'

    return (
        <>
            <PageHeader pageTitle="Фильтры и метки" />

            <Section
                title='Фильтры'
                secondaryAction={
                    <ButtonModal
                        component='FilterAdd'
                        type='fab'
                        buttonProps={{id: "sidebar-add-project-button", flp: 'true'}}
                    />
                }>
                <FilterLabelsList list='filter' />
            </Section>
            <Section
                title='Метки'
                secondaryAction={
                    <ButtonModal
                        component='LabelAdd'
                        type='fab'
                        buttonProps={{id: "sidebar-add-project-button", flp: 'true'}}
                    />
                }>
                <FilterLabelsList list='label' />
            </Section>
        </>
    )
}