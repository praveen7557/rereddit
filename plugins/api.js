export default ({ $axios }, inject) => {
  const buildRequest = function (request) {
    if (request.method === 'get' || request.method === null) {
      request.params = Object.assign(request.params || {})
    }
    else {
      request.data = Object.assign(request.data || {})
    }
    return request
  }

  const requestAndCommit = function (commit, request, mutation = null) {
    return new Promise((resolve, reject) => {
      $axios(
        buildRequest(request)
      ).then(res => {
        if (mutation) commit(mutation, res.data);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  inject("api", requestAndCommit)
}