import service from '../utils/request'

export function gethospital(data){
    if(data){
        return service({
            url:"/hospital",
            method:'post',
            data
        })
    }else{
        return service({
            url:"/hospital",
            method:'post'
        })
    }
    
}

export function addhospital(data){
    return service({
        url:'/addhospital',
        method:'post',
        data
    })
}

export function removehospital(data){
    return service({
        url:'/removehospital',
        method:'post',
        data
    })
}