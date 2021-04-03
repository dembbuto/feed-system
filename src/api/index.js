import axios from "axios";

function fetchList() {
  return axios.get("/api/list", {
    params: {
      page: 1,
      ord: "asc",
      category: [1, 2, 3],
      limit: 10,
    },
  });
}

function fetchCategory() {
  return axios.get("/api/category");
}

function fetchAds() {
  return axios.get("/api/ads", {
    params: { page: 1, limit: 10 },
  });
}

function fetchView(id) {
  return axios.get("/api/view", {
    params: { id: id },
  });
}

export { fetchList, fetchCategory, fetchAds, fetchView };