<template>
	<div class="chat-box">
		<div class="chat-box__wrapper" v-if="node.data.ui === 'regular'">
			<video-player
				@showTitle="showTitle"
				:videoId="videoId"
				:videoURL="url"
				:isAnimated="isAnimated"
				ref="myPlayer"
			/>

			<div class="chat-box__content">
				<div class="chat-bot__titles" :class="{ animated: isAnimated }">
					<p class="chat-bot__title--item" v-if="userState.name.length > 0">
						{{ userState.language === 'vi' ? 'Xin Chào ' : 'Welcome' }} {{ userState.name }}
					</p>
					<p class="chat-bot__title--item">{{ node.data.text }}</p>
				</div>
			</div>
			<transition name="fade">
				<div class="buttons-group scroll-style" v-show="!isInput">
					<button
						class="button-item"
						round
						v-for="(button, index) in buttonData"
						:key="index"
						@click="handleNextNode(button)"
					>
						<span class="button-item__badge">{{
							String.fromCharCode(97 + index).toUpperCase()
						}}</span>
						<span class="button-text">{{ button.text }}</span>
					</button>
				</div>
			</transition>
			<transition name="fade">
				<div class="chat-input-wrapper" v-show="isInput">
					<form class="chat-input" @submit.prevent="handleUserCommand">
						<input
							type="text"
							v-model="name"
							:placeholder="placeholder[language]"
							id="userInput"
							autocomplete="off"
						/>

						<button @click.prevent="handleGoBack" class="btn-danger">
							<img src="../assets/back-arrow.png" alt="" />
						</button>
						<button type="submit" class="btn-submit">
							<img src="../assets/send.png" alt="" />
						</button>
					</form>
				</div>
			</transition>
		</div>

		<!-- <chat-carousel v-else-if="node.data.ui === 'carousel'" /> -->

		<UserInfo v-else />

		<transition name="fade">
			<ChatSlider v-if="productList" :productList="productList" @handleStop="handleStopVideo" />
		</transition>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import UserInfo from './UserInfo.vue';
	import VideoPlayer from './VideoPlayer.vue';
	import ChatSlider from './ChatSlider.vue';

	export default {
		components: { VideoPlayer, UserInfo, ChatSlider },
		props: ['videoId'],
		name: 'ChatBox',
		data() {
			return {
				isAnimated: false,
				name: '',
				isInput: false,
				language: '',
				placeholder: {
					vi: 'Vui lòng nhập tên của bạn...',
					en: 'Insert your name to begin...',
				},
			};
		},
		computed: {
			...mapGetters({
				node: 'chat/node',
				userState: 'chat/userState',
				nextNode: 'chat/nextNode',
				productList: 'chat/productList',
			}),
			buttonData() {
				return this.node.data.buttons;
			},
			url() {
				return this.node.data.videoUrl;
			},
		},
		methods: {
			...mapActions({
				getNode: 'chat/getNode',
			}),
			...mapMutations({
				setNode: 'chat/SET_NODE',
			}),
			handleCloseChatBox() {
				this.$emit('closeChatBox');
			},
			handleGoBack() {
				this.isInput = false;
				this.name = '';
			},
			showTitle() {
				this.isAnimated = true;
			},
			async handleNextNode(payload) {
				await this.getNode(payload);
				if (this.nextNode.data.ui === 'regular') {
					this.setNode(this.nextNode);
				} else if (this.nextNode.data.ui === 'input') {
					this.isInput = true;
					this.language = payload.data.value;
					this.handleStopVideo();
				}
			},
			handleUserCommand() {
				this.isInput = false;
				return this.$store.dispatch('chat/register', {
					name: this.name,
					language: this.language,
				});
			},
			handleStopVideo() {
				const videoPlayer = this.$refs.myPlayer.player;
				videoPlayer.pause();
			},
		},
	};
</script>

<style src="./ChatBox.css"></style>

<style scoped>
	/* Scroll 2 */
	.scroll-style::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	.scroll-style::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.scroll-style::-webkit-scrollbar-thumb {
		background-color: #414649;
		border-radius: 10px;
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
