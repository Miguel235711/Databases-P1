import {setChildren} from './js/transformers/ref.js'


import div from './js/tags/div.js'
import span from './js/tags/span.js'
import input from './js/tags/input.js'
import table from './js/tags/table.js'
import select from './js/tags/select.js'
import option from './js/tags/option.js'
import {withChildrenF} from './js/transformers/ref.js'
import {valueHolder,selectHolder,bindChangeListenerToHolderBiIndex,bindListenerToHolderBiValue} from './js/binding/bind.js'
import form from './js/tags/form.js'

import Component from './src/Component/Component.js'


let SetState = (callback)=>{
    console.log('SetState')
    main()
    callback()
}

let body = document.querySelector('body')
let enrollmentHolder = valueHolder('')
let nameHolder = valueHolder('')
let lastnameHolder = valueHolder('')
let subjectHolder = selectHolder(0)
let gradeHolder = valueHolder('0')
let subjects = ['Web','Lenguajes de Programación','Sistemas Operativos','Matemáticas Computacionales']
let data = []
let valid = () => /^A[0-9]{8}$/.test(enrollmentHolder.value) && /\S/.test(nameHolder.value) && /\S/.test(lastnameHolder.value) && (/^[1-9][0-9]*$/.test(gradeHolder.value)||/^0$/.test(gradeHolder.value))&&0<=Number(gradeHolder.value)&&Number(gradeHolder.value)<=100

let main = ()=> {
    //({element,childrenFunctions})
    console.log('main called')
    
    setChildren({
        element: body,
        childrenFunctions: [
            /*div({
                childrenFunctions:[
                    div({
                        classes:['input-group-prepend'],
                        childrenFunctions:[span({text:'Temperatura:',classes:['input-group-text']})]
                    }),
                    bindListenerToHolderBiValue(input({type:'number',arial_label:'Temperature',aria_describedby:'basic-addon1',classes:['form-control']}),temperatureHolder,'input'),
                ],
                classes:['input-group mb-3']
            }),
            div({childrenFunctions:[
                div({
                    classes:['input-group-prepend'],
                    childrenFunctions:[span({text:'Escalas: ',classes:['input-group-text']})]
                }),
                bindChangeListenerToHolderBiIndex(select({
                    childrenFunctions:[
                        ...scale.map(sc=>option({text:sc}))
                    ],
                    classes:['form-select'],
                    aria_label:'Default select example'
                }),lSelectHolder,{interceptorFunction:(index)=>{ 
                    console.log('what')
                    console.log(`before rIndex: ${rSelectHolder.index} lIndex: ${lSelectHolder.index}`)
                    if(index == rSelectHolder.index){
                        //console.log('damn')
                        rSelectHolder.setIndex(index == 0 ? 1 : 0);
                    }
                    console.log(`after rIndex: ${rSelectHolder.index} lIndex: ${index}`)
                    return index
                }}),
                bindChangeListenerToHolderBiIndex(select({
                    childrenFunctions:[
                        ...scale.map(sc=>option({text:sc}))
                    ],
                    classes:['form-select'],
                    aria_label:'Default select example'
                }),rSelectHolder,{interceptorFunction:(index)=>{ 
                    console.log(`before lIndex: ${lSelectHolder.index} rIndex: ${index}`)
                    if(index == lSelectHolder.index)
                        lSelectHolder.setIndex(index == 0 ? 1 : 0);
                    console.log(`after lIndex: ${lSelectHolder.index} rIndex: ${index}`)
                    return index
                }}),
            ]}),*/
            table({
                headerContentFunction:()=>['Matrícula','Nombre(s)','Apellidos','Asignatura','Calificación'],
                bodyContentFunction:()=>data,
                border:'1px solid black'
            }),
            form({childrenFunctions:[
                div({
                    childrenFunctions:[
                        div({
                            classes:['input-group-prepend'],
                            childrenFunctions:[span({text:'Matrícula:',classes:['input-group-text']})]
                        }),
                        bindListenerToHolderBiValue(input({type:'text',arial_label:'Enrollment',aria_describedby:'basic-addon1',classes:['form-control']}),enrollmentHolder,'input'),
                    ],
                    classes:['input-group','mb-3']
                }),
                div({
                    childrenFunctions:[
                        div({
                            classes:['input-group-prepend'],
                            childrenFunctions:[span({text:'Nombre(s):',classes:['input-group-text']})]
                        }),
                        bindListenerToHolderBiValue(input({type:'text',arial_label:'Name(s)',aria_describedby:'basic-addon1',classes:['form-control']}),nameHolder,'input'),
                    ],
                    classes:['input-group','mb-3']
                }),
                div({
                    childrenFunctions:[
                        div({
                            classes:['input-group-prepend'],
                            childrenFunctions:[span({text:'Apellidos:',classes:['input-group-text']})]
                        }),
                        bindListenerToHolderBiValue(input({type:'text',arial_label:'Enrollment',aria_describedby:'basic-addon1',classes:['form-control']}),lastnameHolder,'input'),
                    ],
                    classes:['input-group','mb-3']
                }),
                ///select subject
                div({
                    childrenFunctions:[
                        div({
                            classes:['input-group-prepend'],
                            childrenFunctions:[span({text:'Asignatura:',classes:['input-group-text']})]
                        }),
                        bindChangeListenerToHolderBiIndex(select({
                            childrenFunctions:[
                                ...subjects.map(sc=>option({text:sc}))
                            ],
                            classes:['form-select'],
                            aria_label:'Default select example'
                        }),subjectHolder,{interceptorFunction:(index)=>{ 
                            return index
                        }}),
                    ],
                    classes:['input-group','mb-3']
                }),
                div({
                    childrenFunctions:[
                        div({
                            classes:['input-group-prepend'],
                            childrenFunctions:[span({text:'Calificación:',classes:['input-group-text']})]
                        }),
                        bindListenerToHolderBiValue(input({type:'number',arial_label:'Enrollment',aria_describedby:'basic-addon1',classes:['form-control'],min:'0',max:'100'}),gradeHolder,'input'),
                    ],
                    classes:['input-group','mb-3']
                }),
                input({classes:['btn','btn-primary'],type:'button',value:'Limpiar',click:()=>{
                    enrollmentHolder.setValue('')
                    nameHolder.setValue('')
                    lastnameHolder.setValue('')
                    subjectHolder.setIndex(0)
                    gradeHolder.setValue(0)
                    SetState(()=>{
                    
                    })
                }}),
                input({classes:['btn','btn-primary'],type:'button',value:'Agregar',click:()=>{
                    //nameHolder.setValue('')
                    //console.log(`temperature: ${temperatureHolder.value}`)
                    if(!valid()){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en los campos',
                            text: 'Los campos no deben estar vacíos y deben seguir el formato adecuado'
                        }).then(result=>{
                            console.log('result')
                        })
                        return;
                    }
                    SetState(()=>{
                        data.push([enrollmentHolder.value,nameHolder.value,lastnameHolder.value,subjects[subjectHolder.index],gradeHolder.value])
                    })
                }}),
            ]})
            /*input({classes:['btn','btn-primary'],type:'button',value:'Convertir',click:()=>{
                //nameHolder.setValue('')
                //console.log(`temperature: ${temperatureHolder.value}`)
                if(!valid()){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en los campos',
                        text: 'Los campos no deben estar vacíos y debes seleccionar las unidades a convertir'
                    }).then(result=>{
                        console.log('result')
                    })
                    return;
                }
                console.log('indexL',lSelectHolder.index)
                console.log('indexR',rSelectHolder.index)
                SetState(()=>{
                   
                })()
            }}),
            valid() ? 
                div({childrenFunctions:[
                    div({text:`Temperatura convertida: ${temperatureCalc(scale[lSelectHolder.index],scale[rSelectHolder.index],Number(temperatureHolder.value))}`}),
                ]}):div()*/
        ]        
    })
}

addEventListener('DOMContentLoaded',SetState(()=>{}))
