<template>
  <div class="sidebar">
    <nuxt-link to="/">
      <div class="logo-container">
        <div class="logo" />
      </div>
    </nuxt-link>
    <div class="search-container">
      <input type="text" class="search" />
      <div class="search-icon" />
    </div>
    <div class="feeds-container">
      <nuxt-link
        :to="{name:item.routeName,params:{subreddit:item.route}}"
        v-for="(item, index) in feeds"
        :key="index"
        class="feed-item"
      >{{item.name}}</nuxt-link>
      <!-- <div v-for="item in feeds" :key="item.key" class="feed-item">{{ item.name }}</div> -->
    </div>
    <div class="separator" />
    <div class="feeds-container subreddits">
      <nuxt-link
        :to="`/${item.reddit}`"
        v-for="(item,idx) in subs"
        :key="idx"
        class="feed-item"
      >{{ item.name }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { feeds } from "~/helpers/feeds.js";

export default {
  name: "Sidebar",
  data() {
    return {
      feeds
    };
  },
  computed: {
    ...mapState(["subs"])
  },
  mounted() {
    try {
      this.$store.dispatch("GET_SUBREDDITS");
    } catch (ex) {}
  }
};
</script>

<style lang="scss">
.sidebar {
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  width: 250px;
  height: 100vh;
  position: fixed;
  padding: 30px;

  .logo-container {
    .logo {
      width: 120px;
      height: 40px;
      background-size: contain;
      background-image: url(../assets/logo.svg);
      background-repeat: no-repeat;
    }
  }

  .search-container {
    height: 40px;
    border: solid 1px #e4e5ec;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.03);
    margin-top: 20px;
    margin-left: -30px;
    background-color: #ffffff;
    border-top-right-radius: 23px;
    border-bottom-right-radius: 23px;
    .search {
      color: #898ea2;
      border: none;
      width: calc(100% - 35px);
      height: 100%;
      outline: none;
      opacity: 0.5;
      font-size: 14px;
      font-style: normal;
      line-height: 2.43;
      font-family: Poppins;
      font-weight: 500;
      padding-left: 30px;
      font-stretch: normal;
      letter-spacing: normal;
      background: transparent;
    }
    .search-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-top: 10px;
      margin-right: 10px;
      background-size: contain;
      background-image: url(../assets/search.svg);
      background-repeat: no-repeat;
    }
  }

  .feeds-container {
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.43;
    letter-spacing: normal;
    color: #898ea2;

    .selected {
      color: #fd4500;
    }
  }

  .feed-item {
    color: #898ea2;
    display: block;
    text-decoration: none;

    &.nuxt-link-exact-active {
      color: #fd4500;
    }
  }

  .subreddits {
    overflow: auto;
    height: 360px;
  }

  .separator {
    border: solid 1px #e4e5ec;
  }
}
</style>
