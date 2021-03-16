import tag from './tag.js'

export default ({classes,id,name,cols,rows}={}) => ()=>{
    let _textarea = tag('textarea',{classes:classes,id:id})()
    if(name)
        _textarea.setAttribute('name',name)
    if(cols)
        _textarea.setAttribute('cols',cols)
    if(rows)
        _textarea.setAttribute('name',rows)
    return _textarea
}