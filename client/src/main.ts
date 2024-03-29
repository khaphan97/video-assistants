import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');


// test