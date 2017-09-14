<template>
  <div>
    <nuxt/>
  </div>
</template>


<style lang="less">
@import (reference) "../assets/common/common.less";
  html{
    font-size: 100px;
    font-size: calc(1000vw/37.5);
    font-family: '微软雅黑',"Helvetica Neue", Helvetica, Arial, sans-serif;
    background: #f0f0f0;
    width: 100%;
    /*height: 100%;*/
  }
  *{
    margin: 0;
    padding:0;

  }
  body {
    width: 100%;
    /*height: 100%;*/
    font-size: .14rem;
    line-height: inherit;
    /*-webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow: hidden;*/
  }
  #app {
    width: 100%;
    // height: 100%;
  }
  ul,li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #666;
  }
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading img {
    text-align: center;
  }
  .out_layout {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction:column;
    overflow: hidden;
  }
  .content_layout {
    display: block;
    height: initial;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    flex: 1;
  }
  .page_view {
    width: 100%;
    min-height: 100vh;
    background: #f0f0f0;
  }
	.rmBorder {
		border: 0 !important;
  }
  .flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.flex-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
  }
  .clearfix:after {
    content: '.';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  .f_l {
    float: left;
  }
  .f_r {
    float: right;
  }
	.border_b {
		border-bottom: 1px solid @line_gray;
	}
	.box {
		background: white;
		margin-top: .1rem;
		.box_title {
			padding: 0 .15rem;
			height: .5rem;
			.flex-row();
			.border_b();
			justify-content: space-between;
			font-size: .16rem;
			.left {
				p:nth-of-type(1) {
					font-size: .16rem;
				}
				p:nth-of-type(2) {
					font-size: .12rem;
					color: @color_gray;
				}
				span {
					font-size: .12rem;
					color: @color_gray;
				}
			}
			.right {
				.flex-row();
				justify-content: center;
				span {
					font-size: .14rem;
					color: @color_gray;
				}
				img {
					width: .08rem;
					margin-left: .05rem;
				}
				p {
					// width: 1rem;
					padding: 0 .1rem;
					height: .2rem;
					line-height: .2rem;
					text-align: center;
					color: @red;
					border: 1px @red solid;
					font-size: .14rem;
				}
			}
		}
  }
</style>
