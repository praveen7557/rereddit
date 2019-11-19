export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.access_token) {
      config.headers.common.authorization = "bearer " + store.state.auth.access_token;
    }
  })
}