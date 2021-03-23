import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,childrenFunctions,role}={},) => {
    let _div = tag('div',{classes:classes,id:id,text:text,click:click,role:role})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_div,childrenFunctions:childrenFunctions}):_div
}
        