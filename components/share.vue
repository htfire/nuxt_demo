<template>
	<div class="share">
		<!--分享-->
		<div class="Dr2Layer" style="position: fixed;" @click="closeDialog"></div>

		<div class="share-content share-content-show" v-show="showAttention">
		    <div class="share-title-contain">
		        <div></div>
		        <div class="share-title">分享到</div>
		    </div>
		    <div class="content-item">
		        <div @click="share('weixin')">
		            <img src="../img/shareWeixin.png"/>
		            <p>微信</p>
		        </div>
		        <div @click="share('weixinFriend')">
		            <img src="../img/shareFriend.png"/>
		            <p>分享到朋友圈</p>
		        </div>
		        <div @click="share('QQ')">
		            <img src="../img/shareQQ.png"/>
		            <p>QQ</p>
		        </div>
		    </div>
		    <div @click="closeDialog" class="cancel-share">取消</div>
		</div>
		<div class="attention" v-show="!showAttention" @click="closeDialog">
			<img src="../img/attention.png">
		</div>
	</div>
</template>
<script>
	export default {
	  	name: 'share',
	  	props: ['showShareModale'],
	  	data () {
	  	  	return {
	  	  		// shopListArr:[1,2,3,4,5]
	  	  		showAttention: true
	  	  	}
	  	},
	  	created() {

	  	},
	  	mounted() {

	  	},
	  	methods: {
			closeDialog(){
				// console.log(this.showShareModale)
				// this.showShareModale = false;
				this.$emit('childevent'/* , this.somedata */)
			},
			share(to_app){
				var that = this;

				function getPlantform () {
				    ua = navigator.userAgent;
				    if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
				        return "iPhone"
				    }
				    return "Android"
				};

				function is_weixin () {
				    var a = UA.toLowerCase();
				    if (a.match(/MicroMessenger/i) == "micromessenger") {
				        return true
				    } else {
				        return false
				    }
				};

				function getVersion (c) {
				    var a = c.split("."), b = parseFloat(a[0] + "." + a[1]);
				    return b
				};

				function init(){
					platform_os = getPlantform();
					version.qq = isqqBrowser ? getVersion(UA.split("MQQBrowser/")[1]) : 0;
					version.uc = isucBrowser ? getVersion(UA.split("UCBrowser/")[1]) : 0;
					isWeixin = is_weixin();
					if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 5.3 && platform_os == "Android")) {
					    isqqBrowser = bLevel.qq.forbid
					} else {
					    if (isqqBrowser && version.qq < 5.4 && platform_os == "Android") {
					        isqqBrowser = bLevel.qq.lower
					    } else {
					        if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
					            isucBrowser = bLevel.uc.forbid
					        }
					    }
					}
					if (isucBrowser) {
					    that.closeDialog();
					} else {
					    that.showAttention = false;
					}
				}
				
				var ua,platform_os;
				var qApiSrc = {
				    lower: "http://3gimg.qq.com/html5/js/qb.js",
				    higher: "http://jsapi.qq.com/get?api=app.share"
				};
				var bLevel = {
				    qq: {forbid: 0, lower: 1, higher: 2},
				    uc: {forbid: 0, allow: 1}
				};
				var UA = navigator.appVersion;
				var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
				var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
				var version = {
				    uc: "",
				    qq: ""
				};
				var isWeixin = false;

				var title = '兔博士估价', 
					url = window.location.href, 
					desc = '房源估价，兔博士超快超准超方便。新房二手房，一键便知。更多超赞功能尽在兔博士app，赶紧来体验吧。',
					img = 'https://share.2boss.cn/images/sharelogo.png',
					img_title = '兔博士估价',
					from = '兔博士估价';
				var ucAppList = {
				    weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
				    weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
				    QQ: ['kQQ', 'QQ', '4', 'QQ好友']
				};
				init();
				if (isucBrowser) {
				    to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? ucAppList[to_app][0] : ucAppList[to_app][1]);
				    if (typeof(ucweb) != "undefined") {
				        ucweb.startRequest("shell.page_share", [title, title, url, to_app, "", "@" + from, ""])
				    } else {
				        if (typeof(ucbrowser) != "undefined") {
				            ucbrowser.web_share(title, title, url, to_app, "", "@" + from, '')
				        } else {
				        }
				    }
				} else {

					// var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
					// // alert(b)
					// var d = document.createElement("script");
					// var a = document.getElementsByTagName("body")[0];
					// d.setAttribute("src", b);
					// a.appendChild(d)

				 //    if (isqqBrowser && !isWeixin) {
				 //    	// alert(to_app)
				 //        to_app = to_app == '' ? '' : ucAppList[to_app][2];
				 //        // alert(to_app)
				 //        var ah = {
				 //            url: url,
				 //            title: title,
				 //            description: desc,
				 //            img_url: img,
				 //            img_title: img_title,
				 //            to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
				 //            cus_txt: "请输入此时此刻想要分享的内容"
				 //        };
				 //        ah = to_app == '' ? '' : ah;
				 //        if (typeof(browser) != "undefined") {
				 //            if (typeof(browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
				 //                browser.app.share(ah)
				 //            }
				 //        } else {
				 //            if (typeof(window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
				 //                window.qb.share(ah)
				 //            } else {
				 //            }
				 //        }
				 //    } else {
				 //    }
				}
			}
	  	}
	}
</script>
<style lang="less" scoped>
.share {
	font-size: .16rem;
	.Dr2Layer{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999999991;
		background: rgba(0,0,0,.6);
	}
	.share-content{
	  z-index: 999999992;
	  -webkit-transform: translateY(150%);
	  -webkit-transition: all .3s ease-out;
	  background-color: white;
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  right: 0;

	  &.share-content-show{
	    -webkit-transform: translateY(0);
	  }

	  .header-share{
	    height: 0.145rem;
	    width: 0.1957rem;
	    margin-right: 0.1rem;
	  }

	  .content-item{
	    width:100%;
	    display: table;
	    padding: .2rem 0;
	  }
	  .content-item div{
	    text-align: center;
	    width:25%;
	    display: table-cell;
	  }
	  .content-item div img{
	    width: 0.5276rem;
	    margin-bottom: 0.1rem;
	  }
	  .share-title-contain{
	    height: .6rem;
	    background-color: white;
	    position: relative;
	  }
	  .share-title-contain div:nth-child(1){

	    height:1px;
	    background-color: #efefef;
	  }
	  .share-title{
	    padding: 0 0.1106rem;
	    color: #666464;
	    font-size: 0.1277rem;
	    left: 50%;
	    height: 0.4rem;
	    top: 0.19rem;
	    background-color: white;
	    text-align: center;
	    position: absolute;

	    transform: translateX(-50%);
	    -webkit-transform: translateX(-50%);;
	    line-height: 0.4rem;
	  }
	  .share-content .content-item{
	    background-color: white;
	    height:0.9191rem;
	    margin: 0.5rem 0;
	  }
	  .cancel-share{

	    text-align: center;
	    height:0.5872rem;
	    line-height: 0.5872rem;
	    background-color: #f5f5f5;
	    font-size: 0.1532rem;
	  }
	}
	.attention {
		width: 100%;
		text-align: center;
		z-index: 999999993;
		position: fixed;
		bottom: 0;
		left: 0;
		top: 50vw;
		img {
			width: 70%;
		}
	}
}
</style>