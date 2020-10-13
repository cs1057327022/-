import service from '../utils/request'

export function getpatient(data){
    if(data){
        return service({
            url:'/usertable',
            method:'post',
            data
        })
    }else{
        return service({
            url:'/usertable',
            method:'post'
        })
    }
    
}

export function removeruser(data){
    return service({
        url:'/removeuser',
        method:'post',
        data
    })
}

export function serchuser(data){
    return service({
        url:'/searchuser',
        method:'post',
        data
    })
}