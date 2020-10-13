import service from '../utils/request'

export function getdoctorlimt(data){
    return service({
        url:"/doctorlimt",
        method:'post',
        data
    })
}