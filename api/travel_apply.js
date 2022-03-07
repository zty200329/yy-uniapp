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
