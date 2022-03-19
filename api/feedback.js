import request from '../utils/request';

export function getAllFeedback(){
    return request({
        url: '/feedback/getAllFeedback',
        method: 'GET'
    })
}

export function getFeedbackDetailsById(params) {
    return request({
        url: '/feedback/getFeedbackDetailsById',
        method: 'GET',
        data: params
    })
}

export function addFeedback(params) {
    return request({
        url: '/feedback/addFeedback',
        method: 'POST',
        data: params
    })
}
