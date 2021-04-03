<template>
  <div class="list-wrap">
    <div class="left-menu">
      <button type="button" class="btn-login">로그인</button>
    </div>
    <div class="right-content">
      <div class="list-top-toolbar">
        <div>
          <button type="button">오름차순</button>
          <button type="button">내림차순</button>
        </div>
        <div><button type="button">필터</button></div>
      </div>
      <ul class="feed-list">
        <li v-for="item in listItems.data" class="feed">
          <router-link :to="`detail/${item.id}`">
            <section class="category_name_feed_id">
              <div>{{ categoryNames.category[item.category_id - 1].name }}</div>
              <div>{{ item.id }}</div>
            </section>
            <section class="user_id_created_at">
              {{ item.user_id }} | created_at({{
                item.created_at.substr(0, 10)
              }})
            </section>
            <section class="feed-title">
              <h2 class="singleline-ellipsis">{{ item.title }}</h2>
            </section>
            <section class="feed-contents singleline-ellipsis">
              {{ item.contents }}
            </section>
          </router-link>
        </li>
        <li v-for="ads in adsItems.data" class="ads">
          <div>
            <div class="sponsored">
              <div>sponsored</div>
            </div>
            <div class="ads-photo_ads-title">
              <div class="ads-photo">
                <img
                  :src="`https://cdn.comento.kr/assignment/${ads.img}`"
                  alt="ads-photo"
                />
              </div>
              <div class="ads-text">
                <section class="ads-title">
                  <h2 class="multiline-ellipsis_t">{{ ads.title }}</h2>
                </section>
                <section class="ads-contents multiline-ellipsis_c">
                  {{ ads.contents }}
                </section>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    data() {
      return {
        alldata: [],
      };
    },
    computed: {
      listItems() {
        return this.$store.state.list;
      },
      categoryNames() {
        return this.$store.state.category;
      },
      adsItems() {
        return this.$store.state.ads;
      },
    },
    created() {
      this.$store.dispatch("FETCH_CATEGORY");
      this.$store.dispatch("FETCH_ADS");
    },
    // mounted() {
    //   let j = 0;
    //   let k = 0;
    //   for (
    //     let i = 0;
    //     i < this.listItems.data.length + this.adsItems.data.length;
    //     i++
    //   ) {
    //     if (i % 4 != 3) {
    //       this.alldata[i] = this.listItems.data[j];
    //       j++;
    //     } else {
    //       this.alldata[i] = this.adsItems.data[k];
    //       k++;
    //     }
    //   }
    // },
  };
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }

  .list-wrap {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
  }

  .btn-login {
    background-color: #00c854;
    color: white;
    font-size: 18px;
    padding: 0.6em 70px;
    border: 0px;
    border-radius: 5px;
  }

  .left-menu {
    margin-top: 3em;
    padding-right: 30px;
    width: 224px;
  }

  .right-content {
    margin-top: 3em;
    width: 976px;

    .list-top-toolbar {
      display: flex;
      justify-content: space-between;
    }

    .feed-list {
      padding: 0;

      .feed {
        margin-bottom: 1.5em;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 1.5em 2em;

        .category_name_feed_id {
          color: gray;
          border-bottom: 1px solid #dddddd;
          padding-bottom: 0.5em;
          display: flex;
          justify-content: space-between;
        }

        .user_id_created_at {
          color: gray;
          padding-top: 0.5em;
        }

        .feed-title,
        .feed-contents {
          color: black;
        }
      }

      .ads {
        margin-bottom: 1.5em;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 1.5em 2em;

        .sponsored {
          color: gray;
          padding-bottom: 0.5em;
        }

        .ads-photo_ads-title {
          display: flex;
          justify-content: space-between;

          .ads-photo {
            img {
              max-width: 330px;
            }
          }

          .ads-text {
            width: 550px;
          }
        }
      }

      .singleline-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .multiline-ellipsis_t {
        height: 3em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .multiline-ellipsis_c {
        height: 5.5em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>
