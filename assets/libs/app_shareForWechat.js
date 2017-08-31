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
function setShareInfoForWechat(shareUrl, query){

    getWechatShareConfigInfo(shareUrl, function(error, response){
        // alert(shareUrl)        
        // alert(JSON.stringify(response));
        // alert(JSON.stringify(query));
        console.log(shareUrl)
        console.log(JSON.stringify(query))
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
        wx.ready(function () {
            //分享到微信
            wx.onMenuShareAppMessage({
                title: query.title,
                desc: query.content,
                imgUrl: query.imgUrl,
                link: shareUrl,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: query.title,
                imgUrl: query.imgUrl,
                link: shareUrl
            });
            //分享到QQ
            wx.onMenuShareQQ({
                title: query.title,
                desc: query.content,
                imgUrl: query.imgUrl,
                link: shareUrl
            });
        });
                    

    });
};

export default setShareInfoForWechat;