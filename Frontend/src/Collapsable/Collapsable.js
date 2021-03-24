import {setChildren} from '../../js/transformers/ref.js'

import div from '../../js/tags/div.js'
import a from '../../js/tags/a.js'
import p from '../../js/tags/p.js'
import button from '../../js/tags/button.js'
import select from '../../js/tags/select.js'
import option from '../../js/tags/option.js'
import span from '../../js/tags/span.js'
import img from '../../js/tags/img.js'

import {getRandomStateId} from '../../js/transformers/random.js'
import {valueHolder,selectHolder,bindChangeListenerToHolderBiIndex,bindListenerToHolderBiValue,
    bindChangeListenerToHolderBiChecked,checkedHolder} from '../../js/binding/bind.js'
import input from '../../js/tags/input.js'

//example component

const generalAPIEndpoint = 'https://us-central1-p1-databases.cloudfunctions.net'
const questionsAPIEndpoint = `${generalAPIEndpoint}/questions`
const answersAPIEndpoint = `${generalAPIEndpoint}/answers`

export default (selectOptions,parentArray,question) =>{
    console.log(`going to get answers`)
    axios.get(answersAPIEndpoint,{
        params:{questionId:question.id}
    }).catch(res=>console.log(`error getting answers for question with id: ${question.id}`))
    .then(res=>{
        console.log(res.data.data)  
        question.answers = res.data.data
        SetState(()=>{
            console.log('answer got')
        })
    })
    let counter = 0
    let instance = undefined
    let parent = undefined  

    let answerHolder = valueHolder('')
    let isCorrectHolder = checkedHolder(false)

    let correct = false

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
                span({text:selectOptions.find((option)=>question.type==option.name).showName, classes:["questionType"]}),
                span({text:question.description}),
                question.answers && !question.answers.length==0 ?
                    button({text:'Mostrar más/menos',classes:['btn','btn-primary'],type:'button',data_toggle:'collapse',data_target:`#${idG}`,aria_expanded:'false',aria_controls:idG})
                    : span({}),
                question.type != 'open' ? button({text:'Agregar Respuesta',classes:['btn','btn-primary'],type:'button', click:()=> {
                    Swal.fire({
                        title: `Ingresa la respuesta para agregar`,
                        icon:'question',
                        html: div({
                            childrenFunctions:[
                                    div({
                                        classes:['input-group-prepend'],
                                        childrenFunctions:[span({text:'Respuesta: ',classes:['input-group-text']})]
                                    }),
                                    bindListenerToHolderBiValue(input({type:'text',arial_label:'Description',aria_describedby:'basic-addon1',classes:['form-control']}),answerHolder,'input'),
                                    div({
                                        classes:['input-group-prepend'],
                                        childrenFunctions:[span({text:'Correcta: ',classes:['input-group-text']})]
                                    }),
                                    bindChangeListenerToHolderBiChecked(input({type:'checkbox', arial_label:'Description',aria_describedby:'basic-addon1', classes:['form-control']}), isCorrectHolder)
                            ],
                            classes:['input-group','mb-3']
                        })(),
                        confirmButtonText:'Agregar',
                        showCancelButton: true,
                        allowOutsideClick:false,
                        cancelButtonText: 'Cancelar'
                    }).then(result=>{
                        if(result.dismiss!='cancel'){
                            const description = answerHolder.value
                            if(!/\S/.test(description)){
                                alert('El campo descripción no puede estar vacío')
                                return
                            }
                            if(isCorrectHolder.checked&&question.type=='mult'){
                                let rightAnswers = 0
                                question.answers.forEach(answer=>{
                                    if(answer.isRight)
                                        rightAnswers ++
                                })
                                if(rightAnswers!=0){
                                    alert('No puede haber más de una respuesta correcta en preguntas de opción multiple')
                                    return;
                                }
                            }
                            console.log(isCorrectHolder.checked)
                            axios.post(answersAPIEndpoint,{
                                description:answerHolder.value
                            },{
                                params:{
                                    questionId:question.id,
                                    isRight:isCorrectHolder.checked
                                }
                            }).catch(res=>
                                alert(res.data.result) 
                            ).then(res=>{
                                //alert(res.data.result)
                                question.answers.push({id:res.data.id,description,questionId:question.id,isRight:isCorrectHolder.checked})
                                console.log(`are answers valid?${question.answers && !question.answers.length}`)
                                //console.log(exams.length)
                                answerHolder.setValue('')
                                isCorrectHolder.setChecked(false)
                                SetState(()=>{
                                    alert(res.data.result)
                                    $(`#${idG}`).collapse('toggle')
                                })
                            })
                        }
                    })
                }}) : span({}),
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
                question.answers && question.answers.length!=0 ?
                    div({classes:['collapse'],id:idG,childrenFunctions:[
                        span({classes:['card','card-body'],childrenFunctions:
                            question.answers.map((answer,index)=>
                                div({childrenFunctions:[
                                    span({text:answer.description}),
                                    answer.isRight ? img({src:"https://img.icons8.com/windows/64/000000/--checkmark-yes.png"}):img({src:"https://img.icons8.com/fluent-systems-regular/48/000000/delete-shield--v1.png"}),
                                    button({text:'Borrar Respuesta',classes:['btn','btn-primary'],type:'button',click:()=>{
                                        Swal.fire({
                                            title: `¿Estás seguro de borrar la respuesta?`,
                                            icon:'error',
                                            confirmButtonText:'Borrar',
                                            showCancelButton: true,
                                            allowOutsideClick:false,
                                            cancelButtonText: 'Cancelar'
                                        }).then(result=>{
                                            if(result.dismiss!='cancel'){
                                                axios.delete(answersAPIEndpoint,{
                                                    params:{
                                                        id:answer.id
                                                    }
                                                }).catch(res=>alert(res.data.result))
                                                .then(res=>{
                                                    question.answers.splice(index,1)
                                                    SetState(()=>{
                                                        alert(res.data.result)
                                                        if(question.answers && !question.answers.length==0)
                                                            $(`#${idG}`).collapse('toggle')
                                                    })
                                                })          
                                            }
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

