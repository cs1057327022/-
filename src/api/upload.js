import service from '../utils/request'

export function upload(data){
    return service({
        url:'/upload',
        method:'post',
        data
    })
}