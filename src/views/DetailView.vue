<template>
  <div>
    <section>
      <h2>{{ viewItems.data.title }}</h2>
    </section>
    <section>
      <div v-html="viewItems.data.contents"></div>
    </section>
  </div>
</template>

<script>
  export default {
    computed: {
      viewItems() {
        return this.$store.state.view;
      },
    },
    created() {
      const itemId = this.$route.params.id;
      this.$store.dispatch("FETCH_VIEW", itemId);
    },
  };
</script>

<style></style>
