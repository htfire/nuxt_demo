import fetch from '../utils/fetch';

export function weixin(query) {
    return fetch({
        url: 'https://ta.2boss.cn/user/weixin',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            return data
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function recordUserAccessInfo(query) {
    return fetch({
        url: 'estimate/customer/event/recordUserAccessInfo',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            return JSON.stringify(data);
        }],
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function SendSMS(query) {
    return fetch({
        url: 'api/v1/sms/SendSMS',
        method: 'get',
        params: query
    });
}