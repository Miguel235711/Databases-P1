///0-9,A-Z,a-z

let getRandomX = x => ///generate from [0 to x)
    Math.floor(Math.random() * x)

let xToC = (x) =>{
    let v = 0
    if(-1<x&& x<10)
        v = x+'0'.charCodeAt(0)
    if(9<x&&x<36)
        v = x-10+'A'.charCodeAt(0)
    if(35<x&&x<62)
        v = x-36+'a'.charCodeAt(0)
    return String.fromCharCode(v)
}

let getRandomStringId = (n)=>{
    let s = []
    for(let i = 0 ; i < n ; i ++)
        s.push(getRandomX(62))
    return s.map(x=>xToC(x)).join('')
}
let getRandomStateId = ()=>{
    return getRandomStringId(8)
}

/*if(!module.parent){
    //debugging
    for(i = 0 ; i < 10 ; i ++)
        console.log(getRandomX(62))
    for(i = 0 ; i < 62 ; i ++)
        console.log(xToC(i))
    for(i = 0 ; i < 10 ; i ++)
        console.log(getRandomStateId())
}*/
export {getRandomStateId}
