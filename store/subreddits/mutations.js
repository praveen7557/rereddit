export default ({
  GET_POSTS(state, res) {
    if (res) {
      state.posts = res.data.children.map(e => e.data);
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
})