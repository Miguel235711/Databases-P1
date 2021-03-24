import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,src,childrenFunctions}={},) => {
    let _img = tag('img',{classes:classes,id:id,text:text,click:click,src:src})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_img,childrenFunctions:childrenFunctions}):_img
}
        