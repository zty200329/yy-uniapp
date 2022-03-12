import request from '../utils/request';

export function submitTravelApplication(params) {
    return request({
        url: '/travel/submitTravelApplication',
        method: 'POST',
        data: params
    })
}

export function getTravelApply(){
    return request({
        url: '/travel/getTravelApply',
        method: 'GET'
    })
}

export function getTravelApplyInfoById(params){
    return request({
        url: '/travel/getTravelApplyInfoById',
        method: 'GET',
        data: params
    })
}

export function updateTravelApplyStatus(params) {
    return request({
        url: '/travel/updateTravelApplyStatus',
        method: 'POST',
        data: params
    })
}

export function sendMessageToUser(params) {
    return request({
        url: '/travel/sendMessageToUser',
        method: 'POST',
        data: params
    })
}

