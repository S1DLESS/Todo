export const getInboxProject = (projects) => {
    return projects.find(el => el.isInbox)
}

export const isInboxProject = (projects, id) => {
    return getInboxProject(projects).id === id
}

export const getProjectTitle = (projects, id) => {
    return projects.find(el => el.id === id).title
}