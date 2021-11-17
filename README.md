# pjt_daejeon_6th_class4_vue_team04

# 개발자
김지언, 송예인

# 기능
오전

- [x]  데이터베이스 구축
- [x]  Backend 서버 구축

오후

- [x]  메뉴에 QnA 게시판 추가 - 기본(필수) 기능
- [x]  QnA 게시글 목록 서비스 - 기본(필수) 기능
- [x]  QnA 게시글 입력 서비스 - 기본(필수) 기능
- [x]  QnA 게시글 수정, 삭제, 상세 검색 서비스 - 기본(필수) 기능
- [X]  추가 기능 Vue에 적용

저녁

- [ ]  결과(산출물) 작성

# 기본(필수) 기능
- QnA 게시글 목록 서비스
[1](./happyhouse/github/1.png)
[2](./happyhouse/github/2.png)
```javascript
<template>
  <div
    class="table standard"
    v-bind:class="{ 'dark-mode': darkModeOn }"
    :style="{ height: tableHeight + '%' }"
  >
    <div class="t-body">
      <div
        v-for="(array, index) in questionList"
        v-bind:key="index"
        @click="clickList(array.no, index)"
      >
        <div class="items">
          <badge
            :type="array.state == '답변대기' ? 'default' : 'primary'"
            class="text-center mb-0"
            >{{ array.state }}</badge
          >
          <div class="col-1 text-center">{{ array.no }}</div>
          <div class="col">{{ array.title }}</div>
          <div class="col-2 text-center">{{ array.writer }}</div>
          <div class="col-2 text-center">{{ array.dateTime }}</div>
        </div>
        <template v-if="isActive[index]">
          <div>{{ array.content }}</div>
          <template v-if="array.answer != null">
            <div>{{ array.answer.content }}</div>
            <div>{{ array.answer.dateTime }}</div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Badge } from "@/components";

export default {
  name: "SimpleTable",
  components: {
    Badge,
  },
  props: {
    content: {
      type: Array,
    },
    tableHeight: { type: [String, Number] },
    columnsWidth: { type: [String, Number], default: 100 },
    darkModeOn: { type: Boolean, default: false },
  },
  data() {
    return {
      questionList: [],
      isActive: [],
    };
  },
  created() {
    this.questionList = this.content;
    this.isActive = new Array(this.questionList.length);
    // console.log(this.questionList);
  },
  methods: {
    clickList(no, index) {
      if (this.questionList[index].answer === null) {
        axios.get("http://localhost:9999/api/answer/" + no).then((resp) => {
          this.questionList[index].answer = resp["data"];
          console.log(this.questionList[index]);
        });
      }
      // console.log(resp["data"]);
      this.isActive[index] = !this.isActive[index];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
.standard {
  --background: #fff;
  --color-1: #f0f0f7;
  --color-2: #b1b3c4;
  --color-3: #f5f5f7;
  --color-4: #e4e5f1;
  --color-5: #4b4a54;
}
.dark-mode {
  --background: #151618;
  --color-1: #222426;
  --color-2: #bfc0c1;
  --color-3: #191a1c;
  --color-4: #27282c;
  --color-5: #b9b9ba;
}
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-4);
  border-radius: 5px;
}
p {
  margin: 0;
  padding: 0;
}
.table {
  background: var(--background);
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  height: fit-content;
  font-family: "Varela Round", sans-serif;
  font-weight: 600;
  position: relative;
  overflow-y: auto;
}
.titles {
  display: flex;
  flex-direction: row;
  background: var(--color-1);
  padding: 15px 0;
  border-radius: 5px;
}
.titles p {
  padding: 0 10px;
  color: var(--color-2);
}
.items {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  padding: 10px 0;
  color: var(--color-5);
  transition: all 0.3s ease 0s;
  justify-content: space-between;
  align-items: center;
}
.items:nth-child(even) {
  background-color: var(--color-3);
  /* border-radius: 5px; */
}
.items:hover {
  background: var(--color-1);
  border-radius: 5px;
}
.items p {
  padding: 0 10px;
}
.t-body {
  margin-top: 20px;
}
</style>

```

- 메뉴에 QnA 게시판 추가
[1](./happyhouse/github/1.png)
