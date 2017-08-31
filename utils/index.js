export function getQueryFromUrladdress(url) {
    var query = {};
    if (url.indexOf('?') == -1) {
        return query;
    }
    var queryStr = url.slice(url.indexOf("?") + 1);
    var queryArr = queryStr.split("&");
    for (var i = 0; i < queryArr.length; i++) {
        var _qArr = queryArr[i].split("=");
        query[_qArr[0]] = decodeURI(_qArr[1]);
    }
    return query;
};
var tabDetail = {
    tab1: {
        name: '区域'
    },
    tab2: {
        name: '总价',
        data: [
            {name:'不限',checked: false},
            {name:'200万以下',checked: false},
            {name:'200万~300万',checked: false},
            {name:'300万~400万',checked: false},
            {name:'400万~500万',checked: false},
            {name:'500万~600万',checked: false},
            {name:'600万以上',checked: false}
        ]
    },
    tab3: {
        name: '户型',
        data: [
            {name:'不限',checked: false},
            {name:'1室',checked: false},
            {name:'2室',checked: false},
            {name:'3室',checked: false},
            {name:'4室',checked: false},
            {name:'5室',checked: false},
            {name:'5室以上',checked: false}
        ]
    },
    tab4: {
        name: '面积',
        data: [
            {name:'不限',checked: false},
            {name:'50㎡以下',checked: false},
            {name:'50~70㎡',checked: false},
            {name:'70~90㎡',checked: false},
            {name:'90~110㎡',checked: false},
            {name:'110~130㎡',checked: false},
            {name:'130~150㎡',checked: false},
            {name:'150㎡以上',checked: false}
        ]
    }
}
export { tabDetail }