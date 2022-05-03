import { List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import FilterLabelItem from '../item/FilterLabelItem'


export default function FilterLabelsList({list}) {

    const isFilter = list === 'filter'
    const stateList = useSelector(state => isFilter ? state.filters : state.labels)

    return (
        <List>
            {stateList.map(el =>
                <FilterLabelItem
                    key={el.id}
                    el={el}
                    link={`/${list}/${isFilter ? el.id : el.title}`}
                    isFilter={isFilter}
                />
            )}
        </List>
    )
}