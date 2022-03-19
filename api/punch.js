import request from '../utils/request';

export function getTitleList(){
    return request({
        url: '/punch/getTitleList',
        method: 'GET'
    })
}

export function answerTheQuestion(params) {
    return request({
        url: '/punch/answerTheQuestion',
        method: 'POST',
        data: params
    })
}

export function getLatitudeAndLongitude(params) {
    return request({
        url: '/punch/getLatitudeAndLongitude',
        method: 'GET',
        data: params
    })
}
