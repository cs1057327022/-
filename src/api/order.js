import service from '../utils/request'

export function getOrders(){
    return service({
        url:'/ord',
        method:'post'
    })
}

export function updateOrders(data){
    return service({
        url:"/updateord",
        method:'post',
        data
    })
}