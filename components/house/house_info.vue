<template>
    <div class="house_info">
        <div class="house_img">
            <div class="img_box" @click="gotoSwiper" v-if="houseInfo.headInfo.housePicUrl&&houseInfo.headInfo.housePicUrl.length>0">
                <img :src="houseInfo.headInfo.housePicUrl[0]"/>
                <div class="total_num"><img src="../../assets/img/house/pic.png"/>1/{{houseInfo.headInfo.housePicUrl.length}}</div>
            </div>
            <div class="score">
                <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item" track-by="index"></span>
            </div>
            <div class="basicInfo">
                <div class="row-1" :class='{true:"collapse", false: "extend" }[isCollapsed]'>{{houseInfo.headInfo.houseDesc}}</div>
                <div class='row-2' v-show='!isCollapsed' :class="{houseInfoActive:!isCollapsed}" @click='toggleState()'><img src='../../assets/img/house/red_arrow_down.png' alt=''></div>
                <div class='row-3' v-show='isCollapsed' @click='toggleState()'><img src='../../assets/img/house/red_arrow_down.png' alt=''></div>
            </div>
        </div>
        <div class="house_basic_info box" v-if="houseBasicInfo.length>0">
            <div class="box_title">基本信息</div>
            <div class="box_content">
                <!-- <div class="title">关键词<span>{{houseInfo.basicInfo.tags}}</span></div> -->
                <div style="margin: .025rem 0;position: relative;" v-if="item.right != ''" v-for="(item,key) in houseBasicInfo" :key="key">
                    <span class="desc-left step" style="text-align: justify;height: .12rem;color: #8e8e8e;line-height: .12rem;overflow: hidden;">{{item.left}}</span>
                    <span style="overflow: hidden;height: .12rem;line-height: .12rem;color: #474747;"> : &nbsp;{{item.right}}</span>
                </div>
            </div>
        </div>
    </div>
		
</template>
<script>
    import { getVillageInfo, getHouseBasicInfo } from '../../api/house_second.js'
	export default {
        name: 'house_info',
	  	data () {
	  	  	return {
                isCollapsed: true,
                houseInfo: {
                    basicInfo: {
                        properties: []
                    },
                    headInfo: {
                        housePicUrl: []
                    }
                },
                houseBasicInfo: {}
	  	  	}
	  	},
	  	created() {
            this.getHouseInfo();  
            this.getHouseBasicInfo();  
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getHouseInfo'
        },
        computed: {
            itemClasses(){
                let result = [];
                let score = Math.floor(this.houseInfo.headInfo.stars * 2 ) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for(let i=0;i<integer;i++){
                    result.push("on");
                }
                if(hasDecimal){
                    result.push("half");
                }
                while(result.length < 5){
                    result.push("off");
                }
                return result;
            }
        },
	  	methods: {
            toggleState() {
				this.isCollapsed = !this.isCollapsed;
            },
            gotoSwiper() {
                this.$store.commit('changeSwiperImgList', this.houseInfo.headInfo.housePicUrl)
                this.$router.push({path: '/img'});
            },
            getHouseInfo() {
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: this.$route.query.houseId
                }
                getVillageInfo(params).then(res => {
                    if(res.data.resultCode == 0) {
                        this.houseInfo = res.data.body;
                    }
                }).catch(err => {
                    console.log(err)
                });
            },
            getHouseBasicInfo() {
                let params = {
                    city_id: this.$route.query.cityId,
                    house_id: this.$route.query.houseId
                }
                getHouseBasicInfo(params).then(res => {
                    if(res.data.resultCode == 0) {
                        this.houseBasicInfo = res.data.body;
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
	  	}
	}
</script>
<style lang="less" scoped>
.house_info {
    .house_img {
        background: white;
        padding: .1rem .15rem;
        .img_box {
            position: relative;
            img {
                width: 100%;
                height: 1.95rem;
            }
            .total_num {
                position: absolute;
                right: .15rem;
                bottom: .15rem;  
                color: white;
                img {
                    width: .15rem;
                    height: .15rem;
                    margin-right: .1rem;
                }
            }
        }
        .score {
            text-align: center;
            color: #fd5056;
            font-size: .12rem;
            margin: .05rem 0;
        }
        .star-item{
            display: inline-block;
            background-repeat: no-repeat;
            width: .13rem;
            height: .12rem;
            margin-right: .01rem;
            background-size: 100%;
        }
        .star-item.on{
            background-image: url('../../assets/img/on.png');
        }
        .star-item.half{
            background-image: url('../../assets/img/half.png');
        }
        .star-item.off{
            background-image: url('../../assets/img/off.png');
        }
        .basicInfo {
            background: #fff;
            .collapse {
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
        .extend {
            white-space: pre-wrap;
        }
        .row-1{ 
            color: #8e8e8e;
            font-size: .14rem;
        }
        .row-2{  
            text-align: center; 
            img {
                width: .15rem;
            }
            &.houseInfoActive {
                transform: rotate(180deg);
            }
        }
        .row-3{
            text-align: center;
            padding-top: 0.05rem;
            img {
                width: .15rem;
            }
        }
    }
    .house_basic_info {
        background: white;
        .box_content {
            padding: .15rem;
            .title {
                margin: 0 0 .1rem .15rem;
                font-size: .15rem;
                span {
                    border-radius: 10px;
                    border: 1px #8e8e8e solid;
                    color: #8e8e8e;
                    padding: 0 .1rem;
                    margin-left: .15rem;
                    font-size: .12rem;
                }
            }
        }
    }
    .desc-left{
        width: 23%;
        display: inline-block;
        &.step {
            i {
                display: inline-block;
                overflow: hidden;
                font-style: normal;
                text-align: center;
            }
        }
        &.step:after, &.step b {
            display: inline-block;
            position: relative;
            top: -25px;
            width: 100%;
            height: 1px;
            overflow: hidden;
            font-size: 0;
            line-height: 0;
            background-color: #ccc;
            z-index: -1;
        }
        &.step:after {
            content: "";
        }
    }
}
</style>