// import { recordUserAccessInfo as record, SendSMS } from '~api/common'

// export function recordEvent(eventId, paramValue) {
//   var user_id;
//   try {
//     user_id = localStorage.getItem("tbs_userId");
//   } catch (err) {
//     console.log(err)
//     user_id = null;
//   }
//   let { attrtxt } = formatEvent(paramValue);

//   function formatEvent(event_value) {
//     event_value.userId = 0;
//     event_value.customerId = user_id;
//     event_value.appName = 4;
//     event_value.appId = 4;
//     if (window.chanelName.chanelName == undefined || window.chanelName.chanelName == '') {
//       let ua = window.navigator.userAgent.toLowerCase();
//       if (ua.indexOf("micromessenger") > -1) {
//         event_value.chanelName = '微信内置浏览器';
//       } else if (ua.indexOf("mobile mqqbrowser") > -1) {
//         event_value.chanelName = 'QQ内置浏览器';
//       } else {
//         event_value.chanelName = localStorage.getItem('chanelName');
//       }
//     } else {
//       event_value.chanelName = window.chanelName.chanelName;
//     };
//     return { 'attrtxt': event_value };
//   }
//   function recordUserAccessInfo(eventId, attrtxt) {
//     let params = {
//       "userId": user_id,
//       "eventId": eventId,
//       "attrtxtStr": JSON.stringify(attrtxt)
//     }
//     return record(params)
//   }
//   return recordUserAccessInfo(eventId, attrtxt);
// }
// export function getQueryFromUrladdress(url) {
//   var query = {};
//   if (url.indexOf('?') == -1) {
//     return query;
//   }
//   var queryStr = url.slice(url.indexOf("?") + 1);
//   var queryArr = queryStr.split("&");
//   for (var i = 0; i < queryArr.length; i++) {
//     var _qArr = queryArr[i].split("=");
//     query[_qArr[0]] = decodeURI(_qArr[1]);
//   }
//   return query;
// };

// export function sendMsg(phone, content) {
//   let params = {
//     mobile: phone,
//     content: content,
//     type: 3
//   }
//   SendSMS(params).then(res => {

//   }).catch(err => {
//     console.log(err)
//   });
// };

