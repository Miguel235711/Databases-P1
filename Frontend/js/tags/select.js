import tag from './tag.js'
import {setChildren} from '../../js/transformers/ref.js'

export default ({classes,id,name,value,text,aria_label,childrenFunctions}={}) => ()=>{
    let _select = tag('select',{classes:classes,id:id,value:value,text:text})()
    if(name)
        _select.setAttribute('name',name)
    if(aria_label)
        _select.setAttribute('aria-label',aria_label)
    //console.log('children functions ',childrenFunctions)
    //return _select
    if(childrenFunctions)
        _select = setChildren({element:_select,childrenFunctions:childrenFunctions})
    return _select
}