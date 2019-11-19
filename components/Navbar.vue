<template>
  <nav class="navbar">
    <div class="types">
      <div class="type" v-for="(item, index) in types" :key="index">{{item.name}}</div>
    </div>
    <div class="account">
      <a class="login" v-if="!isAuthenticated" :href="loginUrl">Login</a>
      <span class="login" @click="LOGOUT" v-else>{{user?user.name:""}}</span>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { types } from "../helpers/types";

export default {
  computed: {
    loginUrl() {
      return process.env.REDDIT_LOGIN_URL;
    },
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("auth", ["user"])
  },
  data() {
    return {
      types
    };
  },
  methods: {
    ...mapMutations("auth", ["LOGOUT"])
  }
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 20px;

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