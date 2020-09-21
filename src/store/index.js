import Vue from 'vue';
import Vuex from 'vuex';
import { login, chatRooms, messages } from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    chatRooms,
    messages
  }
});
