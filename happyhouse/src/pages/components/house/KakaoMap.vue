<template>
  <!-- <div> -->
  <!-- <div>{{ sidolistvuex }}</div> -->
  <div id="map" class="flex" style="width: 100%; height: 100%"></div>
  <!-- </div> -->
</template>

<script>
import axios from "axios";

export default {
  name: "KakaoMap",
  data() {
    return {
      sidolist_init: [],
      datacnt: 0,
      geocoder: null,
      markers: [],
      map: null,
    };
  },
  mounted() {
    axios.get("http://localhost:9999/map/sido").then((resp) => {
      //   this.$store.commit("setSidoList", resp.data);
      this.sidolist_init = resp.data;
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
    });
  },
  watch: {
    datacnt() {
      if (this.datacnt == this.sidolist_init.length) {
        this.$store.commit("setSidoList", this.sidolist_init);
        this.displayMarker("Sido", this.sidolist_init);
      }
    },
    sido(val) {
      console.log("sido 바뀜???", val);
      this.gugun = null;
      this.dong = null;
      // 구군 좌표 가져오기
      //   this.datacnt = 0;
      axios
        .get("http://localhost:9999/map/gugun", {
          params: { sido: val.sidoCode },
        })
        .then(
          (resp) =>
            async function search() {
              await resp.data.forEach(
                (gugun) =>
                  async function search2() {
                    await this.geocoder.addressSearch(
                      val.sidoName + " " + gugun.gugunName,
                      (result, status) => {
                        // 정상적으로 검색이 완료됐으면
                        console.log(val.sidoName + " " + gugun.gugunName);
                        if (status === kakao.maps.services.Status.OK) {
                          //   console.log(new kakao.maps.LatLng(result[0].y, result[0].x));
                          gugun.latlng = new kakao.maps.LatLng(
                            Number(result[0].y),
                            Number(result[0].x)
                          );
                          //   this.datacnt++;
                        }
                      }
                    );
                  }
              );
              //   if (this.datacnt == resp.data.length) {
              console.log(resp.data);
              this.displayMarker("Gugun", resp.data);
              this.gugunlist = resp.data;
              //   } else {
              // console.log(resp.data, this.datacnt);
              //   }
            }
        );
    },
    gugun(val) {
      console.log("gugun 바뀜!!!", val);
      // 동 좌표 가져오기
      axios
        .get("http://localhost:9999/map/dong", {
          params: { gugun: this.gugun.gugunCode },
        })
        .then((resp) => {
          resp.data.forEach((dong) => {
            this.geocoder.addressSearch(
              this.sido.sidoName + " " + val.gugunName + " " + dong.dongName,
              (result, status) => {
                console.log(
                  this.sido.sidoName + " " + val.gugunName + " " + dong.dongName
                );
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                  //   console.log(new kakao.maps.LatLng(result[0].y, result[0].x));
                  dong.latlng = new kakao.maps.LatLng(
                    Number(result[0].y),
                    Number(result[0].x)
                  );
                  //   this.datacnt++;
                }
              }
            );
          });
          //   if (this.datacnt == resp.data.length) {
          console.log(resp.data);
          this.displayMarker("Dong", resp.data);
          this.donglist = resp.data;
        });
    },
    dong(val) {
      console.log("dong 바뀜!!!!!", val);
      // 아파트 정보 + 좌표 가져오기
    },
  },
  computed: {
    sidolist() {
      return this.$store.getters.getSidoList;
    },
    gugunlist: {
      get() {
        return this.$store.getters.getGugunList;
      },
      set(val) {
        this.$store.commit("setGugunList", val);
      },
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
    moveCenter() {
      var level = this.map.getLevel();
      this.map.setCenter();
      this.map.setLevel(level - 3);
    },
    displayMarker(name, array) {
      console.log(name, array);
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      if (array.length > 0) {
        this.markers = array.map((ary) => {
          const marker = new kakao.maps.Marker({
            map: this.map,
            // title: position.count,
            position: ary.latlng,
            clickable: true,
          });
          console.log(ary.count);
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커 클릭 이벤트 등록
            // 클릭하면 화면 레벨 줄여주자!
            // 시도->구군->법정동->아파트 단지
            var level = this.map.getLevel();
            // 클릭한 마커를 해당 요소의 데이터로 설정 - 시도/구군/법정동
            this.$store.commit("set" + name, ary);
            console.log(level);
            // 클릭한 위치를 중심으로 확대
            this.map.setCenter(ary.latlng);
            this.map.setLevel(level - 3);
            console.log(level - 3);
          });
          console.log(ary.latlng);
          return marker;
        });
      }
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(36.2683, 127.6358),
        level: 12,
      };

      // 지도를 생성합니다
      this.map = new kakao.maps.Map(container, options);
      // 주소-좌표 변환 객체를 생성합니다
      this.geocoder = new kakao.maps.services.Geocoder();

      //   this.datacnt = 0;
      this.sidolist_init.forEach((sido) => {
        // console.log(this.findPlace(sido.sidoName));
        this.geocoder.addressSearch(sido.sidoName, (result, status) => {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            // console.log(new kakao.maps.LatLng(result[0].y, result[0].x));
            sido.latlng = new kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x)
            );
            this.datacnt++;
          }
        });
      });
    },
  },
};
</script>

<style>
</style>