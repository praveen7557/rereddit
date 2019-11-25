
export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.access_token) {
      config.headers.common.authorization = "bearer " + store.state.auth.access_token;
    }
  })

  $axios.onError(async (err) => {
    const authStore = store.state.auth;
    if (err.response.status === 401) {
      store.commit("auth/GET_ACCESS_TOKEN", null)
      const refreshToken = authStore.refresh_token;
      // if (process.client) {
      //   refreshToken = Cookie.get("refresh_token");
      // } else {
      //   const parsed = cookieparser.parse(err.config.headers.cookie);
      //   refreshToken = parsed.refresh_token;
      // }

      if (!authStore.isRefreshing) {
        store.commit("auth/CHANGE_REFRESH_STATUS", true);
        // const formData = new FormData();
        // formData.append("grant_type", "refresh_token");
        // formData.append("refresh_token", "130306374998-K-0_rIREuxeGGHiAresnnRvfaFw");
        try {
          const formUrlEncoded = x =>
            Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
          const res = await $axios.post("/reddit_auth/api/v1/access_token", formUrlEncoded({
            grant_type: "refresh_token",
            refresh_token: refreshToken
          }), {
            headers: {
              Authorization: process.env.BASIC_AUTH,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          await store.commit("auth/GET_ACCESS_TOKEN", res.data);
          if (res.data.access_token) {
            const accessToken = res.data.access_token;
            flushRefreshingStack(accessToken);
            return new Promise((resolve, reject) => {
              resolve($axios({
                ...err.config,
                headers: {
                  authorization: "bearer " + accessToken
                }
              }))
            })
          } else {

          }
        } catch (ex) {
          console.log(ex);
        }
      }
      else {
        return new Promise((resolve, reject) => {
          store.commit("auth/UPDATE_REFRESH_STACK", { resolve, reject });
        }).then(accessToken => {
          return $axios({
            ...err.config,
            headers: {
              authorization: "bearer " + accessToken
            }
          }).catch((err) => {
            return Promise.reject(err);
          });
        })
      }
    } else {
      Promise.reject(err);
    }
  })

  function flushRefreshingStack(accessToken) {
    const authStore = store.state.auth;
    authStore.refreshingStack.forEach((promise) => {
      promise.resolve(accessToken);
    });

    store.commit("auth/CHANGE_REFRESH_STATUS", true);
    store.commit("auth/UPDATE_REFRESH_STACK", []);
  }
}