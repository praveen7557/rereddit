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
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState("subreddits", ["posts"])
  },
  async fetch({ store, route }) {
    store.commit("subreddits/REMOVE_NEXT");
    store.commit("UPDATE_TYPES", "r-subreddit");
    await store.dispatch("subreddits/GET_POSTS", route.params.subreddit);
  },
  methods: {
    async loadMore() {
      this.loading = true;
      await this.$store.dispatch(
        "subreddits/GET_POSTS",
        this.$route.params.subreddit
      );
      this.loading = false;
    }
  }
  // async mounted() {
  //   this.$store.commit("UPDATE_TYPES", "r-subreddit");
  //   await this.$store.dispatch(
  //     "subreddits/GET_POSTS",
  //     this.$route.params.subreddit
  //   );
  // }
};
</script>
