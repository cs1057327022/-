import service from '../utils/request'

export function getdoctoruser(data){
    if(data){
        return service({
            url:'/doctoruser',
            method:'post',
            data
        })
    }else{
        return service({
            url:'/doctoruser',
            method:'post',
        })
    }
    
}


export function searchdoctor(data){
    return service({
        url:'/searchdoctor',
        method:'post',
        data
    })
}

export function doctorregister(data){
    return service({
        url:'/doctorregister',
        method:'post',
        data
    })
}

export function removedoctor(data){
    return service({
        url:'/removedoctor',
        method:'post',
        data
    })
}