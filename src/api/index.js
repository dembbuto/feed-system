import axios from "axios";
// import qs from "qs";

function fetchList(listParams) {
  return axios.get("/api/list", {
    params: {
      page: listParams.page || 1,
      ord: listParams.ord || "asc",
      category: listParams.category || [1, 2, 3],
      limit: listParams.limit || 10,
    },
    // paramsSerializer: (params) => {
    //   return qs.stringify(params, { arrayFormat: "repeat" });
    // },
  });
}

function fetchCategory() {
  return axios.get("/api/category");
}

function fetchAds(adsParams) {
  return axios.get("/api/ads", {
    params: { page: adsParams.page || 1, limit: adsParams.limit || 3 },
  });
}

function fetchView(id) {
  return axios.get("/api/view", {
    params: { id: id },
  });
}

export { fetchList, fetchCategory, fetchAds, fetchView };
