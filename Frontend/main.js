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
const examsAPIEndpoint = 'http://localhost:5001/p1-databases/us-central1/exams-api'
axios.get(examsAPIEndpoint)
  .then(function (response) {
    // handle success
    //console.log(response);
    exams = response.data.data
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

let main = ()=> {
    //({element,childrenFunctions})
    console.log('main called')
    let detailsDiv = div()()
    setChildren({
        element: body,
        childrenFunctions: [
            h1({text:'Exámenes'}),
            !showExamDetails ?
                div({childrenFunctions:
                    exams.map((exam,index)=>
                        div({childrenFunctions:[  
                            span({text:exam.name,click:()=>{
                                showExamDetails = true
                                examForDetails = exams[index]
                                SetState(()=>{})
                            }}),
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
                                            alert('Error al agregar')
                                        }).then(result=>{
                                            exams.splice(index+1,0,{id:exams.length+1,name:examName})
                                            console.log(exams.length)
                                            SetState(()=>{
                                                alert('Examen agregado')
                                            })
                                        })
                                    }
                                })
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
                                            alert('¡Borrado falló!')
                                        }).then(result=>{
                                            exams.splice(index,1)
                                            SetState(()=>{
                                                alert('¡Borrado exitoso!')
                                            })
                                        })
                                            
                                    }
                                })   
                            }})
                        ]}),
                    )
                })
            :
                ()=>setChildren({element:detailsDiv,childrenFunctions:[
                    input({classes:['btn','btn-primary'],type:'button',value:'Back',click:()=>{
                        showExamDetails = false
                        examForDetails = undefined
                        SetState(()=>{})
                    }}),
                    h2({text:examForDetails.name}),
                    ...examForDetails.questions.map(question=>
                        Collapsable(
                            [
                                {showName:'Opción Multiple',name:'mult'},
                                {showName:'Selección Multiple',name:'sele'},
                                {showName:'Abierta',name:'open'}
                            ],
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
