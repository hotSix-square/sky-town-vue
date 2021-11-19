<template>
  <div>
    <div class="page-header clear-filter" filter-color="blue">
      <parallax
        class="page-header-image"
        style="background-image: url('img/header.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <h1>부동산</h1>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">주택 정보 조회</h3>
        <!-- 법정동 selecter start -->
        <div class="text-center mb-2">
          <div class="form-group">
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
        <!-- 법정동 selecter end -->
        <!-- 조회 테이블 start -->
        <div class="row my-4">
          <div class="col-lg-12">
            <div class="container p-0">
              <table class="table mt-2">
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
                      {{
                        apt.sidoName +
                        " " +
                        apt.gugunName +
                        " " +
                        apt.dongName +
                        " " +
                        apt.jibun
                      }}
                    </td>
                    <td>{{ apt.buildYear }}</td>
                    <td>{{ apt.recentPrice }}</td>
                  </tr>
                </tbody>
              </table>
              <select
                class="btn btn-primary"
                v-model="unit"
                @change="getApt"
                style="position: absolute"
              >
                <option value="5">5개씩 보기</option>
                <option value="10">10개씩 보기</option>
                <option value="15">15개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="40">40개씩 보기</option>
                <option value="60">60개씩 보기</option>
              </select>
              <nav aria-label="Page navigation">
                <ul
                  class="
                    pagination pagination-circle
                    pg-blue
                    justify-content-center
                  "
                  id="pagination"
                >
                  <li class="page-item"><a class="page-link">i</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <!-- map start -->
          <div class="col-lg-12 my-3">
            <div id="map" style="width: 100%; height: 40rem"></div>
            <!-- <kakao-map :positions="aptlist" /> -->
          </div>
          <!-- map end -->
        </div>
        <!-- 조회 table end -->
      </div>
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
      price: 0,
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
            price: this.price,
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
<style></style>
