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
      clusterImage: [],
      customOverlay: [],
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
        this.displayCluster("Sido", this.sidolist_init);
      }
    },
    sido(val) {
      console.log("sido 바뀜???", val);
      this.gugun = null;
      this.dong = null;
      // 구군 좌표 가져오기
      axios
        .get("http://localhost:9999/map/gugun", {
          params: { sido: val.code },
        })
        .then((resp) => {
          resp.data.forEach((gugun) => {
            var addr = val.name + " " + gugun.name;
            this.findPlace(gugun, addr);
            // console.log(gugun);
          });
          console.log(resp.data);
          setTimeout(() => {
            this.gugunlist = resp.data;
            this.displayCluster("Gugun", this.gugunlist);
            // console.log("gugunlist", this.gugunlist);
          }, 1000);
        });
    },
    gugun(val) {
      console.log("gugun 바뀜!!!", val);
      this.dong = null;
      // 동 좌표 가져오기
      axios
        .get("http://localhost:9999/map/dong", {
          params: { gugun: val.code },
        })
        .then((resp) => {
          resp.data.forEach((dong) => {
            var addr = this.sido.name + " " + val.name + " " + dong.name;
            this.findPlace(dong, addr);
          });
          setTimeout(() => {
            this.donglist = resp.data;
            this.displayCluster("Dong", resp.data);
            // console.log("donglist", resp.data);
          }, 1000);
        });
    },
    dong(val) {
      console.log("dong 바뀜!!!!!", val);
      // 아파트 정보 + 좌표 가져오기
      axios
        .get("http://localhost:9999/map/apt", {
          params: {
            dong: val.code,
          },
        })
        .then((resp) => {
          //   this.aptlist = resp["data"];
          console.log(resp.data);
          resp.data.forEach((apt) => {
            this.findPlace(apt, apt.aptAddr);
          });
          console.log("resp.data.length", resp.data.length);
          setTimeout(() => {
            this.aptlist = resp.data;
            this.displayMarker("Apt", resp.data);
          }, 300 * resp.data.length);
        });
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
    aptlist: {
      get() {
        return this.$store.getters.getApt;
      },
      set(val) {
        this.$store.commit("setApt", val);
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
    // target node에 이벤트 핸들러를 등록하는 함수힙니다
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },
    clickCluster(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      // 클릭하면 화면 레벨 줄여주자!
      // 시도->구군->법정동->아파트 단지
      var level = this.map.getLevel();
      // 클릭한 마커를 해당 요소의 데이터로 설정 - 시도/구군/법정동
      //   this.$store.commit("set" + name, array[index]);
      this.$router.push({
        name: "grpApt",
      });
      console.log(level);
      // 클릭한 위치를 중심으로 확대
      this.map.setCenter(position);
      this.map.setLevel(level - 3);
      console.log(level - 3);
      var position = e.getPosition();
      console.log(position);
    },
    findPlace(object, addr) {
      this.geocoder.addressSearch(addr, (resp, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          //   console.log(new kakao.maps.LatLng(result[0].y, result[0].x));
          object.latlng = new Array(Number(resp[0].y), Number(resp[0].x));
        }
      });
    },
    displayCluster(name, array) {
      console.log(array);
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      if (this.customOverlay.length > 0) {
        this.customOverlay.forEach((over) => over.setMap(null));
      }

      const positions = array
        .map((arr) => arr.latlng)
        .map((position) => new kakao.maps.LatLng(...position));

      var avg = array.reduce((val, ary) => {
        return val + ary.amtAvg;
      }, 0);
      avg /= array.length;
      console.log(avg);
      var dev = array.reduce((val, ary) => {
        return val + Math.abs(avg - ary.amtAvg);
      }, 0);
      dev /= array.length;
      console.log(dev);
      if (positions.length > 0) {
        this.customOverlay = positions.map((position, index) => {
          var size, zidx;
          if (array[index].amtAvg > dev + avg) {
            size = "rgba(255, 54, 54, 0.9)";
            zidx = 5;
          } else if (array[index].amtAvg < dev + avg) {
            size = "rgba(2, 145, 251, 0.9)";
            zidx = 0;
          } else {
            size = "rgba(255, 178, 54, 0.9)";
            zidx = 3;
          }

          var content = document.createElement("div");
          content.className = "overlay";
          content.style = "cursor: pointer; background-color:" + size;
          var name = document.createElement("div");
          name.innerText = array[index].name;
          var avg = document.createElement("div");
          avg.innerText = array[index].amtAvg;
          content.appendChild(name);
          content.appendChild(avg);

          const customOverlay = new kakao.maps.CustomOverlay({
            map: this.map,
            position: position,
            content: content,
            zIndex: zidx,
            // image: this.clusterImage[size],
            clickable: true,
          });

          this.addEventHandle(content, "click", this.clickCluster);

          return customOverlay;
        });

        // this.customOverlay.setMap(this.map);

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayMarker(name, array) {
      //   console.log(name, array);
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = array
        .map((arr) => arr.latlng)
        .map((position) => new kakao.maps.LatLng(...position));
      //   console.log(positions);

      if (positions.length > 0) {
        this.markers = positions.map((position, index) => {
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: position,
            clickable: true,
          });
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커 클릭 이벤트 등록
            // 클릭하면 화면 레벨 줄여주자!
            // 시도->구군->법정동->아파트 단지
            var level = this.map.getLevel();
            // 클릭한 마커를 해당 요소의 데이터로 설정 - 시도/구군/법정동
            this.$store.commit("set" + name, array[index]);
            this.$router.push({
              name: "grpApt",
              //   query: { code: array[index].code },
            });
            console.log(level);
            // 클릭한 위치를 중심으로 확대
            this.map.setCenter(position);
            this.map.setLevel(level - 3);
            console.log(level - 3);
          });
          return marker;
        });

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
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

      //   const clusterImageSrc =
      //     "https://i1.daumcdn.net/localimg/localimages/07/mapjsapi/cluster.png";

      //   const origins = [0, 90, 180, 270, 360],
      //     size = [52, 56, 66, 78, 90];

      //   for (var i = 0; i < 5; i++) {
      //     var imageSize = new kakao.maps.Size(size[i], size[i]),
      //       imageOptions = {
      //         spriteOrigin: new kakao.maps.Point(0, origins[i]),
      //         spriteSize: new kakao.maps.Size(90, 450),
      //         shape: "circle",
      //         offset: new kakao.maps.Point(size[i] / 2, size[i] / 2),
      //       };

      //     this.clusterImage.push(
      //       new kakao.maps.MarkerImage(clusterImageSrc, imageSize, imageOptions)
      //     );
      //   }

      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      //   kakao.maps.event.addListener(this.map, "zoom_changed", () => {
      //     // 지도의 현재 레벨을 얻어옵니다
      //     var level = this.map.getLevel();
      //     this.displayMarker(level);
      //   });

      //   this.datacnt = 0;
      this.sidolist_init.forEach((sido) => {
        // console.log(this.findPlace(sido.sidoName));
        this.geocoder.addressSearch(sido.name, (result, status) => {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            // console.log(new kakao.maps.LatLng(result[0].y, result[0].x));
            sido.latlng = new Array(Number(result[0].y), Number(result[0].x));
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