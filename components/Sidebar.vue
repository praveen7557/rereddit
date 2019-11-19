<template>
  <div class="sidebar">
    <div class="logo-container">
      <div class="logo"></div>
    </div>
    <div class="search-container">
      <input type="text" class="search" />
      <div class="search-icon"></div>
    </div>
    <div class="feeds-container">
      <div class="feed-item" v-for="item in feeds" :key="item.key">{{item.name}}</div>
    </div>
    <div class="separator"></div>
    <div class="feeds-container subreddits">
      <div class="feed-item" v-for="(item,idx) in subs" :key="idx">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { feeds } from "~/helpers/feeds.js";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["subs"])
  },
  data() {
    return {
      feeds
    };
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

  .subreddits {
    overflow: auto;
    height: 360px;
  }

  .separator {
    border: solid 1px #e4e5ec;
  }
}
</style>
