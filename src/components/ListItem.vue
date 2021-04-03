<template>
  <div>
    <ul class="feed-list">
      <li v-for="item in listItems" v-bind:key="item" class="post">
        {{ item.title }}
        <!-- <div class="points">
          {{ item.points || 0 }}
        </div>
        <div>
          <p class="feed-title">
            <a v-if="item.domain" :href="item.url">{{ item.title }}</a>
            <router-link v-else :to="`item/${item.id}`">{{
              item.title
            }}</router-link>
          </p>
          <small class="link-text">
            {{ item.time_ago }}
            <template v-if="item.user">
              by
              <router-link :to="`/user/${item.user}`" class="link-text">{{
                item.user
              }}</router-link>
            </template>
            <template v-else
              >,
              <a :href="item.url">{{ item.domain }}</a>
            </template>
          </small>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      listItems() {
        return this.$store.state.list;
      },
    },
  };
</script>

<style></style>
