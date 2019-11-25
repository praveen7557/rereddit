export default ({
  GET_POSTS(state, res) {
    if (res) {
      if (state.next) {
        state.posts = [...state.posts, ...res.data.children.map(e => e.data)];
      } else {
        state.posts = res.data.children.map(e => e.data);
      }
      state.next = res.data.after;
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
  },

  REMOVE_NEXT(state) {
    state.next = null;
  }
})