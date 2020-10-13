import service from '../utils/request'

export function getarticle(data){
    if(data){
        return service({
            url:"/article",
            method:'post',
            data
        })
    }else{
        return service({
            url:"/article",
            method:'post'
        })
    }
    
}

export function addarticle(data){
    return service({
        url:'/addarticle',
        method:'post',
        data
    })
}

export function removearticle(data){
    return service({
        url:'/removearticle',
        method:'post',
        data
    })
}