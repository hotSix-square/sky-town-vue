<template>
  <div id="Index">
    <div class="page-header clear-filter" filter-color="blue">
      <parallax
        class="page-header-image"
        style="background-image: url('img/header.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <h3>Welcome To Our Site!</h3>
          <h1 style="font-weight: bold">IT'S NICE TO MEET YOU</h1>
          <n-button
            type="primary"
            size="lg"
            @click="$router.push({ name: 'map' })"
            >Find House</n-button
          >

          <n-button
            type="primary"
            size="lg"
            @click="$router.push({ name: 'recommendhouse' })"
            >매물 추천받기</n-button
          >
          <p>
            <img
              :src="cutty"
              alt="챗봇"
              @click="handle_toggle()"
              width="100"
              height="100"
            />

            <!-- <n-button type="primary" size="lg" @click="handle_toggle"
            >ChatBot</n-button
          > -->
          </p>

          <div v-show="is_show">
            <Chat />

            <!-- <button @click="handle_toggle" type="button">닫기</button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="section section-team text-center">
      <div class="container">
        <h2 class="title">Here is our team</h2>
        <div class="team">
          <div class="row">
            <div class="col-md-6">
              <div class="team-player">
                <img
                  src="img/profile2.jpg"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">Kim Jiun</h4>
                <p class="category text-primary">Member</p>

                <a href="#pablo" class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-twitter"></i
                ></a>
                <a href="#pablo" class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-linkedin"></i
                ></a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="team-player">
                <img
                  src="img/profile1.jpg"
                  alt="Thumbnail Image"
                  class="rounded-circle img-fluid img-raised"
                />
                <h4 class="title">Song Yein</h4>
                <p class="category text-primary">Member</p>

                <a href="#pablo" class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-google-plus"></i
                ></a>
                <a href="#pablo" class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-youtube"></i
                ></a>
                <a href="#pablo" class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-twitter"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="hero-images-container">
                <img src="img/hero-image-1.png" alt="" />
              </div>
              <div class="hero-images-container-1">
                <img src="img/hero-image-2.png" alt="" />
              </div>
              <div class="hero-images-container-2">
                <img src="img/hero-image-3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <basic-elements></basic-elements>
    <navigation></navigation>
    <tabs-section></tabs-section>
    <progress-pagination></progress-pagination>
    <notifications></notifications>
    <typography></typography>
    <javascript-components></javascript-components>
    <carousel-section></carousel-section>
    <nucleo-icons-section></nucleo-icons-section>
    <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">Completed with examples</h2>
            <h5 class="description">
              The kit comes with three pre-built pages to help you get started
              faster. You can change the text and images and you're good to go.
              More importantly, looking at them will give you a picture of what
              you can built with this powerful Bootstrap 4 ui kit.
            </h5>
          </div>
        </div>
      </div>
    </div>
    <signup-form></signup-form>
    <examples-section></examples-section>
    <download-section></download-section>
  </div>
</template>
<script>
import { Button, Parallax } from "@/components";
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/Navigation";
import TabsSection from "./components/Tabs";
import ProgressPagination from "./components/ProgressPagination";
import Notifications from "./components/Notifications";
import Typography from "./components/Typography";
import JavascriptComponents from "./components/JavascriptComponents";
import CarouselSection from "./components/CarouselSection";
import NucleoIconsSection from "./components/NucleoIconsSection";
import SignupForm from "./components/SignupForm";
import ExamplesSection from "./components/ExamplesSection";
import DownloadSection from "./components/DownloadSection";
import Chat from "./Chat.vue";
// import SockJS from "sockjs-client";
// import Stomp from "webstomp-client";

export default {
  name: "Index",
  bodyClass: "index-page",
  components: {
    Parallax,
    [Button.name]: Button,
    BasicElements,
    Navigation,
    TabsSection,
    ProgressPagination,
    Notifications,
    Typography,
    JavascriptComponents,
    CarouselSection,
    NucleoIconsSection,
    SignupForm,
    ExamplesSection,
    DownloadSection,
    Chat,
  },
  data() {
    return {
      is_show: false,
      cutty: require("../assets/img/chatbot.png"),
    };
  },
  methods: {
    handle_toggle() {
      this.is_show = !this.is_show;
    },
    // connect() {
    //   var socket = new SockJS("http://localhost:9999/ws");
    //   this.stompClient = Stomp.over(socket);
    //   this.stompClient.connect({}, (frame) => {
    //     // this.setConnected(true);
    //     // this.connected = true;
    //     this.isConnect = true;
    //     console.log("Connected: " + frame);

    //     this.stompClient.subscribe("/topic/public", (message) => {
    //       this.message.push("받은 메시지: " + message.body);
    //       //   this.showMessage("받은 메시지: " + message.body); //서버에 메시지 전달 후 리턴받는 메시지
    //     });
    //   });
    // },
  },
};
</script>
<style>
</style>
