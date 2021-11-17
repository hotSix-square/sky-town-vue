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


# 뉴스기사 크롤링
- 서버쪽과 ajax 통신을 통해 뉴스기사를 크롤링 해온다.
- ajax 통신으로 받은 데이터를 기반으로 vue template 를 구성해준다.


# 트러블 슈팅 정리
### 비동기처리의 props 로 데이터를 받았을떄 자식 컴포넌트에 data 반영이 안되었던 이유
- 인스턴스 생성 순서는 부모 -> 자식, 마운팅 순서는 자식->부모 이기 때문에 비동기 통신으로 온 데이터를 자식컴포넌트에 보낼 경우 문제가 생길 수 있다.
- 프로젝트에서 동작 순서
  - QnA 인스턴스가 생성되며 data는 우선 empty 한 값으로 props 가 넘어감
  - SimpleTable의 인스턴스가 생성되며 부모로 부터 받은 props가 empty인 채로(부모는 아직 비동기 통신중...ing) data에 빈값을 넣음
  - SimpleTable 컴포넌트가 다 마운팅 된 후 -> QnA가 마운팅 됨
  - QnA가 서버로 부터 데이터를 받아 data에 설정한다.
  - 그런데 SimpleTable의 data는 빈 객체를 레퍼런스 하고 있고, QnA의 data에 새로운 객체가 대입되므로, SimpleTable의 data는 반응적으로 업데이트되지 않음

- 해결방안
  - 1) 자식 데이터에 연결해서 쓸때 data()속성을 사용하지 않고, computed를 통해 사용할 수 있다.
  - 2) 자식 컴포넌트로 데이터를 넘길 때 if 문으로 조건을 걸어 null 이 아닌 상태로만 넘어갈 수 있게 해 준다.(프로젝트 적용)

- 결론
  - 이런 비동기적인 props를 전달받는 상황이라면 computed속성을 사용하는 것이 맞다.


