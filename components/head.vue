<template>
  <header class="common_head" :class="headerLayout==1?'pos_fixed_px':headerLayout==2?'pos_static':'header_new'" @click="hideNav">
    <span class="header_icon" v-if="goBack" @click="goToBack">
      <img style="width: 0.08rem;" src="~assets/img/white-back.png">
    </span>
    <span class="header_title">{{title}}</span>
    <span class="header_right" v-show="selectNav" @click.stop="gotoNav">
      <img src="~assets/img/right_select.png" :class="showNav?'':'rotate'">
      <div class="jiao" v-if="showNav"></div>
      <div class="zhezhao" v-if="showNav"></div>
      <ul class="nav_list" v-if="showNav">
        <li @click="gotoMindex">首页</li>
        <li @click="gotoEstimateIndex">估价格</li>
        <li @click="gotoHouseList">找房源</li>
        <li @click="downloadApp">查学区</li>
        <li @click="downloadApp">找经纪人</li>
      </ul>
    </span>
  </header>
</template>

<script>

export default {
  name: 'estimateHead',
  props: ['goBack', 'title', 'selectNav', 'headerLayout'],
  data() {
    return {
      showNav: false
    }
  },
  methods: {
    gotoNav() {
      this.showNav = !this.showNav;
    },
    gotoMindex() {
      this.$router.push({ path: '/m_index' });
    },
    gotoEstimateIndex() {
      this.$router.push({ path: '/index' });
    },
    gotoHouseList() {
      this.$router.push({ path: '/house_list' });
    },
    downloadApp() {
      location.href = this.$store.state.comm.downloadApp;
    },
    hideNav() {
      this.showNav = false;
    },
    goToBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.common_head {
  font-size: .18rem;
  background: #fd5056;
  color: white;
  box-sizing: border-box;
  .header_right {
    img {
      width: .21rem;
      height: .21rem;
    }
    .jiao {
      position: absolute;
      right: .08rem;
      top: .33rem;
      z-index: 10;
      width: 0;
      height: 0;
      border-left: .15rem solid transparent;
      border-right: .15rem solid transparent;
      border-bottom: .3rem solid white;
    }
    .zhezhao {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background: rgba(0, 0, 0, .3)
    }
    .rotate {
      transform: rotate(45deg);
    }
  }
}

.header_new {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  height: .45rem;
  .header_icon {
    width: .45rem;
    height: .45rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header_title {
    font-size: .18rem;
    position: absolute;
    top: 0;
    left: .45rem;
    right: .45rem;
    line-height: .45rem;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .header_right {
    width: .45rem;
    height: .45rem;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    ul.nav_list {
      position: absolute;
      top: .45rem;
      right: .08rem;
      z-index: 9;
      list-style: none; // width: 1.2rem;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      li {
        width: .9rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: #474747;
        border-bottom: 1px #ccc solid;
        margin: 0 .15rem;
        &:nth-last-child(1) {
          border: none;
        }
      }
    }
  }
}

.pos_fixed_px {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0;
  z-index: 100;
  .header_icon {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header_title {
    font-size: .18rem;
    position: absolute;
    top: 0;
    left: 44px;
    right: 44px;
    line-height: 44px;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .header_right {
    width: 44px;
    height: 44px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    ul.nav_list {
      position: absolute;
      top: 44px;
      right: .08rem;
      z-index: 9;
      list-style: none;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      li {
        width: .9rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: #474747;
        border-bottom: 1px #ccc solid;
        margin: 0 .15rem;
        &:nth-last-child(1) {
          border: none;
        }
      }
    }
  }
}

.pos_static {
  height: .45rem;
  .header_icon {
    width: .45rem;
    height: .45rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header_title {
    font-size: .18rem;
    position: absolute;
    top: 0;
    left: .45rem;
    right: .45rem;
    line-height: .45rem;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .header_right {
    width: .45rem;
    height: .45rem;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    ul.nav_list {
      position: absolute;
      top: .45rem;
      right: .08rem;
      z-index: 9;
      list-style: none;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      li {
        width: .9rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: #474747;
        border-bottom: 1px #ccc solid;
        margin: 0 .15rem;
        &:nth-last-child(1) {
          border: none;
        }
      }
    }
  }
}
</style>
