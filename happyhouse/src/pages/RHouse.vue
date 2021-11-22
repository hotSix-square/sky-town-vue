<template>
  <div>
    <div class="page-header clear-filter" filter-color="blue">
      <parallax
        class="page-header-image"
        style="background-image: url('img/header.jpg')"
      >
  
      </parallax>
      
    </div>

    <div>
      <b-jumbotron
        v-for="index in infos"
        :key="index"
        v-bind:style="styleObject"
      >
        <template #header>아파트 번호:{{index.itemID}}</template>

        <template #lead>
          별점: {{index.value}}
        </template>

        <hr class="my-4" />

        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>

        <b-button variant="primary" href="#">Do Something</b-button>
        <b-button variant="success" href="#">Do Something Else</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>
<script>
import http from "@/util/http-common";

export default {
  name: "RHouse",
  data() {
    return {
      is_show: false,
      infos: {},
      styleObject: {
        margin: "50px",
        padding: "20px",
      },
    };
  },
  created() {
    http.get(`/recommend`).then(({ data }) => {
      this.infos = data;
      console.log(this.infos);
    });
  },
};
</script>

<style></style>
