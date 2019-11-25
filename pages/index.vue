<template>
  <div>
    <Listing :posts="posts" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Listing from "~/components/Listing.vue";

export default {
  layout: "home",
  components: {
    Listing
  },
  computed: {
    ...mapState(["posts"])
  },
  async fetch({ store }) {
    store.commit("UPDATE_TYPES", "");
    await store.dispatch("GET_POSTS", {
      isAuth: true,
      type: "best"
    });
  },
  async mounted() {
    // await this.$store.dispatch("GET_POSTS", {
    //   isAuth: true,
    //   type: "best"
    // });
    if (this.$route.query.code) {
      try {
        // const formData = new FormData();
        // formData.append("code", this.$route.query.code);
        // formData.append("redirect_uri", process.env.REDIRECT_URI);
        // formData.append("grant_type", "authorization_code");
        await this.$store.dispatch("auth/GET_ACCESS_TOKEN", {
          code: this.$route.query.code,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: "authorization_code"
        });
      } catch (ex) {}
    }
  }
};
</script>
