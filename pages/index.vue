<template>
  <div>
    <Listing v-infinite-scroll="loadMore" :infinite-disabled="loading" :posts="posts" />
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
    store.commit("REMOVE_NEXT");
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
        await this.$store.dispatch("auth/GET_ACCESS_TOKEN", {
          code: this.$route.query.code,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: "authorization_code"
        });
      } catch (ex) {}
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async loadMore() {
      this.loading = true;
      await this.$store.dispatch("GET_POSTS", {
        isAuth: true,
        type: "best"
      });
      this.loading = false;
    }
  }
};
</script>
