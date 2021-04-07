<template>
  <div class="header_wrap">
    <div class="header">
      <router-link to="/">
        <span class="top_title_common">[2021-04-07] 방재식</span>
        <span class="top_title_m_detail" v-if="$route.path.includes('/detail')">
          <b>＜</b>
        </span>
        <span class="top_title_m_detail" v-else>[2021-04-07] 방재식</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header_wrap {
    box-shadow: 0 0 5px 0 rgb(64 60 67 / 16%);
  }

  .header {
    max-width: 1200px;
    margin: 0 auto;
    @include mobile {
      padding: 1.2em;
    }
    @include desktop {
      padding: 1.2em 0;
    }

    a {
      color: black;
      text-decoration: none;
    }
  }

  @include mobile {
    .top_title_common {
      display: none;
    }

    .top_title_m_detail {
      display: block;
    }
  }

  @include desktop {
    .top_title_common {
      display: block;
    }

    .top_title_m_detail {
      display: none;
    }
  }
</style>
