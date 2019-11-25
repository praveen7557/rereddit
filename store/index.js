import { types } from "../helpers/types";
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  subs: [],
  navTypes: types,
  posts: []
})

export const actions = {
  GET_SUBREDDITS({ commit, getters }) {
    let url = `/reddit_auth/subreddits.json`;
    if (getters["auth/isAuthenticated"]) {
      url = `/reddit/subreddits/mine`;
    }
    return this.$api(commit, {
      url
    }, "GET_SUBREDDITS")
  },

  GET_POSTS({ commit, getters }, obj) {
    const { type, isAuth } = obj;
    let url = `/reddit_auth/${type}.json`;
    let headers = {
      authorization: null
    }
    if (getters["auth/isAuthenticated"] && isAuth) {
      url = `/reddit/${type}`;
      headers = {};
    }
    return this.$api(commit, {
      url,
      headers
    }, "GET_POSTS")
  },

  nuxtServerInit({ commit }, { req }) {
    let auth = null;
    let user = null;
    let refreshToken = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth_details);
        user = parsed.user ? JSON.parse(parsed.user) : null;
        refreshToken = parsed.refresh_token;
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('auth/GET_ACCESS_TOKEN', auth)
    commit('auth/GET_USER', user);
    commit('auth/GET_REFRESH_TOKEN', refreshToken);
  }
}

export const mutations = {
  GET_SUBREDDITS(state, res) {
    if (res) {
      state.subs = res.data.children.map(e => {
        return {
          name: e.data.display_name,
          reddit: e.data.display_name_prefixed
        };
      });
    }
  },

  GET_POSTS(state, res) {
    if (res) {
      state.posts = res.data.children.map(e => e.data);
    }
  },

  UPDATE_TYPES(state, routeName) {
    if (routeName) {
      state.navTypes = types.map(e => {
        if (e.key === 1) {
          return {
            ...e,
            routeName
          }
        } else {
          return {
            ...e,
            routeName: routeName + "-type"
          }
        }
      })
    } else {
      state.navTypes = types;
    }
  },

  UPDATE_POST(state, obj) {
    const { update, idx } = obj;
    state.posts = state.posts.map((e, index) => {
      return idx === index ? {
        ...e,
        ...update
      } : e;
    })
  }
}