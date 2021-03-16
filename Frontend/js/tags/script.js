export default ({src,integrity,crossorigin}={}) =>() =>{
    let _script = document.createElement('script')
    if(src)
        _script.setAttribute('src',src)
    if(integrity)
        _script.setAttribute('integrity',integrity)
    if(crossorigin)
        _script.setAttribute('crossorigin',crossorigin)
    return _script
}