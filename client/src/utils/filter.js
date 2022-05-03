export const filterTask = (task, query) => {
    switch (query) {
        case 'priority 1':
            return task.priorityId === 1
        case 'priority 2':
            return task.priorityId === 2
        case 'priority 3':
            return task.priorityId === 3
        case 'priority 4':
            return task.priorityId === 4
        case 'view all':
            return true
        case 'no date':
            return !task.date
        default:
            break
    }
}