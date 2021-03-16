import {setChildren} from '../../js/transformers/ref.js'

import div from '../../js/tags/div.js'
import a from '../../js/tags/a.js'
import p from '../../js/tags/p.js'
import button from '../../js/tags/button.js'


//example component

export default () =>{
    let counter = 0
    let instance = undefined
    let parent = undefined  
    let SetState = (callback)=>{ ///extrapolate functionality later
        let old = instance
        console.log(`instance: ${instance}`)
        console.log(`parent: ${parent}`)
        parent.replaceChild(main(),old)
        callback()
    }
    
    let main = () => { 
        //({element,childrenFunctions})
        instance = setChildren({
            element: div()(),
            childrenFunctions: [
                p({childrenFunctions:[
                    a({text:'Link with href',classes:['btn','btn-primary'],data_toggle:'collapse',href:'#collapseExample',role:'button',aria_expanded:'false',aria_controls:'collapseExample'}),
                    button({text:'Button with data target',classes:['btn','btn-primary'],type:'button',data_toggle:'collapse',data_target:'#collapseExample',aria_expanded:'false',aria_controls:'collapseExample'})
                ]}),
                div({classes:['collapse'],id:'collapseExample',childrenFunctions:[
                    div({classes:['card','card-body'],text:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.'})
                ]})
            ]        
        })
        return instance
    }
    return (parentIn)=>{ ///TODO: extrapolate functionality later
        parent = parentIn
        return main
    }
}

