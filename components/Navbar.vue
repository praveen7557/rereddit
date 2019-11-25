<template>
  <nav class="navbar">
    <div class="types">
      <nuxt-link
        :to="getNuxtLinkTo(item)"
        v-for="(item, index) in navTypes"
        :key="index"
        class="type"
      >{{item.name}}</nuxt-link>
    </div>
    <div class="account">
      <a class="login" v-if="!isAuthenticated" :href="loginUrl">Login</a>
      <span class="login" @click="LOGOUT" v-else>{{user?user.name:""}}</span>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    loginUrl() {
      return process.env.REDDIT_LOGIN_URL;
    },
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("auth", ["user"]),
    ...mapState(["navTypes"])
  },
  methods: {
    ...mapMutations("auth", ["LOGOUT"]),
    getNuxtLinkTo(item) {
      const params = {
        type: item.route
      };
      if (this.$route.name.indexOf("r-subreddit") > -1) {
        params.subreddit = this.$route.params.subreddit;
      }
      return {
        name: item.routeName,
        params
      };
    }
  }
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 70px;
  padding: 20px 50px;
  background-color: #f8f8f8;

  .types {
    display: flex;

    .type {
      opacity: 0.5;
      font-size: 14px;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: normal;
      color: #464855;
      margin-right: 30px;
      text-decoration: none;

      &.nuxt-link-exact-active {
        color: #fd4500;
        opacity: 1;
        border-bottom: 1px solid #fd4500;
      }
    }
  }

  .account {
    .login {
      line-height: 2.43;
      letter-spacing: normal;
      color: #fd4500;
    }
  }
}
</style>