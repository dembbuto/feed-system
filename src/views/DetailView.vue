<template>
  <div class="detail-wrap">
    <section class="detail-main">
      <section>
        <h2>{{ viewItems.data.title || "" }}</h2>
      </section>
      <section>
        {{ viewItems.data.contents }}
      </section>
      <section class="created_at">
        created_at({{ viewItems.data.created_at.substr(0, 10) }})
      </section>
    </section>

    <div class="reply-nums">
      답변
      <span class="reply-nums-number">{{ viewItems.data.reply.length }}</span>
    </div>

    <section
      class="detail-reply"
      v-for="reply in viewItems.data.reply"
      v-bind:key="reply.id"
    >
      <section>
        <div class="reply-user-name">{{ reply.user.name }}</div>
      </section>
      <section>
        {{ reply.contents }}
      </section>
      <section class="created_at">
        created_at({{ reply.created_at.substr(0, 10) }})
      </section>
    </section>
  </div>
</template>

<script>
  export default {
    name: "DetailView",
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

<style lang="scss" scoped>
  @include mobile {
    .detail-wrap {
      padding: 0 1em;
    }

    .detail-main {
      margin-top: 2em;
      border: 1px solid #34d376;
      border-left: 0;
      border-right: 0;
      padding: 1.5em 0;
      word-break: break-all;
    }

    .detail-reply {
      border: 1px solid #dddddd;
      border-left: 0;
      border-right: 0;
      padding: 1.2em 0;
      word-break: break-all;
    }

    .top-tile-common {
      display: none;
    }

    .top-tile-m-detail {
      display: block;
    }
  }
  @include desktop {
    .detail-wrap {
      max-width: 1200px;
      margin: 0 auto;
    }

    .detail-main {
      margin-top: 4em;
      border: 1px solid #34d376;
      border-radius: 5px;
      padding: 1.5em 2em;
    }

    .detail-reply {
      padding: 1.2em 2em;
      border: 1px solid #dddddd;
      border-radius: 5px;
    }
  }

  .detail-main {
    section {
      margin: 1em 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

      h2 {
        margin: 0;
      }
    }
  }

  .created_at {
    color: gray;
  }

  .reply-nums {
    margin: 2em 0 0.5em;

    .reply-nums-number {
      color: #34d376;
      font-weight: bold;
    }
  }

  .detail-reply {
    margin-bottom: 1.5em;

    section {
      margin: 1em 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .reply-user-name {
      color: gray;
      border-bottom: 1px solid #dddddd;
      padding-bottom: 0.5em;
    }
  }
</style>
