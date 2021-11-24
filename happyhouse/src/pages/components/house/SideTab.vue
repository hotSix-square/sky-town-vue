<template>
  <!-- 조회 테이블 start -->
  <div class="table-flex">
    <div class="table-layer">
      <!-- 제목+ 뒤로 가기 -->
      <div class="table-wrapper table-content">
        <div class="table-icon">
          <div class="table-content" style="margin-left: 13px">
            <div class="tab-back">
              <div style="pointer-events: none" class="table-content">
                <div class="icon-box table-content">
                  <div class="icon">
                    <i class="now-ui-icons arrows-1_minimal-left icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-title">{{ sido.name }}</div>
        </div>
      </div>

      <!-- 리스트 상세 내용 -->
      <div class="table-content">
        <div class="content-detail">
          <div class="table-content">
            <div class="table-content"></div>
            <div class="table-content"></div>
            <div class="table-content" style="flex: 1 1 auto"></div>
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
  props: {
    title: String,
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
};
</script>

<style>
</style>