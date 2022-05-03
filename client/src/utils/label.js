export const getLabelsIds = (taskId, taskLabelList) => {
    return taskLabelList.filter(el => el.taskId === taskId).map(el => el.labelId)
}

export const getLabelTitle = (labelList, id) => {
    return labelList.find(el => el.id === id).title
}