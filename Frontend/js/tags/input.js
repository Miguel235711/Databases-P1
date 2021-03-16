import tag from './tag.js'

///TODO: Chagen in framework

export default ({classes,id,type,placeholder,name,value,click,aria_label,aria_describedby,min,max}={}) => ()=>{
    let _input = tag('input',{classes:classes,id:id,click:click})()
    if(type)
        _input.setAttribute('type',type)
    if(placeholder)
        _input.setAttribute('placeholder',placeholder)
    if(name)
        _input.setAttribute('name',name)
    if(value)
        _input.setAttribute('value',value)
    if(aria_label)
        _input.setAttribute('arial-label',aria_label)
    if(aria_describedby)
        _input.setAttribute('aria-describedby',aria_describedby)
    if(min)
        _input.setAttribute('min',min)
    if(max)
        _input.setAttribute('max',max)
    return _input
}