export const updateData = (payload) => {
    return {
        type: 'updateData',
        payload
    }
}

export const deleteAllData = () => {
    return {
        type: 'deleteAllData'
    }
}