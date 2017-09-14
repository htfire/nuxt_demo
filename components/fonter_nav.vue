<template>
	<div class="footer_nav">
		<footer>
			<div class="top"><span>兔博士</span>&nbsp;|&nbsp;<span>小区大全</span>&nbsp;|&nbsp;<router-link :to="{path:'about'}">关于我们</router-link></div>
			<div class="companyName">上海礼友信息技术服务有限公司</div>
		</footer>
	</div>
</template>

<script>

export default {
	name: 'footer_nav',
	props: ['rmPadding']	
}
</script>

<style lang="less" scoped>
.footer_nav {
	width: 100%;
	height: .9rem;
	font-size: .13rem;
	padding-bottom: .15rem;
	footer {
		width: 100%;
		height: 100%;
		text-align: center;
		color: #b4b4b4;
		background: url(../assets/img/footer_nav.png);
		background-size: cover;
		position: relative;
		.top {
			position: absolute;
			left: 50%;
			top: 45%;
			margin-left: -.875rem;
		}
		.companyName {
			position: absolute;
			left: 50%;
			top: 70%;
			margin-left: -.93rem;
		}
		a {
			color: #b4b4b4;
		}
		.companyName {
			text-align: center;
		}
	}
}
</style>
