import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidolist: [],
    gugunlist: [],
    donglist: [],
    sido: null,
    gugun: null,
    dong: null,
    map: null,
    geocoder: null,
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
    getMap(state) {
      return state.map;
    },
    getGeocoder(state) {
      return state.geocoder;
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
    setMap(state, payload) {
      state.map = payload;
    },
    setGeocoder(state, payload) {
      state.geocoder = payload;
    },
  },
  actions: {
    // asyncSido(context) {
    //   axios.get("http://localhost:9999/map/sido").then((resp) => {
    //     context.commit("setSidoList", resp.data);
    //     //   this.$store.commit("setSidoList", resp.data);
    //     // this.sidolist_init = resp.data;
    //     if (window.kakao && window.kakao.maps) {
    //       this.initMap();
    //     } else {
    //       const script = document.createElement("script");
    //       /* global kakao */
    //       script.onload = () => kakao.maps.load(this.initMap);
    //       script.src =
    //         "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=fda17085e526213a297440847222d514&libraries=services";
    //       document.head.appendChild(script);
    //     }
    //   });
    // },
    // asyncGugun(context) {
    //   axios
    //     .get("http://localhost:9999/map/gugun", { params: { sido: context.state.sido.sidoCode } })
    //     .then((resp) => {
    //       context.commit("setGugunList", resp.data);
    //       // this.gugunlist = resp["data"];
    //     });
    // },
    // asyncDong(context) {
    //   axios
    //     .get("http://localhost:9999/map/dong", {
    //       params: { gugun: context.state.gugun.gugunCode },
    //     })
    //     .then((resp) => {
    //       context.commit("setDongList", resp.data);
    //       // this.donglist = resp["data"];
    //     });
    // },
  },
  modules: {},
});
