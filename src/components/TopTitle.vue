<template>
  <div class="header_wrap">
    <div class="header">
      <router-link to="/">
        <span class="top-tile-common">[2021-04-06] 방재식</span
        ><span class="top-tile-m-detail"> &lt; </span>
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

  .top-tile-m-detail {
    display: none;
  }
</style>
