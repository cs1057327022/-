import service from '../utils/request'

export function getdoctor(){
    return service({
        url:"/doctor",
        method:'post'
    })
}

export function updateDoctors(data){
    return service({
        url:'/doctorupdate',
        method:'post',
        data
    })
}

export function updatefalse(data){
    return service({
        url:'/dupdate',
        method:'post',
        data
    })
}

export function insertDoctor(data){
    return service({
        url:'/doctorinsert',
        method:'post',
        data
    })
}

export function updatestatus(data){
    return service({
        url:'/doctorup',
        method:'post',
        data
    })
}


export function getdoc(data){
    return service({
        url:'/doc',
        method:'post',
        data
    })
}