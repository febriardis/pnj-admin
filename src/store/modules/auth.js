const state = {
  token: localStorage.getItem("token") || null,
  session: null
};
const getters = {
  loggedIn(state) {
    return state.token != null;
  }
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_SESSION(state, data) {
    state.session = data;
  },
  DESTROY_TOKEN(state) {
    state.token = null;
    state.session = null;
  }
};
const actions = {
  logout({ commit }) {
    localStorage.removeItem("token");
    commit("DESTROY_TOKEN");
    window.location.reload();
  }
  // getSession({ commit, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     HTTP.get("/session")
  //       .then(resp => {
  //         if (resp.status === 200) {
  //           commit("SET_SESSION", resp.data.data);
  //         }
  //         resolve(resp);
  //       })
  //       .catch(error => {
  //         let res = error.response;
  //         if (res && res.status === 401) {
  //           dispatch("auth/logout", null, { root: true });
  //         }
  //         reject(error);
  //       });
  //   });
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
