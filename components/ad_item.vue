<template>
    <div class="ad_item" @click="gotoDetail">
        <img :src="houseAdInfo.img" />
    </div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ad_item',
	data () {
		return {
            houseAdInfo: {}
		}
    },
    created() {
        this.getHouseAdinfo();
    },
	methods: {
        getHouseAdinfo() {
            axios.get('superior/v1/ad/getHouseAdinfo',{
                params:{
                    city_id: this.$route.query.cityId,
                    house_id: this.$route.query.houseId
                }
            })
            .then((res) =>{
                this.houseAdInfo = res.data.body;
            }).catch((error) => {
                console.log(error);
            });
        },
        gotoDetail() {
            let routerPath = this.houseAdInfo.content.path;
            let query = JSON.parse(this.houseAdInfo.content.query);
            switch (routerPath) {
                case 'COURT_DETAIL':
                    this.$router.push({path: '/house_second',query:{cityId: query.city_id,houseId:query.house_id}});
                    break;
                case 'AD': 
                    if(query&&query.ad_url!='') {
                        window.location.href = query.ad_url;
                    }
                    break;
            }
            
        }
	}
}
</script>

<style lang="less" scoped>
.ad_item {
    width: 100%;
    background: white;
    margin-top: .1rem;
    img {
        width: 100%;
        height: auto;
    }
}
</style>
