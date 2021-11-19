<template>
  <div class="section">
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="connect">웹소켓 연결:</label>
              <button
                v-show="connected"
                id="connect"
                class="btn btn-default"
                type="submit"
                @click="connect"
                
              >
                연결
              </button>
              <button
                v-show="!connected"
                id="disconnect"
                class="btn btn-default"
                type="submit"
                disabled="disabled"
                @click="disconnect"
              >
                해제
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="form-inline" @submit.prevent>
            <div class="form-group">
              <label for="msg">문의사항</label>
              <input
                type="text"
                v-model="msg"
                class="form-control"
                placeholder="내용을 입력하세요...."
              />
            </div>
            <button
              v-show="!connected"
              id="send"
              class="btn btn-default"
              disabled
              type="submit"
              @click="sendMessage"
            >
              보내기
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table
            id="conversation"
            class="table table-striped"
            v-show="connected"
          >
            <thead>
              <tr>
                <th>메세지</th>
              </tr>
            </thead>
            <tbody id="communicate">
              <tr v-for="(msg, index) in message" :key="index">
                <td>{{ msg }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "chat-page",
  components: {},
  data() {
    return {
      stompClient: null,
      message: [],
      msg: "",
      connected: true,
    };
  },
  methods: {
    setConnected(connected) {
      //   $("#connect").prop("disabled", connected);
      //   $("#disconnect").prop("disabled", !connected);
      //   $("#send").prop("disabled", !connected);
      this.connected = connected;
      //   if (connected) {
      //     $("#conversation").show();
      //   } else {
      //     $("#conversation").hide();
      //   }
      //   $("#msg").html("");
      this.msg = "";
    },
    connect() {
      console.log('connected!!');
      var socket = new SockJS("http://localhost:9999/ws");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, function (frame) {
        // this.setConnected(true);

        //this.connected = true;
        //this.message = "";
        console.log("Connected: " + frame);
        this.stompClient.subscribe("/topic/public", function (message) {
          this.message.push("받은 메시지: " + message.body);
          //   this.showMessage("받은 메시지: " + message.body); //서버에 메시지 전달 후 리턴받는 메시지
        });
      });
    },
    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      // this.setConnected(false);
      this.connected = false;
      this.message = "";
      console.log("Disconnected");
    },
    sendMessage() {
      //   let message = $("#msg").val();
      //   this.showMessage("보낸 메시지: " + this.msg);
      this.message.push("보낸 메시지: " + this.msg);

      this.stompClient.send("/sendMessage", {}, JSON.stringify(this.msg)); //서버에 보낼 메시지
    },
    // showMessage(message) {
    //   $("#communicate").append("<tr><td>" + message + "</td></tr>");
    // },
  },
};
</script>

<style></style>
