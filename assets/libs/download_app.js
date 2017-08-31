export function download_app() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/iphone/i)=="iphone" || ua.match(/ipad/i)=="ipad"){    //iOS下载链接
		location.href="https://itunes.apple.com/app/apple-store/id1054902876?pt=117855253&ct=weixin&mt=8";  
	}else {   //安卓下载链接  
		location.href="http://apk.2boss.cn/public/tuboshi.apk";
	}
}