export default ({ $axios }, inject) => {
  const buildRequest = function (request) {
    const method = request.method && request.method.toLowerCase();
    if (method === 'get' || method === null) {
      request.params = Object.assign(request.params || {})
    }
    else {
      request.data = Object.assign(request.data || {})
      if (method === 'post') {
        const formUrlEncoded = x =>
          Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
        request.data = formUrlEncoded(request.data);
      }
    }
    return request
  }

  const requestAndCommit = function (commit, request, mutation = null) {
    return new Promise((resolve, reject) => {
      $axios.defaults.withCredentials = true;
      $axios(
        buildRequest(request)
      ).then(res => {
        if (mutation) commit(mutation, res && res.data);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  inject("api", requestAndCommit)
}