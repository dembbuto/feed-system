import Vue from "vue";
import Vuex from "vuex"; // 상태 관리 도구
import { fetchList, fetchCategory, fetchAds, fetchView } from "../api/index.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    list: [],
    category: [],
    ads: [],
    view: {},
  },
  actions: {
    async FETCH_LIST({ commit }, params) {
      try {
        const response = await fetchList(params);
        commit("SET_LIST", response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async FETCH_CATEGORY({ commit }) {
      try {
        const response = await fetchCategory();
        commit("SET_CATEGORY", response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async FETCH_ADS({ commit }) {
      try {
        const response = await fetchAds();
        commit("SET_ADS", response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async FETCH_VIEW({ commit }, id) {
      try {
        const response = await fetchView(id);
        commit("SET_VIEW", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_LIST(state, list) {
      state.list = list;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_ADS(state, ads) {
      state.ads = ads;
    },
    SET_VIEW(state, view) {
      state.view = view;
    },
  },
});
