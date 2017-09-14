<template>
    <div class="house_comment">
        <div class="house_index box">
            <div class="box_title" v-if="houseComment.itemScoreList&&houseComment.itemScoreList[0].itemScore!=null">
                <div class="left">小区指数</div>
                <div class="right">
                    <span @click="downLoad(0)">写点评</span><img src="../../assets/img/new_arrow_right.png">
                </div>
            </div>
            <div class="box_content" v-if="houseComment.itemScoreList&&houseComment.itemScoreList[0].itemScore!=null">
                <div class="left">
                     <div class="box_score">{{houseComment.houseScore}}分</div> 
                    <div class="value">{{houseComment.houseScoreDes}}</div>
                    <div class="stars">
                        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" track-by="index"></span>
                    </div>
                </div>
                <div class="right">
                    <div class="item" v-for='item in houseComment.itemScoreList'>
                        <div class="top">
                            <span>{{item.itemName}}</span>
                            <span class="red">{{item.itemScore}}分</span>
                        </div>
                        <div class="bottom">
                            <div class="inner" :style="{width: item.itemScore/5*100+'%'}"></div>
                        </div>  
                    </div>
                </div>
            </div>
            <div class="tags" v-if="houseComment.tagsDesc.length>0">
                <span class="item" @click="downLoad" :class="{red:key==0}" v-for="(item,key) in houseComment.tagsDesc">{{item.name}}({{item.cnt}})</span>
            </div>
            <div class="comment_list" v-if="houseComment.commentList&&houseComment.commentList.length>0">
                <div class="title"><span>小区评论</span></div>
                <div class="comment_item" :class="{rmBorder:key==houseComment.commentList.length-1}" v-for="(item,key) in houseComment.commentList" @click="downLoad">
                    <div class="left_img">
                        <img :src="item.headImg" />
                    </div>
                    <div class="right_box">
                        <div class="left">
                            <p>{{item.name}}<span v-for="it in item.tagList">{{it}}</span></p>
                            <p>{{item.storeName}}</p>
                            <div class="score">
                                <span v-for="(itemClass,index) in item.itemClasses" :class="itemClass" class="star-item" track-by="index"></span>
                                <span>{{item.time|time}}</span>
                            </div>
                            <p>{{item.comment}}</p>
                        </div>
                        <div class="right">
                            <div><img src="../../assets/img/house/icon_unzan.png" />{{item.voteCnt}}</div>
                        </div>
                    </div>
                </div>
                <div class="view_all" @click="downLoad(1)">查看全部点评（{{houseComment.commentCnt}}）</div>
            </div>
        </div>
    </div>
		
</template>
<script>
    import { getCommentsForHouse2 } from '../../api/house_second.js'
    import {recordEvent} from '../../assets/libs/recordEvent.js'

	export default {
	  	name: 'house_comment',
	  	data () {
	  	  	return {
                houseComment: {
                    commentList: [],
                    itemScoreList: [
                        {itemScore:null}
                    ],
                    tagsDesc: []
                }
	  	  	}
	  	},
	  	created() {
            this.getHouseComment();    
	  	},
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getHouseComment'
        },
        computed: {
            itemClasses(){
                let result = [];
                let score = Math.floor(this.houseComment.houseScore * 2 ) / 2;
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
            downLoad(key) {
                if(key == 0) {
                    recordEvent(41850,{"cityId":this.$route.query.cityId,'houseId':this.$route.query.houseId,"page_type":25,"userId":0,"appName":4,"appId":4}).then((res)=>{
                        location.href = this.$store.state.comm.downloadApp;
                    }).catch((err)=>{
                        location.href = this.$store.state.comm.downloadApp;
                    });
                }else {
                    recordEvent(41851,{"cityId":this.$route.query.cityId,'houseId':this.$route.query.houseId,"page_type":25,"userId":0,"appName":4,"appId":4}).then((res)=>{
                        location.href = this.$store.state.comm.downloadApp;
                    }).catch((err)=>{
                        location.href = this.$store.state.comm.downloadApp;
                    });
                }
                
            },
            calculate(storeScore) {
                let result = [];
                let score = Math.floor(storeScore * 2 ) / 2;
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
            },
            getHouseComment() {
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: this.$route.query.houseId
                }
                getCommentsForHouse2(params).then(res => {
                    if(res.data.resultCode == 0) {
                        let that = this;
                        res.data.body.commentList.forEach((item,key)=>{
                            item.itemClasses = that.calculate(item.score)
                        });
                        this.houseComment = res.data.body;
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
	  	}
	}
</script>
<style lang="less" scoped>
.house_comment {
    .box_title {
        border-bottom: none;
    }
    .box_content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1.2rem;
        padding: .05rem .1532rem;
        .left {
            width: 33%;
            height: 1.2rem;
            border-left: 2px #fd5056 solid;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #f5fafb;
            .box_score {
                font-size: .23rem;
                color: #fd5056;
                .num {
                    font-size: 28rem;
                }
            }
            .value {
                font-size: .12rem;
                color: #8e8e8e;
                margin: .05rem .02rem;
            }
            .stars {
                span {
                    float: left;
                }
            }
            img {
                width: .12rem;
            }
        }
        .right {
            width: 67%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            background: #f5fafb;
            padding-right: .05rem;
            .item {
                width: .85rem;
                margin: .05rem 0;
                .top {
                    width: .85rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    color: #8e8e8e;
                    font-size: .14rem;
                    .red {
                        color: #fd5056;
                    }
                }
                .bottom {
                    width: .85rem;
                    background: #dbdbdb;
                    height: .04rem;
                    border-radius: .1rem;
                    position: relative;
                    margin-top: .02rem;
                    .inner {
                        height: .04rem;
                        position: absolute;
                        left: 0;
                        top: 0;
                        background: #fd5156;
                        border-radius: .04rem;
                        line-height: .04rem;
                    }
                }
            }
        }
    }
    .score {
        text-align: left;
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
    .tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: .1rem .15rem;
        flex-wrap: wrap;
        span {
            width: 29%;
            box-sizing: content-box;
            text-align: center;
            color: #8e8e8e;
            border: 1px #8e8e8e solid;
            border-radius: 10px;
            font-size: .12rem;
            margin: 0 .1rem .1rem 0;
            &.red {
                color: white;
                background: #fd5056;
                border: 1px #fd5056 solid;
            }
        }
    }
    .comment_list {
        border-top: 1px #dbdbdb solid;
        padding: .15rem 0 0 0;
        .title {
            padding: 0 .15rem;
            span {
                border-left: 2px #fd5056 solid;
                font-size: .16rem;
                padding: 0 .05rem;
            }
        }
        .comment_item {
            margin: 0 .15rem;
            padding: .15rem 0;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            border-bottom: 1px #dbdbdb solid;
            &.rmBorder {
                border-bottom: none;
            }
            .left_img {
                img {
                    width: .6rem;
                    min-width: .6rem;
                    min-height: .6rem;
                    border-radius: 100%;
                    margin-right: .1rem;
                }
            }
            .right_box {
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: space-between;
                position: relative;
                .left {
                    p {
                        margin-bottom: .05rem;
                    }
                    p:nth-of-type(1) {
                        font-size: .16rem;
                        color: #474747;
                        span {
                            font-size: .11rem;
                            background: #f5fafb;
                            color: #8e8e8e;
                            padding: 0 .05rem;
                            margin-left: .1rem;
                        }
                    }
                    p:nth-of-type(2) {
                        font-size: .14rem;
                        color: #474747;
                    }
                }
                .right {
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #8e8e8e;
                    img {
                        width: .15rem;
                        margin-right: .02rem;
                    }
                }
            }
        }
        .view_all {
            border-top: 1px #dbdbdb solid;
            text-align: center;
            height: .5rem;
            line-height: .5rem;
            font-size: .14rem;
        }
    }
    
}
</style>