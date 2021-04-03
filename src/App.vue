<template>
  <div id="app">
    <top-title></top-title>
    <transition name="page">
      <router-view></router-view>
    </transition>
    <spinner :loading="loadingStatus"></spinner>
  </div>
</template>

<script>
  import TopTitle from "./components/TopTitle.vue";
  import Spinner from "./components/Spinner.vue";
  import bus from "./utils/bus.js";

  export default {
    name: "App",
    components: {
      TopTitle,
      Spinner,
    },
    data() {
      return {
        loadingStatus: false,
      };
    },
    methods: {
      startSpinner() {
        this.loadingStatus = true;
      },
      endSpinner() {
        this.loadingStatus = false;
      },
    },
    created() {
      bus.$on("start:spinner", this.startSpinner);
      bus.$on("end:spinner", this.endSpinner);
    },
    beforeDestroy() {
      bus.$off("start:spinner", this.startSpinner);
      bus.$off("end:spinner", this.endSpinner);
    },
  };
</script>
