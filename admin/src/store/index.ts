import Vue from 'vue';
import Vuex from 'vuex';
import chat from './chat';
Vue.use(Vuex);

export default new Vuex.Store({ modules: { chat } });
