import fetch from '../utils/fetch';

export function getHeadInfo2NewHouse(query) {
    return fetch({
        url: 'estimate/customer/newHouse/getHeadInfo2NewHouse',
        method: 'get',
        params: query
    });
}

export function getPlateHeader4Search(query) {
    return fetch({
        url: 'estimate/customer/plate/getPlateHeader4Search',
        method: 'get',
        params: query
    });
}

export function recommendStoreList(query) {
    return fetch({
        url: 'rabbit/v1/plate/recommendStoreList',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            return JSON.stringify(data);
        }],
        headers: {
            'Content-Type': 'application/json',
            'ApiVersion': '1'
        }
    });
}

export function getDistrictName(query) {
    return fetch({
        url: 'house/getDistrictName',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function getPlateName(query) {
    return fetch({
        url: 'house/getPlateName',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function getTrafficLineInfo(query) {
    return fetch({
        url: 'user/getTrafficLineInfo',
        method: 'get',
        params: query
    });
}

export function getTrafficLineStation(query) {
    return fetch({
        url: 'user/getTrafficLineStation',
        method: 'get',
        params: query
    });
}

export function estateSearch(query) {
    return fetch({
        url: 'estimate/customer/mobileSite/estateSearch',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            return JSON.stringify(data);
        }],
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function location(query) {
    return fetch({
        url: 'estimate/customer/estimate/location',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function addHousePhoneInfos(query) {
    return fetch({
        url: 'estimate/customer/mobileSite/addHousePhoneInfos',
        method: 'post',
        data: query,
        transformRequest: [function (data) {
            return JSON.stringify(data);
        }],
        headers: {
            'Content-Type': 'application/json',
        }
    });
}