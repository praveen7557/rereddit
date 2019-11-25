export default () => {
  return {
    access_token: null,
    refresh_token: null,
    auth_details: null,
    user: null,
    isRefreshing: false,
    refreshingStack: []
  }
}