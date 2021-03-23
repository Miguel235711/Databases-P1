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

const generalAPIEndpoint = 'http://localhost:5001/p1-databases/us-central1'
const questionsAPIEndpoint = `${generalAPIEndpoint}/questions-api`

export default (selectOptions,parentArray,question) =>{
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
    let RemoveSelf = (callback) =>{
        parent.removeChild(instance)
        callback()
    }
    let idG = `${getRandomStateId()}${question.id}`
    let main = () => { 
        //({element,childrenFunctions})
        //console.log(selectOptions.findIndex((option)=>question.type==option.name))
        instance = setChildren({
            element: div()(),
            childrenFunctions: [
                span({text:selectOptions.find((option)=>question.type==option.name).showName}),
                span({text:question.description}),
                question.answers && !question.answers.length==0 ?
                    button({text:'Mostrar más',classes:['btn','btn-primary'],type:'button',data_toggle:'collapse',data_target:`#${idG}`,aria_expanded:'false',aria_controls:idG})
                    : span({}),
                button({text:'Agregar Respuesta',classes:['btn','btn-primary'],type:'button'}),
                button({text:'Borrar Pregunta',classes:['btn','btn-primary'],type:'button',click:()=>{
                    Swal.fire({
                        title: `¿Estás seguro de borrar la Pregunta?`,
                        icon:'error',
                        confirmButtonText:'Borrar',
                        showCancelButton: true,
                        allowOutsideClick:false,
                        cancelButtonText: 'Cancelar'
                    }).then(result=>{
                        if(result.dismiss!='cancel'){
                            axios.delete(questionsAPIEndpoint,{
                                params:{
                                    id: question.id
                                }
                            }).catch(error=>{
                                alert(error.result)
                            }).then(response=>{
                                console.log(`parentArray: ${parentArray}`)
                                parentArray.splice(parentArray.findIndex(q=>q==question),1)
                                RemoveSelf(()=>{
                                    alert(response.data.result)
                                })
                            })
                                
                        }
                    })
                }}),
                question.answers && !question.answers.length==0 ?
                    div({classes:['collapse'],id:idG,childrenFunctions:[
                        span({classes:['card','card-body'],childrenFunctions:
                            question.answers.map((answer,index)=>
                                div({childrenFunctions:[
                                    span({text:answer.description}),
                                    button({text:'Borrar Respuesta',classes:['btn','btn-primary'],type:'button',click:()=>{
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

