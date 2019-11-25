<template>
  <div>
    <Listing :posts="posts" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { types } from "../helpers/types";
import { feeds } from "../helpers/feeds";
import Listing from "~/components/Listing.vue";

export default {
  layout: "home",
  components: {
    Listing
  },
  computed: {
    ...mapState(["posts"])
  },
  async fetch({ store, route }) {
    let api = "";
    let isAuth = true;
    let item = types.find(obj => obj.route === route.params.type);
    if (!item) {
      isAuth = false;
      item = feeds.find(obj => obj.route === route.params.type);
    }
    api = item.api;
    await store.dispatch("GET_POSTS", {
      type: api,
      isAuth
    });
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
