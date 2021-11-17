<template>
  <div
    class="table standard"
    v-bind:class="{ 'dark-mode': darkModeOn }"
    :style="{ height: tableHeight + '%' }"
  >
    <div class="t-body">
      <div v-for="(array, index) in content" v-bind:key="index" class="items">
        <p
          :style="{ width: columnsWidth + 'px' }"
          v-for="(item, index) in array"
          v-bind:key="index"
        >
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleTable",
  props: {
    //content: Array,
    content: {
      type: Array,
      default: () => {
        return [[""]];
      },
    },
    data() {
      return {
        receiveContentList: this.content,
      };
    },
    tableHeight: { type: [String, Number] },
    columnsWidth: { type: [String, Number], default: 100 },
    darkModeOn: { type: Boolean, default: false },
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
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  padding: 10px 0;
  color: var(--color-5);
  transition: all 0.3s ease 0s;
}
.items:nth-child(even) {
  background-color: var(--color-3);
  border-radius: 5px;
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
.search {
  height: 35px;
  width: 50%;
  max-width: 500px;
  border-radius: 20px;
  outline: none;
  border: 3px solid var(--color-1);
  padding: 0 20px;
  font-family: "Varela Round", sans-serif;
  color: var(--color-5);
  background: var(--background);
}
.wrapper-search {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.icon-search {
  fill: var(--color-2);
}
.search::placeholder {
  color: var(--color-4);
  font-weight: bold;
  font-size: 15px;
}
.button-search {
  margin-left: -45px;
  border-radius: 20px;
  height: 30px;
  width: 40px;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: var(--color-1);
  transition: all 0.3s ease 0s;
}
.button-search:hover {
  background-color: var(--color-4);
}
</style>
