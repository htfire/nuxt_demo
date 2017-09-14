<template>
    <div class="download_app" v-if="show_dowload">
        <img class="close" @click="closeDown" src="../../assets/img/closeDown.png">
        <img class="logo" src="../../assets/img/common/logo.png">
        <div class="content">
            <p class="top">掌上兔博士</p>
            <p>岂止是超好的查房价</p>
        </div>
        <a @click="downing">免费下载</a>
    </div>
</template>

<script>
import { recordEvent } from '../../assets/libs/recordEvent.js'
export default {
    name: 'downloadApp',
    props: ['fromPage', 'cityId', 'houseId'],
    data() {
        return {
            show_dowload: true
        }
    },
    methods: {
        closeDown() {
            this.show_dowload = false;
            this.$emit('closedownload');
        },
        downing() {
            if (this.fromPage == 'm_index') {
                recordEvent(41813, { cityId: this.cityId, page_type: 1 });
            } else if (this.fromPage == 'house_list') {
                recordEvent(41834, { cityId: this.cityId, page_type: 11 });
            } else if (this.fromPage == 'estimate') {
                recordEvent(41828, { cityId: this.cityId, page_type: 4 });
            } else if (this.fromPage == 'house_second') {
                recordEvent(41823, { cityId: this.cityId, page_type: 25, houseId: this.houseId });
            } else if (this.fromPage == 'estimateOut') {
                recordEvent(41878, { cityId: this.cityId, page_type: 7 }).then((res) => {
                    window.location.href = "http://wap.2boss.cn/?wzChanel=tdnews-xm";
                }).catch((err) => {
                    window.location.href = "http://wap.2boss.cn/?wzChanel=tdnews-xm";
                });
                return
            } else if (this.fromPage == 'estimate_add_out') {
                window.location.href = "http://wap.2boss.cn/?wzChanel=tdnews-xm";
                return
            }
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {    //iOS下载链接
                location.href = "https://itunes.apple.com/app/apple-store/id1054902876?pt=117855253&ct=weixin&mt=8";
                return
            };
            if (ua.indexOf("android") > -1 && ua.indexOf("mobile mqqbrowser") > -1) {
                location.href = this.$store.state.comm.downloadApp;
            } else {
                location.href = "http://apk.2boss.cn/public/tuboshi.apk";
            };
        }
    }
}
</script>

<style lang="less" scoped>
.download_app {
    background: #545454;
    color: white;
    width: 100%;
    height: 0.65rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    a {
        font-size: 0.15rem;
        display: inline-block;
        color: #fff;
        background: #fd5055;
        padding: 0.05rem;
        border-radius: 0.05rem;
    }
    .close {
        width: 0.15rem;
    }
    .logo {
        width: .5rem;
    }
    .content {
        font-size: .12rem;
        margin-right: .3rem;
        .top {
            font-size: .16rem;
        }
    }
}
</style>
