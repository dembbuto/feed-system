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
          <span v-if="categoryNames.category">
            <span
              class="checked-category"
              v-for="checked_cat in listParams.category"
              :key="checked_cat"
              >{{ categoryNames.category[checked_cat - 1].name }}</span
            >
          </span>
          <button type="button" class="btn-filter" @click="openModal">
            필터
          </button>
        </div>
      </div>
      <ul class="feed-list" v-if="allData.length > 0">
        <li v-for="(item, index) in allData" :key="index" class="feed">
          <router-link :to="`detail/${item.id}`" v-if="index % 4 != 3">
            <section class="category_name_feed_id">
              <div v-if="item.category_id">
                {{ categoryNames.category[item.category_id - 1].name }}
              </div>
              <div>{{ item.id }}</div>
            </section>
            <section class="user_id_created_at">
              <span class="user_id">{{ item.user_id }}</span>
              <span class="created_at">
                | created_at({{ item.created_at.substr(0, 10) }})</span
              >
            </section>
            <section class="feed-title">
              <h2 class="singleline-ellipsis">
                {{ item.title }}
              </h2>
            </section>
            <section class="feed-contents singleline-ellipsis">
              {{ item.contents }}
            </section>
          </router-link>
          <div v-else>
            <div class="sponsored">
              <div>sponsored</div>
            </div>
            <div class="ads-photo_ads-title">
              <div class="ads-photo">
                <img
                  :src="`https://cdn.comento.kr/assignment/${item.img}`"
                  alt="ads-photo"
                  v-if="item.img"
                />
              </div>
              <div class="ads-text">
                <section class="ads-title">
                  <h2 class="multiline-ellipsis_t">
                    {{ item.title }}
                  </h2>
                </section>
                <section class="ads-contents multiline-ellipsis_c">
                  {{ item.contents }}
                </section>
              </div>
            </div>
          </div>
        </li>
        <!-- <infinite-loading
          @infinite="infiniteHandler"
          spinner="waveDots"
        ></infinite-loading> -->
      </ul>
    </div>

    <my-modal @close="closeModalNoChange" v-if="modal">
      <h2><b>필터</b></h2>
      <div>
        <p
          class="category-chkbox-wrap"
          v-for="(category, index) in categoryNames.category"
          :key="index"
        >
          <label class="category-chkbox-label">
            <input
              class="category-chkbox"
              type="checkbox"
              v-model="listParams.category"
              :value="index + 1"
            />
            {{ category.name }}</label
          >
        </p>
      </div>
      <template slot="footer">
        <button class="btn-filter-save" @click="doSend">저장하기</button>
      </template>
    </my-modal>
  </div>
</template>

<script>
  import MyModal from "../components/MyModal.vue";
  import bus from "../utils/bus.js";
  // import InfiniteLoading from "vue-infinite-loading";

  export default {
    name: "ListItem",
    components: { MyModal },
    data() {
      return {
        allData: [],
        listParams: {
          page: 1,
          ord: "asc",
          category: [1, 2, 3],
          limit: 10,
        },
        adsParams: {
          page: 1,
          limit: 3,
        },
        modal: false,
        categoryOri: [],
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
      this.refreshAllData();

      window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleScroll() {
        if (
          window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight
        ) {
          if (this.listParams.limit < this.$store.state.list.total) {
            this.listParams.limit += 10;
            this.refreshAllData();
          }
        }
      },
      fetchAllData() {
        let j = 0;
        let k = 0;
        if (this.listParams.limit > this.listItems.total) {
          this.listParams.limit = this.listItems.total;
          this.adsParams.limit = Math.floor(this.listParams.limit / 3);
        }
        for (let i = 0; i < this.listParams.limit + this.adsParams.limit; i++) {
          if (i % 4 != 3) {
            if (
              this.$store.state.list.data[j] !== undefined &&
              this.listParams.category.includes(
                this.$store.state.list.data[j].category_id
              )
            ) {
              this.allData.splice(i, 1, this.$store.state.list.data[j]);
              j++;
            }
          } else {
            if (this.$store.state.ads.data[k] !== undefined) {
              this.allData.splice(i, 1, this.$store.state.ads.data[k]);
              k++;
            }
          }
        }
        bus.$emit("end:spinner");
      },
      refreshAllData() {
        bus.$emit("start:spinner");
        this.$store.dispatch("FETCH_LIST", this.listParams).then(() => {
          this.adsParams.limit = Math.floor(this.listParams.limit / 3);
          this.$store.dispatch("FETCH_ADS", this.adsParams).then(() => {
            this.fetchAllData();
          });
        });
      },
      changeOrd(params) {
        this.listParams.ord = params;
        this.refreshAllData();
      },
      openModal() {
        this.modal = true;
        this.categoryOri = this.listParams.category;
      },
      closeModal() {
        this.modal = false;
      },
      closeModalNoChange() {
        this.modal = false;
        this.listParams.category = this.categoryOri; // 저장하지 않고 나가면 적용 x + checked 상태 원래대로
      },
      doSend() {
        if (this.listParams.category.length > 0) {
          this.listParams.limit = 10;
          this.allData.splice(0);
          this.refreshAllData();
          this.closeModal();
        } else {
          alert("최소 하나 이상의 카테고리를 선택해주세요.");
        }
      },
    },
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

    .list-wrap {
      user-select: none;
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

    .feed {
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
      user-select: none;
    }

    .right-content {
      margin-top: 3em;
      width: 976px;
    }

    .feed {
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
    @include mobile {
      padding: 0.6em 90px;
    }
    @include desktop {
      padding: 0.6em 30px;
    }
  }

  .btn-filter {
    background-color: white;
    color: gray;
    padding: 2px 10px;
    border: 1px solid gray;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 0.5em;
  }

  .right-content {
    .list-top-toolbar {
      display: flex;
      justify-content: space-between;

      .checked-category {
        margin: 0 0.25em;
        padding: 0.5em;
        border: 1px solid gray;
        background-color: gray;
        border-radius: 3px;
        color: white;
        font-size: 0.5em;
      }
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
          padding-top: 0.75em;

          .user_id {
            color: #34d376;
          }
        }

        .feed-title,
        .feed-contents {
          color: black;
        }
      }

      .sponsored {
        color: gray;
        padding-bottom: 1em;
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
      font-size: 0.9em;

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

    .category-chkbox-label {
      cursor: pointer;
    }

    .category-chkbox {
      width: 20px;
      height: 20px;
    }
  }
</style>
