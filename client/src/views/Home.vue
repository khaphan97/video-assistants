<template>
	<div class="home">
		<div class="chat-container">
			<transition name="fade">
				<span class="close-icon" @click="toggleChatBox" v-if="isShow">X</span>
			</transition>
			<transition name="fade">
				<div class="chat-box-container" v-if="isShow">
					<div class="loading" v-if="isLoading">
						<div>
							<loading />
							<p style="color:#1890ff">Firing up...</p>
						</div>
					</div>
					<transition name="slide-up" v-else>
						<chat-box @closeChatBox="toggleChatBox" :key="node.data.name" :videoId="node.nodeId" />
					</transition>
				</div>
			</transition>
			<transition name="fade">
				<div class="chat-icon" @click="toggleChatBox" v-if="!isShow">
					<p>See example chat bot</p>
				</div>
			</transition>
		</div>
		<product-modal />
	</div>
</template>

<script>
	import ChatBox from '../components/ChatBox.vue';
	import Loading from '../components/Loading.vue';
	import { mapActions, mapGetters, mapMutations } from 'vuex';
	import ProductModal from '../components/ProductModal.vue';
	export default {
		name: 'Home',
		components: { ChatBox, Loading, ProductModal },
		data() {
			return {
				isShow: false,
			};
		},
		computed: {
			...mapGetters({
				node: 'chat/node',
				isLoading: 'chat/isLoading',
			}),
			url() {
				return this.node.videoUrl;
			},
		},
		methods: {
			...mapActions({
				getNode: 'chat/getNode',
			}),
			...mapMutations({
				setTimeoutVideoPlayer: 'chat/SET_TIME_OUT',
				setAutoplay: 'chat/SET_AUTO_PLAY',
			}),
			toggleChatBox() {
				this.isShow = !this.isShow;
				this.setTimeoutVideoPlayer(0);
				this.setAutoplay(true);
			},
		},
		mounted() {
			this.getNode({
				type: 'video',
				event: 'goto',
				data: 'conversation_start',
			});
		},
	};
</script>

<style>
	.chat-container {
		position: absolute;
		bottom: 20px;
		right: 40px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 360px;
		height: 630px;
	}

	.chat-icon {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 60%;
		padding: 50px;
		text-align: center;
		color: #fff;

		border-radius: 20px;
		border: 5px solid #1890ff;
		background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.13), rgba(0, 0, 0, 0.24)),
			url('../assets/5f16c8991ce3203ce40fe83b_learn_n_dev_image_1.1.1.jpg');
		background-image: linear-gradient(rgba(0, 0, 0, 0.13), rgba(0, 0, 0, 0.24)),
			url('../assets/5f16c8991ce3203ce40fe83b_learn_n_dev_image_1.1.1.jpg');
		background-size: cover;
		box-shadow: 0 0 5px #cecece;

		cursor: pointer;
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}

	.chat-icon:hover {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	}

	.chat-box-container {
		width: 100%;
		height: 100%;
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid #ecf0f1;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(10px);
	}
</style>

<style scoped>
	.slide-up-enter-active,
	.slide-up-leave-active {
		transition: all 0.5s ease-in-out;
	}

	.slide-up-leave-to {
		transform: translateY(-100%);
	}
	.slide-up-enter {
		transform: translateY(100%);
	}
</style>
