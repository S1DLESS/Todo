import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button, IconButton, ListItemButton, Menu, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'


export default function ViewTaskList({sort}) {

    const {selectedSort, setSelectedSort} = sort
    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <div>
            {selectedSort.id === 1 &&
                <Tooltip title="Изменить порядок">
                    <IconButton
                        onClick={() =>
                            setSelectedSort({
                                ...selectedSort,
                                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
                            })
                        }
                    >
                        {selectedSort.order === 'asc'
                            ? <ArrowUpward />
                            : <ArrowDownward />
                        }
                    </IconButton>
                </Tooltip>
            }
            <Button onClick={e => setAnchorEl(e.currentTarget)}>Сортировка</Button>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <ListItemButton
                    selected={selectedSort.id === 0}
                    onClick={() => {
                        setSelectedSort({...selectedSort, id: 0})
                        setAnchorEl(null)
                    }}
                >
                    <Typography>По умолчанию</Typography>
                </ListItemButton>
                <ListItemButton
                    selected={selectedSort.id === 1}
                    onClick={() => {
                        setSelectedSort({...selectedSort, id: 1})
                        setAnchorEl(null)
                    }}
                >
                    <Typography>По алфавиту</Typography>
                </ListItemButton>
            </Menu>
        </div>
    )
}