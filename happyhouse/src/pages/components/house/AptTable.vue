<template>
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
</template>

<script>
export default {};
</script>

<style>
</style>