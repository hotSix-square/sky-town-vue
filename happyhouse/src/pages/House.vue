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
            <select class="btn btn-primary" v-model="sido">
              <option value="">시도</option>
              <option value="0">선택</option>
            </select>
            <select class="btn btn-primary" v-model="gugun">
              <option value="">구군</option>
              <option value="0">선택</option>
            </select>
            <select class="btn btn-primary" v-model="dong">
              <option value="">읍면동</option>
              <option value="0">선택</option>
            </select>
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
                <tbody id="searchResult"></tbody>
              </table>
              <select
                class="btn btn-primary"
                id="unit"
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
            <kakao-map />
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
import { KakaoMap } from "@/components";

export default {
  name: "house-page",
  bodyClass: "house-page",
  components: {
    KakaoMap,
  },
  data() {
    return {
      sido: "",
      gugun: "",
      dong: "",
    };
  },
  created() {
    axios.get("http://localhost:9999/map/sido").then((resp) => {
      console.log(resp);
    });
  },
};
</script>
<style></style>
