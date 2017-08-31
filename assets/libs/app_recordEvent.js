import axios from 'axios'
export function recordEvent(eventId,paramValue,type,customerId,userId) {
	var user_id;
	try{
		user_id = localStorage.getItem("tbs_userId");
		if(user_id==null)  {
			user_id = 0;
		}
	}catch(err) {
		console.log(err)
		user_id = 0;
	}

	let {attrtxt} = formatEvent(paramValue);

	recordUserAccessInfo(eventId, attrtxt);

	function formatEvent(event_value) {
		event_value.userId = type=='app'?userId:0;
		event_value.customerId = type=='app'?customerId:user_id;
		event_value.appName =  4;
		event_value.appId = 4;
		event_value.chanelName = type=='app'?'APP应用内访问': '外部分享';
		return {'attrtxt':event_value};
	}
	function recordUserAccessInfo(eventId,attrtxt){
		let postData = {
			"userId"   : type=='app'?customerId:user_id,
			"eventId": eventId,
			"attrtxtStr": JSON.stringify(attrtxt)
		};
		axios({
			url: 'estimate/customer/event/recordUserAccessInfo',
			method: 'post',
			data: postData,
			transformRequest: [function (data) {
			  return JSON.stringify(data);
			}],
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		.then(res =>{
		 	// console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
	}
}
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