import request from '../utils/request';

export function getCitys() {
	return request({
		url: '/query/getCitys',
		method: 'GET'
	})
}

export function travelQuery(params) {
	return request({
		url: '/query/travelQuery',
		method: 'GET',
		data: params
	})
}

export function getSegregationByCondition(param) {
	return request({
		url: '/query/getSegregationByCondition',
		method: 'GET',
		data:param
	})
}

export function getAllSegregation(param) {
	return request({
		url: '/query/getAllSegregation',
		method: 'GET'
	})
}
