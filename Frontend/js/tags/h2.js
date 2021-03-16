import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,childrenFunctions}={},) => {
    let _h2 = tag('h2',{classes:classes,id:id,text:text,click:click})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_h2,childrenFunctions:childrenFunctions}):_h2
}