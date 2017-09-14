<template>
    <div class="house_map">
        <div class="house_index box">
            <div class="box_title">
                <div class="left">地址：{{mapDetail.house_address}}</div>
                <div class="right">
                    <span @click="gotoDetail">导航</span><img src="../../assets/img/new_arrow_right.png">
                </div>
            </div>
            <div class="box_content">
                <baidu-map class="map" :center="center" :zoom="15" @ready="handler" ak="7yQQ0ifmKGlDGIq9LhrA7jE7BQrC23BY">
                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                        <!-- <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/> -->
                    </bm-marker>
                    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="success" @locationError="error"></bm-geolocation>
                </baidu-map>
            </div>
        </div>
    </div>

</template>
<script>

    import { BaiduMap,BmMarker,BmGeolocation } from 'vue-baidu-map'
    import { getHouseDetailHead } from '../../api/house_second'

	export default {
	  	name: 'house_map',
        data() {
            return {
                center: {lng: 0, lat: 0},
                mapDetail: {}
            }
        },
        components: {
            BaiduMap,
            BmMarker,
            BmGeolocation
        },
        mounted() {

        },
	  	methods: {
    success({point, AddressComponent}) {
      console.log(point)
      console.log(AddressComponent)
    },
    error({StatusCode}) {
      console.log(StatusCode)
    },
            gotoDetail() {
			    location.href = this.$store.state.comm.downloadApp;
            },
            handler ({BMap, map}) {
              console.log(BMap)
              console.log(map)
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: this.$route.query.houseId
                }
                getHouseDetailHead(params).then(res => {
                    this.mapDetail = res.data;
                    this.center.lng = res.data.lng;
                    this.center.lat = res.data.lat;
                }).catch(err => {
                    console.log(err)
                });
            }
	  	}
	}
</script>
<style lang="less" scoped>
.house_map {
    .map {
        width: 100%;
        height: 1rem;
    }
}
</style>
