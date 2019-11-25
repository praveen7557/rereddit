export default {
  VOTE_POST({ commit }, data) {
    try {
      return this.$api(commit, {
        url: `/reddit/api/vote`,
        method: "POST",
        data
      })
    } catch (ex) {
      console.error(ex);
    }
  }
}