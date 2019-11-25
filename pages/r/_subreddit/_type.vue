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
    await store.dispatch(
      "subreddits/GET_POSTS",
      `${route.params.subreddit}/${route.params.type}`
    );
  }
  // async mounted() {
  //   this.$store.commit("UPDATE_TYPES", "r-subreddit");
  //   await this.$store.dispatch(
  //     "subreddits/GET_POSTS",
  //     `${this.$route.params.subreddit}/${this.$route.params.type}`
  //   );
  // }
};
</script>
