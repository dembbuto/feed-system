import Vue from "vue";
import VueRouter from "vue-router";
import ListView from "../views/ListView.vue";
import DetailView from "../views/DetailView.vue";
// import bus from "../utils/bus.js";
// import { store } from "../store/index.js";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/list",
    },
    {
      // path: url 주소
      path: "/list",
      name: "list",
      // component: url 주소로 갔을 때 표시될 컴포넌트
      component: ListView,
      // beforeEnter: (to, from, next) => {
      //   bus.$emit("start:spinner");
      //   store
      //     .dispatch("FETCH_LIST", to.name)
      //     .then(() => {
      //       next();
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // },
    },
    {
      path: "/detail/:id",
      component: DetailView,
    },
  ],
});
