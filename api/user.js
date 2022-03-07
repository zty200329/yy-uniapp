import request from '../utils/request';

export function login(params) {
	return request({
		url: '/anon/weChatLogin',
		method: 'POST',
		data: params
	})
}

export function getUserInfo() {
	return request({
		url: '/user/info',
		method: 'GET'
	})
}

export function updateUserInfo(params){
	return request({
		url: '/user/updateUserInfo',
		method: 'POST',
		data: params
	})
}