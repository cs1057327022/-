import service from '../utils/request'


export function getYear(data){
    return service({
        url:'/year',
        method:'post',
        data
    })
}

export function getYearDoctor(data){
    return service({
        url:'/yeardoctor',
        method:'post',
        data
    })
}