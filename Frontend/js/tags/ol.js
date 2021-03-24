import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,childrenFunctions,role}={},) => {
    let _ol = tag('ol',{classes:classes,id:id,text:text,click:click,role:role})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_ol,childrenFunctions:childrenFunctions}):_ol
}
        