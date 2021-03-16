import {setClasses,setId} from '../transformers/ref.js'

export default (tagName,{classes,id,text,click,value,border}={}) => () =>{
    let _tag = document.createElement(tagName)
    if(classes)
        //(element,classes)
        _tag = setClasses({element:_tag,classes:classes})
    if(id){
        //(element,id)
        _tag = setId({element:_tag,id:id})
    }
    if(text)
        _tag.innerText=text
    if(click)
        _tag.addEventListener("click",click) ///TODO: extend later
    if(value)
        _tag.setAttribute("value",value)
    if(border)
        _tag.setAttribute('border',border)
    return _tag
}