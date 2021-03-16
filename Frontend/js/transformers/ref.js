let setClasses = ({element,classes}) =>{
    element.setAttribute('class',classes.reduce((classesAcum,classs)=>classesAcum+' '+classs))
    return element
}
let setId = ({element,id}) =>{
    element.setAttribute('id',id)
    return element
}
let setChildren = ({element,childrenFunctions}) =>{
    //console.log('setChildren typeof(element): ',element.id)
    let elementChildren = element.children
    //console.log('elementChildren.length: ',elementChildren.length)
    while(elementChildren.length)
        elementChildren.item(0).remove()
    console.log('elementChildren.length: ',elementChildren.length)
    childrenFunctions.forEach(child=>element.appendChild(child()))
    return element
}

let withChildrenF = ({elementFunction,childrenFunctions}) => () => setChildren({element:elementFunction(),childrenFunctions:childrenFunctions})

export {setChildren,setClasses,setId,withChildrenF}