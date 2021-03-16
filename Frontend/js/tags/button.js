import tag from './tag.js'
import {withChildrenF} from '../../js/transformers/ref.js'

export default ({classes,id,text,click,childrenFunctions,data_toggle,href,role,aria_expanded,aria_controls,type,data_target}={},) => {
    let _button = tag('button',{classes:classes,id:id,text:text,click:click,data_toggle:data_toggle,href:href,role:role,aria_expanded:aria_expanded,aria_controls:aria_controls,type:type,data_target:data_target})
    return childrenFunctions ? 
        withChildrenF({elementFunction:_button,childrenFunctions:childrenFunctions}):_button
}