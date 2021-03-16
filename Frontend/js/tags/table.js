import tag from './tag.js'


///modify in framework

let td = ({classes,id,text,border}={}) => tag('td',{classes:classes,id:id,text:text,border:border}) 
let th = ({classes,id,text,border}={}) => tag('th',{classes:classes,id:id,text:text,border:border}) 

///headerFunction needs to generate the data as []
///contentFunction needs to generate the data as [[],[],...]
export default ({classes,id,headerContentFunction,bodyContentFunction,border}={}) => () => {
    let _table = tag('table',{classes:classes,id:id,border:border})()//TODO: define tag later!!!

    //header creation
    let _thead = (()=>{
        let _thead = tag('thead')()

        let _tr = tag('tr')()
        
        console.log('headerContent: ',headerContentFunction())

        headerContentFunction().forEach(content=>_tr.appendChild(th({text:content,border:border})()))
        _thead.appendChild(_tr)
        return _thead
    })()
    //body creation
    let _tbody =  (()=>{
        let _tbody = tag('tbody')() 
        bodyContentFunction().forEach(row=>{
            let _tr = tag('tr')()
            row.forEach(content=>_tr.appendChild(td({text:content,border:border})()))
            _tbody.appendChild(_tr)
        })
        return _tbody
    })()
    _table.appendChild(_thead)
    _table.appendChild(_tbody)
    return _table
}