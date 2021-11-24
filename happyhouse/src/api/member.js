import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(success, fail) {
  await api.post(`http://localhost:9999/naver/getuserlogin`).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`http://localhost:9999/naver/getuserinfo/${userid}`).then(success).catch(fail);
}

// function logout(success, fail)

export { login, findById };
