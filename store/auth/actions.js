export default {
  GET_ACCESS_TOKEN({ commit }, data) {
    try {
      return this.$api(commit, {
        url: "/reddit_auth/api/v1/access_token",
        method: "POST",
        data,
        headers: {
          Authorization: process.env.BASIC_AUTH
        }
      }, "GET_ACCESS_TOKEN").then(res => {
        this.$api(commit, {
          url: "/reddit/api/v1/me"
        }, "GET_USER")
      })
    } catch (ex) {
      console.error(ex);
    }
  }
}