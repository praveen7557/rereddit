export default function ({ store, redirect, route }) {
  const userIsLoggedIn = !!store.state.auth.access_token;
  const urlRequiresAuth = /^\/me(\/|$)/.test(route.fullPath)
  const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect('/')
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect('/me')
  }
  return Promise.resolve()
}