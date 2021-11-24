import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidolist: [],
    gugunlist: [],
    donglist: [],
    aptlist: [],
    sido: null,
    gugun: null,
    dong: null,
  },
  getters: {
    getSidoList(state) {
      return state.sidolist;
    },
    getGugunList(state) {
      return state.gugunlist;
    },
    getDongList(state) {
      return state.donglist;
    },
    getApt(state) {
      return state.aptlist;
    },
    getSido(state) {
      return state.sido;
    },
    getGugun(state) {
      return state.gugun;
    },
    getDong(state) {
      return state.dong;
    },
  },
  mutations: {
    setSidoList(state, payload) {
      state.sidolist = payload;
    },
    setGugunList(state, payload) {
      state.gugunlist = payload;
    },
    setDongList(state, payload) {
      state.donglist = payload;
    },
    setSido(state, payload) {
      state.sido = payload;
    },
    setGugun(state, payload) {
      state.gugun = payload;
    },
    setDong(state, payload) {
      state.dong = payload;
    },
    setApt(state, payload) {
      state.aptlist = payload;
    },
  },
  actions: {},
  modules: {},
});
