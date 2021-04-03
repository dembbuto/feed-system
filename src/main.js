import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import { router } from "./routes/index.js";
import { store } from "./store/index.js";

Vue.config.productionTip = false;

// baseURL 기본값을 정의한다
axios.defaults.baseURL = "https://problem.comento.kr";
axios.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    params.append(key, paramObj[key]);
  }

  return params.toString();
};

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
