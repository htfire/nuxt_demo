//获取微信配置
var getWechatShareConfigInfo = function(shareUrl, callback){
    var _url = "https://ta.2boss.cn/user/weixin";
    var _xhr = new XMLHttpRequest();

    _xhr.onload = function() {
        if (_xhr.status.toString().substr(0, 1) == '2' || _xhr.status.toString().substr(0, 1) == '3') {
            if((typeof _xhr.response) === "string" ){
                callback(null, JSON.parse(_xhr.response));
            }else {
                callback(null, _xhr.response);
            }
        } else if (_xhr.status.toString().substr(0, 1) == '4' || _xhr.status.toString().substr(0, 1) == '5') {
            if((typeof _xhr.response) === "string" ){
                callback(true, JSON.parse(_xhr.response));
            }else {
                callback(true, _xhr.response);
            }
        }
    };

    _xhr.open("POST", _url, true);
    _xhr.responseType = "json";
    _xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    _xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    var _formData = "url=" + encodeURIComponent(shareUrl);
    _xhr.send(_formData);
};
// import { weixin } from '../../api/common'

function setShareInfoForWechat(sharPage, shareUrl, query){
    getWechatShareConfigInfo(shareUrl, function(error, response){
        if(error){
            console.log(JSON.stringify(response));
            return
        };
        wx.config({
            debug: false,
            appId: response.appId,
            timestamp: response.timestamp,
            nonceStr: response.nonceStr,
            signature: response.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ'
                // 所有要调用的 API 都要加到这个列表中
            ]
        }); 
        if(sharPage == 'index') {
            wx.ready(function () {
                //分享到微信
                wx.onMenuShareAppMessage({
                    title: "兔博士估价",
                    desc: "房源估价，兔博士超快超准超方便。新房二手房，一键便知。更多超赞功能，赶紧点开体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl,
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: "兔博士估价",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title: "兔博士估价",
                    desc: "房源估价，兔博士超快超准超方便。新房二手房，一键便知。更多超赞功能，赶紧点开体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
            });
        }else if(sharPage == 'estimateDetail'){
            wx.ready(function () {
                //分享到微信
                wx.onMenuShareAppMessage({
                    title: "兔博士-为你评估“"+query.houseName+"”",
                    desc: "房源估价，兔博士超快超准超方便。新房二手房，一键便知。更多超赞功能，赶紧点开体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl,
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: "兔博士-为你评估“"+query.houseName,
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title: "兔博士-为你评估“"+query.houseName,
                    desc: "房源估价，兔博士超快超准超方便。新房二手房，一键便知。更多超赞功能，赶紧点开体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
            });
        }else if(sharPage == 'house_second') {
            wx.ready(function () {
                //分享到微信
                wx.onMenuShareAppMessage({
                    title: "兔博士-看"+query.houseName+"房价",
                    desc: "透明房价，兔博士为你坚持到底。新房二手房，一键便知。更多超赞功能，赶紧点开体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl,
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: "兔博士-看"+query.houseName+"房价",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title: "兔博士-看"+query.houseName+"房价",
                    desc: "透明房价，兔博士为你坚持到底。新房二手房，一键便知。更多超赞功能，赶紧点开体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
            });
        }else {
            wx.ready(function () {
                //分享到微信
                wx.onMenuShareAppMessage({
                    title: "兔博士-岂止是超好的查房价",
                    desc: "超赞的查房价神器。热门城市新房二手房，一键便知。赶紧体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl,
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: "兔博士-岂止是超好的查房价",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title: "兔博士-岂止是超好的查房价",
                    desc: "超赞的查房价神器。热门城市新房二手房，一键便知。赶紧体验吧。",
                    imgUrl: "https://share.2boss.cn/images/sharelogo.png",
                    link: shareUrl
                });
            });
        }               
    });
};

export default setShareInfoForWechat;