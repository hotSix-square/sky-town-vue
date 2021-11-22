<template>
  <div class="main-flex">
    <div class="container-flex">
      <!-- map start -->
      <div class="map-flex">
        <!-- <div id="map" class="flex" style="width: 100%; height: 100%"></div> -->
        <kakao-map />
        <!-- 법정동 selector start -->
        <div class="text-center mb-2 selector">
          <div
            class="form-group p-2"
            style="background-color: white; border-radius: 5px"
          >
            <select class="btn btn-primary" v-model="sido">
              <option value="null">시도</option>
              <option value="0">선택</option>
              <option
                v-for="sido in sidolist"
                :key="sido.sidoCode"
                :value="sido"
              >
                {{ sido.sidoName }}
              </option>
            </select>
            <select class="btn btn-primary" v-model="gugun">
              <option value="null">구군</option>
              <option value="0">선택</option>
              <option
                v-for="gugun in gugunlist"
                :key="gugun.gugunCode"
                :value="gugun"
              >
                {{ gugun.gugunName }}
              </option>
            </select>
            <select class="btn btn-primary" v-model="dong">
              <option value="null">읍면동</option>
              <option value="0">선택</option>
              <option
                v-for="dong in donglist"
                :key="dong.dongCode"
                :value="dong"
              >
                {{ dong.dongName }}
              </option>
            </select>
            <drop-down class="nav-item" title="주변 편의시절">
              <div v-for="(cat, index) in category" :key="index">
                <input
                  type="checkbox"
                  :id="cat.code"
                  :value="cat.code"
                  v-model="checked"
                />
                <label :for="cat.code">{{ cat.name }}</label>
              </div>
            </drop-down>
          </div>
        </div>
      </div>
      <!-- 법정동 selector end -->
      <apt-table />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Checkbox, DropDown } from "@/components";
import KakaoMap from "./components/house/KakaoMap.vue";
import AptTable from "./components/house/AptTable.vue";

export default {
  name: "house-page",
  bodyClass: "house-page",
  components: {
    [Checkbox.name]: Checkbox,
    DropDown,
    KakaoMap,
    AptTable,
  },
  data() {
    return {
      category: [],
      checked: [],
      aptlist: [],
      start: 0,
      unit: 5,
      datacnt: 0,
    };
  },
  computed: {
    sidolist() {
      return this.$store.getters.getSidoList;
    },
    gugunlist() {
      return this.$store.getters.getGugunList;
    },
    donglist: {
      get() {
        return this.$store.getters.getDongList;
      },
      set(val) {
        this.$store.commit("setDongList", val);
      },
    },
    sido: {
      get() {
        return this.$store.getters.getSido;
      },
      set(val) {
        this.$store.commit("setSido", val);
      },
    },
    gugun: {
      get() {
        return this.$store.getters.getGugun;
      },
      set(val) {
        this.$store.commit("setGugun", val);
      },
    },
    dong: {
      get() {
        return this.$store.getters.getDong;
      },
      set(val) {
        this.$store.commit("setDong", val);
      },
    },
  },
  methods: {
    // getGugun() {
    //   // this.$store.dispatch("asyncGugun");
    //   this.donglist = [];
    //   this.gugun = null;
    //   this.dong = null;
    //   // 지도 위치 조정
    //   // const sido = this.sidolist.filters((sido) => sido.sidoCode == this.sido);
    //   // console.log(sido);
    //   // this.map.setCenter(position.latlng);
    // },
    // getDong() {
    //   // this.$store.dispatch("asyncDong");
    //   this.dong = null;
    // },
    getApt() {
      axios
        .get("http://localhost:9999/map/apt", {
          params: {
            dong: this.dong,
            start: this.start,
            cnt: this.unit,
          },
        })
        .then((resp) => {
          this.aptlist = resp["data"];
        });
    },
  },
};
</script>
<style scoped>
.main-flex {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container-flex {
  flex: 1 1 0%;
  display: flex;
}
.map-flex {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.table-flex {
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.table-layer {
  position: absolute;
  inset: 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.table-wrapper {
  position: absolute;
  inset: 0px;
  overflow: hidden;
  flex: 1 1 0%;
  max-width: 100%;
}
.table-tab {
  align-items: center;
  border-bottom-color: rgb(225, 225, 225);
  border-bottom-width: 1px;
  flex-direction: row;
  height: 56px;
  overflow: visible;
  padding-right: 13px;
}
.table-content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}
.selector {
  position: absolute;
  left: 20px;
  top: 80px;
  z-index: 1;
}
.selector select {
  margin-top: 0;
}
</style>
