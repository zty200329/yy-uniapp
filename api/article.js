import request from '../utils/request';

export function getAllArticleList(){
    return request({
        url: '/article/getAllArticleList',
        method: 'GET'
    })
}

export function getTopArticleList(){
    return request({
        url: '/article/getTopArticleList',
        method: 'GET'
    })
}

export function getArticleDetail(params){
    return request({
        url: '/article/getArticleDetail',
        method: 'GET',
        data:params
    })
}


