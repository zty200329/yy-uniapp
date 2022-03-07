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
