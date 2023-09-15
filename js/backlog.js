export const loadBacklogFromStorage = () => {
     const items = localStorage.getItem("backlog_items")
     return items ? items.split(',') : []
}

export const setBacklogItems = (backlogItems) => 
    localStorage.setItem('backlog_items', backlogItems.map(x => x.replace('\n','')))

export const removeItemFromBacklog = (pickIndex, backlogItems) => {
    backlogItems.splice(pickIndex,1)
    setBacklogItems(backlogItems)    
}

export const formatBacklogString = (backlogItems) => backlogItems.join(',\n')

