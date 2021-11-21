<template>
  <div class="main-flex">
    <div class="container-flex">
      <!-- map start -->
      <div class="map-flex">
        <div id="map" class="flex" style="width: 100%; height: 100%"></div>
        <!-- 법정동 selector start -->
        <div class="text-center mb-2 selector">
          <div
            class="form-group p-2"
            style="background-color: white; border-radius: 5px"
          >
            <select class="btn btn-primary" v-model="sido" @change="getGugun">
              <option value="">시도</option>
              <option value="0">선택</option>
              <option
                v-for="sido in sidolist"
                :key="sido.sidoCode"
                :value="sido.sidoCode"
              >
                {{ sido.sidoName }}
              </option>
            </select>
            <select class="btn btn-primary" v-model="gugun" @change="getDong">
              <option value="">구군</option>
              <option value="0">선택</option>
              <option
                v-for="gugun in gugunlist"
                :key="gugun.gugunCode"
                :value="gugun.gugunCode"
              >
                {{ gugun.gugunName }}
              </option>
            </select>
            <select class="btn btn-primary" v-model="dong" @change="getApt">
              <option value="">읍면동</option>
              <option value="0">선택</option>
              <option
                v-for="dong in donglist"
                :key="dong.dongCode"
                :value="dong.dongCode"
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
      <!-- map end -->
      <!-- 조회 테이블 start -->
      <div class="table-flex">
        <div class="table-layer">
          <div class="table-wrapper">
            <div class="table-tab">
              <div class="table-back">
                <div class=""></div>
              </div>
              <div></div>
            </div>
            <div class="table-content">
              <table class="table">
                <colgroup>
                  <col width="100" />
                  <col width="200" />
                  <col width="*" />
                  <col width="120" />
                  <col width="120" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>아파트이름</th>
                    <th class="text-center">주소</th>
                    <th>건축연도</th>
                    <th>최근거래금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(apt, index) in aptlist" :key="apt.aptCode">
                    <td>{{ index + 1 }}</td>
                    <td>{{ apt.aptName }}</td>
                    <td>
                      {{ apt.aptAddr }}
                    </td>
                    <td>{{ apt.buildYear }}</td>
                    <td>{{ apt.recentPrice }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- 조회 table end -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Checkbox, DropDown } from "@/components";

export default {
  name: "house-page",
  bodyClass: "house-page",
  components: {
    [Checkbox.name]: Checkbox,
    DropDown,
  },
  data() {
    return {
      category: [],
      checked: [],
      sidolist: [],
      gugunlist: [],
      donglist: [],
      sido: "",
      gugun: "",
      dong: "",
      aptlist: null,
      start: 0,
      unit: 5,
      map: null,
      markers: [],
      infowindow: null,
    };
  },
  created() {
    axios.get("http://localhost:9999/map/sido").then((resp) => {
      this.sidolist = resp["data"];
    });
    axios.get("http://localhost:9999/map/category").then((resp) => {
      this.category = resp["data"];
    });
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=fda17085e526213a297440847222d514&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 5,
      };

      // 지도를 생성합니다
      this.map = new kakao.maps.Map(container, options);
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(position.lat, position.lng)
      );
      console.log(positions);

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
    getGugun() {
      axios
        .get("http://localhost:9999/map/gugun", { params: { sido: this.sido } })
        .then((resp) => {
          this.gugunlist = resp["data"];
        });
    },
    getDong() {
      axios
        .get("http://localhost:9999/map/dong", {
          params: { gugun: this.gugun },
        })
        .then((resp) => {
          this.donglist = resp["data"];
        });
    },
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

          // 지도에 마커 표시
          if (this.markers.length > 0) {
            this.markers.forEach((marker) => marker.setMap(null));
          }

          const positions = this.aptlist.map(
            (position) => new kakao.maps.LatLng(position.lat, position.lng)
          );

          if (positions.length > 0) {
            this.markers = positions.map(
              (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                })
            );

            const bounds = positions.reduce(
              (bounds, latlng) => bounds.extend(latlng),
              new kakao.maps.LatLngBounds()
            );

            this.map.setBounds(bounds);
          }

          // console.log(this.aptlist);
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
  flex: 0 0 400px;
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
