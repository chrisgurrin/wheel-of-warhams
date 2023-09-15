export const getBacklogItems = (elem) => 
    elem.value === '' ? [] : elem.value.split(',').filter( x => {
        console.log(x)
        return x.match("[a-zA-Z0-9]+")
    })

