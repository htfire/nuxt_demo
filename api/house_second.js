import fetch from '../utils/fetch';

export function getHouseDetailHead(query) {
    return fetch({
        url: 'house/getHouseDetailHead',
        method: 'get',
        params: query
    });
}

export function getHouseTopareaInfo(query) {
    return fetch({
        url: 'rabbit/v1/house/getHouseTopareaInfo',
        method: 'get',
        params: query
    });
}

export function getHouseTrend(query) {
    return fetch({
        url: 'rabbit/v1/house/getHouseTrend',
        method: 'get',
        params: query
    });
}

export function getHouseSalesRoomList4Top5(query) {
    return fetch({
        url: 'superior/v1/estate/getHouseSalesRoomList4Top5',
        method: 'get',
        params: query
    });
}

export function getHouseBargainsByAgentInfo(query) {
    return fetch({
        url: 'rabbit/v1/house/getHouseBargainsByAgentInfo',
        method: 'get',
        params: query
    });
}

export function getHouseSalesRandOfPlate(query) {
    return fetch({
        url: 'rabbit/v1/house/getHouseSalesRandOfPlate',
        method: 'get',
        params: query
    });
}

export function getHouseTotalpriceRecommend(query) {
    return fetch({
        url: 'house/getHouseTotalpriceRecommend',
        method: 'get',
        params: query
    });
}

export function getHousePlateRecommend(query) {
    return fetch({
        url: 'house/getHousePlateRecommend',
        method: 'get',
        params: query
    });
}

export function getHouseTrend2Info(query) {
    return fetch({
        url: 'rabbit/v1/house/getHouseTrend2Info',
        method: 'get',
        params: query
    });
}

export function getHouseBargainsByRoomInfo(query) {
    return fetch({
        url: 'rabbit/v1/house/getHouseBargainsByRoomInfo',
        method: 'get',
        params: query
    });
}

export function getVillageInfo(query) {
    return fetch({
        url: 'rabbit/V1/house/getVillageInfo',
        method: 'get',
        params: query
    });
}

export function getCommentsForHouse2(query) {
    return fetch({
        url: 'estimate/houseComment/getCommentsForHouse2',
        method: 'get',
        params: query
    });
}

export function getHouseTimeline(query) {
    return fetch({
        url: 'house/getHouseTimeline',
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