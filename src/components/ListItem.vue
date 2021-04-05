<template>
  <div class="list-wrap">
    <div class="left-menu">
      <button type="button" class="btn-login">로그인</button>
    </div>
    <div class="right-content">
      <div class="list-top-toolbar">
        <div class="btn-opderby-wrap">
          <span
            class="btn-opderby"
            :class="{ active: listParams.ord == 'asc' }"
            @click="changeOrd('asc')"
            ><span
              class="circle-dot"
              :class="{ active: listParams.ord == 'asc' }"
            ></span>
            오름차순</span
          >
          <span
            class="btn-opderby"
            :class="{ active: listParams.ord == 'desc' }"
            @click="changeOrd('desc')"
            ><span
              class="circle-dot"
              :class="{ active: listParams.ord == 'desc' }"
            ></span>
            내림차순</span
          >
        </div>
        <div>
          <button type="button" class="btn-filter" @click="openModal">
            필터
          </button>
        </div>
      </div>
      <ul class="feed-list">
        <li v-for="item in listItems.data" class="feed">
          <router-link :to="`detail/${item.id}`">
            <section class="category_name_feed_id">
              <div>{{ categoryNames.category[item.category_id - 1].name }}</div>
              <div>{{ item.id }}</div>
            </section>
            <section class="user_id_created_at">
              <span class="user_id">{{ item.user_id }}</span>
              <span class="created_at">
                | created_at({{ item.created_at.substr(0, 10) }})</span
              >
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

    <!-- 컴포넌트 MyModal -->
    <MyModal @close="closeModal" v-if="modal">
      <h2><b>필터</b></h2>
      <div>
        <p
          class="category-chkbox-wrap"
          v-for="(category, index) in categoryNames.category"
        >
          <input
            class="category-chkbox"
            type="checkbox"
            v-model="listParams.category"
            :value="index + 1"
          />
          {{ category.name }}
        </p>
      </div>
      <template slot="footer">
        <button class="btn-filter-save" @click="doSend">저장하기</button>
      </template>
    </MyModal>
  </div>
</template>

<script>
  import MyModal from "../components/MyModal.vue";

  export default {
    name: "ListItem",
    components: { MyModal },
    data() {
      return {
        alldata: [],
        listParams: {
          page: 1,
          ord: "asc",
          category: [1, 2, 3],
          limit: 10,
        },
        modal: false,
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
    methods: {
      changeOrd(params) {
        this.listParams.ord = params;
        this.$store.dispatch("FETCH_LIST", this.listParams);
      },
      openModal() {
        this.modal = true;
      },
      closeModal() {
        this.modal = false;
      },
      doSend() {
        if (this.listParams.category.length > 0) {
          this.$store.dispatch("FETCH_LIST", this.listParams);
          this.closeModal();
        } else {
          alert("최소 하나 이상의 카테고리를 선택해주세요.");
        }
      },
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

  @include mobile {
    .left-menu {
      display: none;
    }

    .right-content {
      margin-top: 1em;

      .list-top-toolbar {
        padding: 0 1.2em;
      }
    }

    .feed-list {
      background-color: #edeef0;
    }

    .feed,
    .ads {
      margin-bottom: 0.5em;
      background-color: white;
      border: 1px solid #dddddd;
      border-left: 0;
      border-right: 0;
      padding: 1.5em 1em;
    }

    .created_at {
      display: none;
    }

    .ads-photo_ads-title {
      .ads-photo {
        img {
          display: block;
          max-width: 100%;
        }
      }
    }
  }

  @include desktop {
    .left-menu {
      margin-top: 3em;
      padding-right: 30px;
      width: 224px;
    }

    .list-wrap {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
    }

    .right-content {
      margin-top: 3em;
      width: 976px;
    }

    .feed,
    .ads {
      margin-bottom: 1.5em;
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 1.5em 2em;
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
        margin-left: 2em;
      }
    }
  }

  .btn-login,
  .btn-filter-save {
    background-color: #00c854;
    color: white;
    font-size: 18px;
    padding: 0.6em 70px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-filter-save {
    padding: 0.6em 100px;
  }

  .btn-filter {
    background-color: white;
    color: gray;
    padding: 2px 10px;
    border: 1px solid gray;
    border-radius: 3px;
    cursor: pointer;
  }

  .right-content {
    .list-top-toolbar {
      display: flex;
      justify-content: space-between;
    }

    .feed-list {
      padding: 0;

      .feed {
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

          .user_id {
            color: #34d376;
          }
        }

        .feed-title,
        .feed-contents {
          color: black;
        }
      }

      .ads {
        .sponsored {
          color: gray;
          padding-bottom: 0.5em;
        }
      }

      .singleline-ellipsis {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .multiline-ellipsis_t {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .multiline-ellipsis_c {
        overflow: hidden;
        display: -webkit-box;
        @include mobile {
          -webkit-line-clamp: 2;
        }
        @include desktop {
          -webkit-line-clamp: 4;
        }
        -webkit-box-orient: vertical;
      }
    }
  }

  .btn-opderby-wrap {
    display: flex;
    justify-content: flex-start;

    .btn-opderby {
      display: flex;
      align-items: center;
      margin-right: 0.5em;
      cursor: pointer;
      color: gray;

      .circle-dot {
        background-color: gray;
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        margin-right: 0.25em;
      }
    }

    .btn-opderby.active {
      color: #34d376;
    }
    .circle-dot.active {
      background-color: #34d376;
    }
  }

  .category-chkbox-wrap {
    font-size: 20px;

    .category-chkbox {
      width: 20px;
      height: 20px;
    }
  }
</style>
