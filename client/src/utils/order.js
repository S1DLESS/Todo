export const isExtremeItem = (taskList, task, section, position) => {
    if (position === 'first') {
        if (section === 'project') {
            return task.projectOrder === 1
        }
        if (section === 'time') {
            return task.timeOrder === 1
        }
    }
    if (position === 'last') {
        if (section === 'project') {
            if (taskList.length) {
                const filteredArr = [...taskList].filter(el => el.projectOrder)
                const lastOrder = filteredArr.sort((a, b) => a.projectOrder - b.projectOrder)[filteredArr.length - 1].projectOrder
                return task.projectOrder === lastOrder
            } else {
                return
            }
        }
        if (section === 'time') {
            if (taskList.length) {
                const filteredArr = [...taskList].filter(el => el.timeOrder)
                const lastOrder = filteredArr.sort((a, b) => a.timeOrder - b.timeOrder)[filteredArr.length - 1].timeOrder
                return task.timeOrder === lastOrder
            } else {
                return
            }
        }
    }
}