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
    ...mapState("subreddits", ["posts"])
  },
  async fetch({ store, route }) {
    store.commit("UPDATE_TYPES", "r-subreddit");
    await store.dispatch("subreddits/GET_POSTS", route.params.subreddit);
  }
  // async mounted() {
  //   await this.$store.dispatch(
  //     "subreddits/GET_POSTS",
  //     this.$route.params.subreddit
  //   );
  // }
};
</script>
