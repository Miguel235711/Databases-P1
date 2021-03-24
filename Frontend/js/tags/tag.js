import {setClasses,setId} from '../transformers/ref.js'

export default (tagName,{classes,id,text,click,value,border,href,data_toggle,role,aria_expanded,aria_controls,type,data_target,src}={}) => () =>{
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
    if(data_toggle)
        _tag.setAttribute('data-toggle',data_toggle)
    if(href)
        _tag.setAttribute('href',href)
    if(role)
        _tag.setAttribute('role',role)
    if(aria_expanded)
        _tag.setAttribute('aria-expanded',aria_expanded)
    if(aria_controls)
        _tag.setAttribute('aria-controls',aria_controls)
    if(type)
        _tag.setAttribute('type',type)
    if(data_target)
        _tag.setAttribute('data-target',data_target)
    if(src)
        _tag.setAttribute('src',src)
    return _tag
}