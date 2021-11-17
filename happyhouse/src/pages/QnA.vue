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
          <h1>Q&A 게시판</h1>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title">문의 내역</h3>
        <div class="content">
          <card>
            <simple-table :content="arrayOfContent"></simple-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { SimpleTable, Card } from "@/components";

export default {
  name: "qna-page",
  bodyClass: "qna-page",
  components: {
    SimpleTable,
    Card,
  },
  data() {
    return {
      arrayOfContent: [],
    };
  },
  created() {
    axios.get("http://localhost:9999/api/question").then((resp) => {
      this.arrayOfContent = resp["data"];
    });
  },
};
</script>
<style></style>
