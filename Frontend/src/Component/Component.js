import {setChildren} from '../../js/transformers/ref.js'

import div from '../../js/tags/div.js'


//example component

export default ()=>{
    let counter = 0
    let instance = undefined
    let parent = undefined  
    let SetState = (callback)=>{ ///extrapolate functionality later
        let old = instance
        console.log(`instance: ${instance}`)
        parent.replaceChild(main(),old)
        callback()
    }
    
    let main = () => { 
        //({element,childrenFunctions})
        instance = setChildren({
            element: div({text: counter.toString()})(),
            childrenFunctions: [
                div({
                    text:'Inner text',
                    click:SetState(()=>{
                        console.log('setState')
                        //console.log('going to change matrix')
                        counter++
                    })
                }),
                div({
                    text:'Hello'
                })
            ]        
        })
        return instance
    }
    return (parentIn)=>{ ///TODO: extrapolate functionality later
        parent = parentIn
        return main
    }
}

