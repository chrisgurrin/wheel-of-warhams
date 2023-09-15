export const loadBacklogFromStorage = () => 
     localStorage.getItem("backlog_items").split(',')

export const setBacklogItems = (backlogItems) => 
    localStorage.setItem('backlog_items', backlogItems.map(x => x.replace('\n','')))

export const removeItemFromBacklog = (pickIndex, backlogItems, elem) => {
    backlogItems.splice(pickIndex,1)
    setBacklogItems(backlogItems)    
}

export const formatBacklogString = (backlogItems) => backlogItems.join(',\n')

