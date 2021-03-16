///add to framework
import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,childrenFunctions}={},) => {
    let _p = tag('p',{classes:classes,id:id,text:text,click:click})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_p,childrenFunctions:childrenFunctions}):_p
}
        