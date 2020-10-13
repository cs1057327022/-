import service from '../utils/request'


export function getcalendar(data){
    if(data==undefined){
        return service({
            url:"/calendar",
            method:'post'
        })
    }else{
        return service({
            url:"/calendar",
            method:'post',
            data
        })
    }
    
}