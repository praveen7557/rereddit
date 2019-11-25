const Cookie = require('js-cookie')

export default ({
  GET_ACCESS_TOKEN(state, res) {
    if (res && res.access_token) {
      Cookie.set('access_token', res.access_token);
      Cookie.set('auth_details', JSON.stringify(res));
      state.access_token = res.access_token;
      state.auth_details = res;
      if (res.refresh_token) {
        Cookie.set('refresh_token', res.refresh_token);
      }
    } else {
      // Cookie.remove('access_token')
      // Cookie.remove('user');
      state.access_token = null;
    }
  },
  GET_REFRESH_TOKEN(state, res) {
    state.refresh_token = res;
  },
  GET_USER(state, res) {
    if (res) {
      const user = {
        name: res.name,
        img: res.img || res.icon_img
      }
      Cookie.set('user', user);
      state.user = user;
    }
  },
  LOGOUT(state) {
    Object.keys(Cookie.get()).forEach(function (cookieName) {
      const neededAttributes = {};
      Cookie.remove(cookieName, neededAttributes);
    });
    state.user = null;
    state.auth_details = null;
    state.access_token = null;
    window.location = "/";
  },
  CHANGE_REFRESH_STATUS(state, val) {
    state.isRefreshing = val;
  },
  UPDATE_REFRESH_STACK(state, val) {
    if (val) {
      state.refreshingStack.push(val);
    } else {
      state.refreshingStack = [];
    }
  }
})