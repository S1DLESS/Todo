import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editAccountSettings } from '../../http/userAPI'
import { updateData } from '../../redux/actions'


export default function GeneralSettings() {
    const userConfig = useSelector(state => state.userConfig)
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        showCompletedTasks: userConfig.showCompletedTasks
    })
    const [loading, setLoading] = useState(false)

    const changeSettings = (data) => {
        setLoading(true)
        setValues(data)
        editAccountSettings(data).then(res => {
            if (!res.message) {
                dispatch(updateData(res))
            } else {
                setValues({showCompletedTasks: userConfig.showCompletedTasks})
            }
            setLoading(false)
        })
    }

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch
                    disabled={loading}
                    checked={values.showCompletedTasks}
                    onChange={e => changeSettings({showCompletedTasks: e.target.checked})}/>
                }
                label="Показать выполненные задачи"
            />
        </FormGroup>
    )
}