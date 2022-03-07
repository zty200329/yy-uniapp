<template>
	<view class="my-container">
		<!-- 用户未登录 -->

		<block v-if="!token">
			<image class="avatar avatar-img" src="/static/images/default-avatar.png" mode="scaleToFill" />
			<view class="login-desc">登录后可同步数据</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="login-btn" type="primary" @click="getUserInfo">微信用户一键登录</button>
			<button @click="onToTest">扫码</button>
			<!-- #endif -->
		</block>
		<!-- 已登录 -->
		<block v-else>
			<image class="avatar avatar-img" :src="userInfo.avatarUrl" mode="scaleToFill" />
			<view class="login-desc">{{ userInfo.nickName }}</view>
			<navigator url="../../pages/user_information/user_information" class="update-item"><button>修改信息</button></navigator>
			<button class="login-btn" type="default" @click="onLogoutClick">退出登录</button>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['token', 'userInfo', 'avatar', 'nickName'])
		},
		methods: {
			...mapActions('user', ['loginAction', 'logout']),
			onToTest() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			/**
			 * 获取用户信息
			 */
			getUserInfo() {
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '获取用户信息',
					success: userInfo => {
						console.log(userInfo, 'userInfo');
						uni.login({
							provider: 'weixin',
							success: loginInfo => {
								console.log(loginInfo, 'loginInfo');
								userInfo.code = loginInfo.code,
									this.loginAction(userInfo).then(() => {
										console.log(2)
									}).catch(() => {
										console.log(1)
									})

							}
						});
					},
					fail: err => {
						console.log(err, 'err')
					}
				});
			},
			/**
			 * 退出登录
			 */
			onLogoutClick() {
				uni.showModal({
					title: '提示',
					content: '真的要退出猪猪宝贝写的么ლ(′◉❥◉｀ლ)~',
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							this.logout();
						}
					}
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.my-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 25%;

		.avatar-img {
			width: 78px;
			height: 78px;
		}

		.login-desc {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
			margin-top: 24px;
		}

		.login-btn {
			margin-top: 24px;
			width: 85%;
		}
		.update-item {
			margin-top: 24px;
			width: 85%;
		}
	}
</style>
