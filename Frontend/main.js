import {setChildren} from './js/transformers/ref.js'


import div from './js/tags/div.js'
import span from './js/tags/span.js'
import input from './js/tags/input.js'
import table from './js/tags/table.js'
import select from './js/tags/select.js'
import option from './js/tags/option.js'
import h1 from './js/tags/h1.js'
import h2 from './js/tags/h2.js'
import script from './js/tags/script.js'

import {withChildrenF} from './js/transformers/ref.js'
import {valueHolder,selectHolder,bindChangeListenerToHolderBiIndex,bindListenerToHolderBiValue} from './js/binding/bind.js'
import form from './js/tags/form.js'

import Component from './src/Component/Component.js'
import Collapsable from './src/Collapsable/Collapsable.js'




let SetState = (callback)=>{
    console.log('SetState')
    main()
    callback()
}

let body = document.querySelector('body')
let examNameHolder = valueHolder('')
let exams = []
/*let exams = [
    {id:1,name:'Exam1',questions:[
        {
            id:1,
            description:'¿Cuánto es 3+2?',
            ord:1,
            type: 'open',
        },
        {
            id:2,
            description:'¿Quién descubrió E=mc^2?',
            ord:0,
            type:'mult',
            answers:[
                {
                    description:'Albert Einstein',
                    ord:2,
                    questionId:1,
                    isRight:1  
                },
                {
                    description:'Marie Curie',
                    ord:0,
                    questionId:1,
                    isRight:0  
                },
                {
                    description:'Isaac Newton',
                    ord:1,
                    questionId:1,
                    isRight:0  
                },
                {
                    description:'Steven Seagal',
                    ord:3,
                    questionId:1,
                    isRight:0 
                },
            ]
        }
    ]},
    {id:2,name:'Exam2',questions:[

    ]}
]
*/
const generalAPIEndpoint = 'http://localhost:5001/p1-databases/us-central1'
const questionsAPIEndpoint = `${generalAPIEndpoint}/questions-api`
const examsAPIEndpoint = `${generalAPIEndpoint}/exams-api`
let gettingExams = true
axios.get(examsAPIEndpoint)
  .then(function (response) {
    // handle success
    //console.log(response);
    exams = response.data.data
    gettingExams = false
    SetState(()=>{
        console.log('data got')
    })
  })
  .catch(function (error) {
    // handle error
    //console.log(error);
  })
  .then(function () {
    // always executed
  });
let showExamDetails = false
let examForDetails = undefined
/*let enrollmentHolder = valueHolder('')
let nameHolder = valueHolder('')
let lastnameHolder = valueHolder('')
let subjectHolder = selectHolder(0)
let gradeHolder = valueHolder('0')
let subjects = ['Web','Lenguajes de Programación','Sistemas Operativos','Matemáticas Computacionales']
let data = []
let valid = () => /^A[0-9]{8}$/.test(enrollmentHolder.value) && /\S/.test(nameHolder.value) && /\S/.test(lastnameHolder.value) && (/^[1-9][0-9]*$/.test(gradeHolder.value)||/^0$/.test(gradeHolder.value))&&0<=Number(gradeHolder.value)&&Number(gradeHolder.value)<=100*/

let addExamButton = ()=>
input({classes:['btn','btn-primary'],type:'button',value:'Agregar',click:()=>{
    Swal.fire({
        title: 'Agregar Examen',
        html: div({
            childrenFunctions:[
                    div({
                        classes:['input-group-prepend'],
                        childrenFunctions:[span({text:'Nombre:',classes:['input-group-text']})]
                    }),
                    bindListenerToHolderBiValue(input({type:'text',arial_label:'Name',aria_describedby:'basic-addon1',classes:['form-control']}),examNameHolder,'input'),
            ],
            classes:['input-group','mb-3']
        })(),
        confirmButtonText: 'Agregar',
        showCancelButton: true,
        allowOutsideClick:false,
        cancelButtonText: 'Cancelar'
    }).then(result=>{
        if(result.dismiss!='cancel'){
            let examName = examNameHolder.value
            examNameHolder.setValue('')
            if(!/\S/.test(examName)){
                alert('El nombre del examen no puede estar vacío')
                return; 
            }
            axios.post(examsAPIEndpoint, {
                name:examName,
            }).catch(error=>{
                alert(error.result)
            }).then(response=>{
                //console.log(`response.data.id: ${response.data.id}`)
                exams.push({id:response.data.id,name:examName})
                //console.log(exams.length)
                SetState(()=>{
                    alert(response.data.result)
                })
            })
        }
    })
}})
let QdescriptionHolder = valueHolder('')
let Qtype = selectHolder(0)
const questionTypes = [
    {showName:'Opción Multiple',name:'mult'},
    {showName:'Selección Multiple',name:'sele'},
    {showName:'Abierta',name:'open'}
]
let addQuestionButton = ()=>
input({classes:['btn','btn-primary'],type:'button',value:'Agregar Pregunta',click:()=>{
    Swal.fire({
        title: 'Agregar Pregunta',
        html: div({
            childrenFunctions:[
                    div({
                        classes:['input-group-prepend'],
                        childrenFunctions:[span({text:'Descripción: ',classes:['input-group-text']})]
                    }),
                    bindListenerToHolderBiValue(input({type:'text',arial_label:'Description',aria_describedby:'basic-addon1',classes:['form-control']}),QdescriptionHolder,'input'),
                    div({
                        classes:['input-group-prepend'],
                        childrenFunctions:[span({text:'Tipo: ',classes:['input-group-text']})]
                    }),
                    bindChangeListenerToHolderBiIndex(select({
                        childrenFunctions: questionTypes.map(questionType=>option({text:questionType.showName})),
                        classes:['form-select']
                    }),Qtype),
            ],
            classes:['input-group','mb-3']
        })(),
        confirmButtonText: 'Agregar',
        showCancelButton: true,
        allowOutsideClick:false,
        cancelButtonText: 'Cancelar'
    }).then(result=>{
        if(result.dismiss!='cancel'){
            let questionDescription = QdescriptionHolder.value
            QdescriptionHolder.setValue('')
            if(!/\S/.test(questionDescription)){
                alert('La descripción no puede estar vacía')
                return; 
            }
            console.log(`Qtype.index ${Qtype.index}`)
            const type = questionTypes[Qtype.index].name
            axios.post(questionsAPIEndpoint, {
                description:questionDescription
            },
            {
                params: {
                    examId: examForDetails.id,
                    type
                }
            }
            ).catch(error=>{
                alert(error.result)
            }).then(response=>{
                //console.log(`response.data.id: ${response.data.id}`)
                console.log(`response: ${JSON.stringify(response)}`)
                examForDetails.questions.push({id:response.data.id,description: questionDescription,type})
                //console.log(exams.length)
                SetState(()=>{
                    alert(response.data.result)
                })
            })
        }
    })
}})
let main = ()=> {
    //({element,childrenFunctions})
    console.log('main called')
    let detailsDiv = div()()
    setChildren({
        element: body,
        childrenFunctions: [
            !showExamDetails ?
                div({childrenFunctions:[
                    h1({text:'Exámenes'}),
                    gettingExams ? 
                        div({classes:['spinner-border','text-primary'],role:'status',childrenFunctions:[
                            span({classes:['sr-only'],text:'Loading...'})
                        ]}) :
                        addExamButton(),
                        ...exams.map((exam,index)=>
                            div({childrenFunctions:[  
                                span({text:exam.name,click:()=>{
                                    ///get questions if not downloaded
                                    const switchToExamDetails = ()=>{
                                        showExamDetails = true
                                        examForDetails = exams[index]
                                        SetState(()=>{})
                                    }
                                    if(!exam.questions){
                                        console.log('going to get questions')
                                        axios.get(questionsAPIEndpoint,{
                                            params:{
                                                examId:exam.id
                                            }
                                        }).catch(error=>{
                                            alert(error.result)
                                        }).then(response=>{
                                            console.log(response)
                                            exam.questions = response.data.data
                                            //alert(response.data.result)
                                            switchToExamDetails()
                                        })
                                    }
                                    else
                                        switchToExamDetails()
                                }}),
                                input({classes:['btn','btn-primary'],type:'button',value:'Borrar',click:()=>{
                                    Swal.fire({
                                        title: `¿Estás seguro de borrar el Examen ${exam.name}?`,
                                        icon:'error',
                                        confirmButtonText:'Borrar',
                                        showCancelButton: true,
                                        allowOutsideClick:false,
                                        cancelButtonText: 'Cancelar'
                                    }).then(result=>{
                                        if(result.dismiss!='cancel'){
                                            axios.delete(examsAPIEndpoint,{
                                                params:{
                                                    id: exam.id
                                                }
                                            }).catch(error=>{
                                                alert(error.result)
                                            }).then(response=>{
                                                exams.splice(index,1)
                                                SetState(()=>{
                                                    alert(response.data.result)
                                                })
                                            })
                                                
                                        }
                                    })   
                                }})
                            ]}),
                        )
                 ]})
            :
                ()=>setChildren({element:detailsDiv,childrenFunctions:[
                    input({classes:['btn','btn-primary'],type:'button',value:'Back',click:()=>{
                        showExamDetails = false
                        examForDetails = undefined
                        SetState(()=>{})
                    }}),
                    h2({text:examForDetails.name}),
                    addQuestionButton(),
                    ...examForDetails.questions.map(question=>
                        Collapsable(
                            questionTypes,
                            examForDetails.questions,
                            question
                        )(detailsDiv),
                    ),
                        
               ]}),
               /*script({src:'https://code.jquery.com/jquery-3.2.1.slim.min.js',integrity:'sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN',crossorigin:'anonymous'}),
               script({src:'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',integrity:'sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q',crossorigin:'anonymous'}),
               script({src:'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',integrity:'sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl',crossorigin:'anonymous'})*/      
        ]        
    })
}

addEventListener('DOMContentLoaded',SetState(()=>{}))
