export default {
  GET_POSTS({ state, commit }, subreddit) {
    try {
      let url = `/reddit/r/${subreddit}`;
      if (state.next) {
        url = url + `?after=${state.next}`;
      }
      return this.$api(commit, {
        url,
        method: "GET"
      }, "GET_POSTS")
    } catch (ex) {
      console.error(ex);
    }
  }
}