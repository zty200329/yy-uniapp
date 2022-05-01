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

export function addDiseaseInfo(params) {
    return request({
        url: '/travel/addDiseaseInfo',
        method: 'POST',
        data: params
    })
}

export function submitMedicalApply(params) {
    return request({
        url: '/travel/submitMedicalApply',
        method: 'POST',
        data: params
    })
}

export function getMyMedicalApply(params){
    return request({
        url: '/travel/getMyMedicalApply',
        method: 'GET',
    })
}

export function getMedicalApplyById(params){
    return request({
        url: '/travel/getMedicalApplyById',
        method: 'GET',
        data: params
    })
}
