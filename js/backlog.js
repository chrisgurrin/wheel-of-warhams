export const loadBacklogFromStorage = () => {
     const items = localStorage.getItem("backlog_items")
     return items ? items.split(',') : []
}

export const setBacklogItems = (backlogItems) => {
    const newBacklog = backlogItems.map(x => x.replace('\n','')).filter(x => x != '')
    localStorage.setItem('backlog_items', newBacklog)
    return newBacklog
}

export const removeItemFromBacklog = (pickIndex, backlogItems) => {
    backlogItems.splice(pickIndex,1)
    setBacklogItems(backlogItems)    
}

export const formatBacklogString = (backlogItems) => backlogItems.join(',\n')

