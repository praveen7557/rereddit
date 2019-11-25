<template>
  <div>
    <Listing v-infinite-scroll="loadMore" :infinite-disabled="loading" :posts="posts" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { types } from "../helpers/types";
import Listing from "~/components/Listing.vue";

export default {
  layout: "home",
  components: {
    Listing
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["posts"])
  },
  async fetch({ store, route }) {
    store.commit("REMOVE_NEXT");
    let api = "";
    const item = types.find(obj => obj.route === route.params.type);
    api = item.api;
    await store.dispatch("GET_POSTS", {
      type: api,
      isAuth: true
    });
  },
  methods: {
    async loadMore() {
      this.loading = true;
      let api = "";
      const item = types.find(obj => obj.route === this.$route.params.type);
      api = item.api;
      await this.$store.dispatch("GET_POSTS", {
        type: api,
        isAuth: true
      });
      this.loading = false;
    }
  }
  // async mounted() {
  //   let api = "";
  //   let isAuth = true;
  //   let item = types.find(({ route }) => route === this.$route.params.type);
  //   if (!item) {
  //     isAuth = false;
  //     item = feeds.find(({ route }) => route === this.$route.params.type);
  //   }
  //   api = item.api;
  //   await this.$store.dispatch("GET_POSTS", {
  //     type: api,
  //     isAuth
  //   });
  // }
};
</script>
