import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,childrenFunctions,style}={},) => {
    let _div = tag('span',{classes:classes,id:id,text:text,click:click,style:style})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_div,childrenFunctions:childrenFunctions}):_div
}