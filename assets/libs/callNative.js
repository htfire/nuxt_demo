 function getNativeCall(){
 	try {
 		function connectWebViewJavascriptBridge(callback) {
 			if (window.WebViewJavascriptBridge) {
 				callback(WebViewJavascriptBridgeReady)
 			} else {
 				document.addEventListener(
 					'WebViewJavascriptBridgeReady'
 					, function() {
 						callback(WebViewJavascriptBridge)
 					},false);
 			}
 		};
    function setupWebViewJavascriptBridge (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    };
        //andriod
        connectWebViewJavascriptBridge(function(bridge) {
        	bridge.init(function(message, responseCallback) {
        		alert('JS got a message', message);
        		var data = {
        			'picData': '测试中文!'
        		};
        		console.log('JS responding with', data);
        		responseCallback(data);
        	});
        });
        setupWebViewJavascriptBridge(function(bridge) {

        })
    }catch(err) {
		//在此处理错误
		console.log("callHandler err")
	}
}

export default getNativeCall;
