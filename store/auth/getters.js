const getters = {
  isAuthenticated: state => {
    const token = !!state.access_token;
    return token;
  }
};

export default getters;