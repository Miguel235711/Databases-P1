import {setChildren} from '../../js/transformers/ref.js'

import div from '../../js/tags/div.js'
import a from '../../js/tags/a.js'
import p from '../../js/tags/p.js'
import button from '../../js/tags/button.js'
import select from '../../js/tags/select.js'
import option from '../../js/tags/option.js'
import span from '../../js/tags/span.js'

import {getRandomStateId} from '../../js/transformers/random.js'

//example component

export default (selectOptions,question) =>{
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
    let idG = `${getRandomStateId()}${question.id}`
    let main = () => { 
        //({element,childrenFunctions})
        let id = 
        instance = setChildren({
            element: div()(),
            childrenFunctions: [
                select({
                    childrenFunctions: selectOptions.map(optionItem=>option({text:optionItem.showName})),
                    classes:['form-select']
                }),
                span({text:question.description}),
                question.answers && !question.answers.length==0 ?
                    button({text:'Mostrar más',classes:['btn','btn-primary'],type:'button',data_toggle:'collapse',data_target:`#${idG}`,aria_expanded:'false',aria_controls:idG})
                    : span({}),
                button({text:'Agregar',classes:['btn','btn-primary'],type:'button'}),
                button({text:'Borrar',classes:['btn','btn-primary'],type:'button'}),
                question.answers && !question.answers.length==0 ?
                    div({classes:['collapse'],id:idG,childrenFunctions:[
                        span({classes:['card','card-body'],childrenFunctions:
                            question.answers.map((answer,index)=>
                                div({childrenFunctions:[
                                    span({text:answer.description}),
                                    button({text:'Agregar',classes:['btn','btn-primary'],type:'button'}),
                                    button({text:'Borrar',classes:['btn','btn-primary'],type:'button',click:()=>{
                                        question.answers.splice(index,1)
                                        SetState(()=>{
                                            if(question.answers && !question.answers.length==0)
                                                $(`#${idG}`).collapse('toggle')
                                        })
                                    }})
                                ]})
                            )
                        })
                    ]})
                    : span({})
            ]        
        })
        return instance
    }
    return (parentIn)=>{ ///TODO: extrapolate functionality later
        parent = parentIn
        return main
    }
}

