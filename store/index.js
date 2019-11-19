const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  subs: []
})

export const actions = {
  GET_SUBREDDITS({ commit, getters }) {
    let url = `/reddit_auth/subreddits.json`;
    if (getters["auth/isAuthenticated"]) {
      url = `/reddit/subreddits/mine`;
    }
    this.$api(commit, {
      url
    }, "GET_SUBREDDITS")
  },

  nuxtServerInit({ commit }, { req }) {
    let auth = null;
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth_details);
        user = JSON.parse(parsed.user);
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('auth/GET_ACCESS_TOKEN', auth)
    commit('auth/GET_USER', user)
  }
}

export const mutations = {
  GET_SUBREDDITS(state, res) {
    state.subs = res.data.children.map(e => {
      return {
        name: e.data.display_name,
        reddit: e.data.display_name_prefixed
      };
    });
  }
}