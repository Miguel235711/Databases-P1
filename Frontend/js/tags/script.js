let script = ({src}={}) =>{
    let _script = document.createElement('script')
    if(src)
        _script.setAttribute('src',src)
    return _script
}