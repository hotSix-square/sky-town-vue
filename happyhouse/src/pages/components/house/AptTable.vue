<template>
  <!-- 조회 테이블 start -->
  <div class="table-flex">
    <div class="table-layer">
      <!-- 제목+ 뒤로 가기 -->
      <div class="table-wrapper table-content">
        <div class="table-icon">
          <div class="table-content" style="margin-left: 13px">
            <div class="tab-back" @click="back">
              <div style="pointer-events: none" class="table-content">
                <div class="icon-box table-content">
                  <div class="icon">
                    <i class="now-ui-icons arrows-1_minimal-left icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-title">
            {{ sido.name }}
            {{ gugun.name }}
            {{ dong.name }}
            <!-- {{ sido.name + " " + gugun.name + " " + dong.name }} -->
          </div>
          <div
            class="table-content"
            style="height: 11px; background-color: rgb(238, 238, 238)"
          ></div>
        </div>

        <!-- 리스트 상세 내용 -->
        <div class="table-content" style="flex: 1 1 0%">
          <div class="content-detail table-content">
            <!-- 제목, 단지 수, 세대 수 => 기본 정보 -->
            <div class="table-content">
              <div
                class="table-content"
                style="background-color: rgb(255, 255, 255); flex-basis: auto"
              >
                <div class="table-content detail-child">
                  <div class="title-box table-content">
                    <div class="table-content pm-set">
                      <div class="table-content title-div">
                        <div class="title table-content">
                          {{ apt.aptInfo.aptName }}
                        </div>
                        <div
                          class="table-content row-fd"
                          style="margin-left: 5px"
                        ></div>
                      </div>
                      <div
                        class="table-content"
                        style="
                          align-items: flex-start;
                          flex-direction: row;
                          overflow: visible;
                        "
                      >
                        <div class="table-content detail-data">
                          <div class="detail-text">
                            {{ apt.aptInfo.aptDongCnt }} 동 |
                            {{ apt.aptInfo.aptdaCnt }} 세대
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="table-content"
                style="height: 11px; background-color: rgb(238, 238, 238)"
              ></div>
            </div>
            <div
              class="table-content"
              style="background-color: rgb(255, 255, 255); flex-basis: auto"
            >
              <div class="table-content avg-box">
                <div class="table-content avg">
                  <div class="table-content avg-text">
                    <div class="avg-text-css">
                      약 {{ changeUnit(apt.aptAvg.amtAvg) }} |
                      {{ changeUnit(apt.aptAvg.areaAvg) }}/m2당
                    </div>
                  </div>
                </div>
                <div class="table-content min-max">
                  <div>
                    {{ changeUnit(apt.aptAvg.min) }} ~
                    {{ changeUnit(apt.aptAvg.max) }}
                  </div>
                </div>
              </div>
              <div
                class="table-content"
                style="height: 11px; background-color: rgb(238, 238, 238)"
              ></div>
            </div>
            <div class="table-content" style="flex: 1 1 auto">
              <div
                class="table-content"
                style="flex-basis: auto; background-color: rgb(255, 255, 255)"
              >
                <div
                  class="table-content aptlist-title"
                  style="background-color: rgb(255, 255, 255)"
                >
                  <div class="table-content aptlist-title-text">
                    <div
                      class="table-content"
                      style="
                        flex-direction: row;
                        align-items: center;
                        overflow: visible;
                      "
                    >
                      <div class="table-content list-text-title">
                        실거래가 정보
                      </div>
                    </div>
                  </div>
                  <div class="table-content plus-btn">
                    <div class="table-content plus-align-center">
                      <i class="now-ui-icons ui-1_simple-add"></i>
                    </div>
                  </div>
                  <div
                    class="table-content"
                    style="
                      background-color: rgba(0, 0, 0, 0);
                      inset: 0px;
                      position: absolute;
                    "
                  ></div>
                </div>
                <div
                  class="table-content"
                  style="background-color: rgba(0, 0, 0, 0)"
                >
                  <div
                    class="table-content"
                    style="background-color: rgb(238, 238, 238); height: 1px"
                  ></div>
                </div>
                <!-- for문 시작 -->
                <div
                  class="table-content"
                  v-for="(deal, index) in apt.aptDealList"
                  :key="index"
                >
                  <div
                    class="table-content"
                    style="background-color: rgb(255, 255, 255)"
                  >
                    <div class="table-content list-content">
                      <div
                        class="table-content"
                        style="
                          justify-content: center;
                          flex-direction: column;
                          flex: 1 1 0%;
                        "
                      >
                        <div
                          class="apt-name"
                          style="
                            font-size: 16px;
                            line-height: 21px;
                            margin-top: 0;
                            font-weight: bold;
                          "
                        >
                          {{ changeUnit(deal.dealAmount) }}
                        </div>
                        <div class="apt-name">
                          {{ deal.buildYear }} | {{ deal.dealArea }}m2
                        </div>
                        <div class="apt-name">
                          {{
                            deal.dealYear +
                            "." +
                            deal.dealMonth +
                            "." +
                            deal.dealDay
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- for문 끝 -->
              </div>
            </div>
            <div class="table-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 조회 table end -->
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    sidolist() {
      return this.$store.getters.getSidoList;
    },
    gugunlist() {
      return this.$store.getters.getGugunList;
    },
    donglist() {
      return this.$store.getters.getDongList;
    },
    aptlist: {
      get() {
        return this.$store.getters.getAptList;
      },
      set(val) {
        this.$store.commit("setAptList", val);
      },
    },
    apt: {
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
  watch: {},
  updated() {
    console.log("code##########", this.$route.params.code);
    var code = this.$route.params.code;
    console.log(code.length, typeof code.length);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changeUnit(data) {
      var len = data.length;
      var unit = "";
      if (len >= 5) {
        unit += data.substr(0, len - 4) + "억 ";
      }
      if (data.substr(len - 4, 1) != "0") {
        unit += data.substr(len - 4, 1) + "천";
      }
      return unit;
    },
  },
};
</script>

<style>
</style>