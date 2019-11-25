export default {
  GET_POSTS({ commit }, subreddit) {
    try {
      return this.$api(commit, {
        url: `/reddit/r/${subreddit}`,
        method: "GET"
      }, "GET_POSTS")
    } catch (ex) {
      console.error(ex);
    }
  }
}