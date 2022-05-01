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

export function getAllCategory(){
    return request({
        url: '/category/getAllCategory',
        method: 'GET'
    })
}

export function addForum(params) {
    return request({
        url: '/forum/addForum',
        method: 'POST',
        data: params
    })
}

export function getForumListById(params){
    return request({
        url: '/forum/getForumListById',
        method: 'GET',
        data:params
    })
}

export function getForumList(){
    return request({
        url: '/forum/getForumList',
        method: 'GET'
    })
}

export function addComment(params) {
    return request({
        url: '/forum/addComment',
        method: 'POST',
        data: params
    })
}

export function getForumById(params){
    return request({
        url: '/forum/getForumById',
        method: 'GET',
        data:params
    })
}
