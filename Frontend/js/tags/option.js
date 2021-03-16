import tag from './tag.js'

export default ({classes,id,value,selected,text}={}) => ()=>{
    let _option = tag('option',{classes:classes,id:id,text:text})()
    if(value)
        _option.setAttribute('name',value)
    if(selected)
        _option.setAttribute('selected',selected)
    return _option
}