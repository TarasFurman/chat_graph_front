import ServiceAPI from '../../services';

const service = new ServiceAPI();

const state = {};

const getters = {};

const actions = {
  loginUser({ commit }, userName) {
    service.login({ username: userName, password: 'password' }).then(resp => {
      localStorage.setItem('token', JSON.stringify(resp.data.access));
      localStorage.setItem(
        'tokentokenRefresh',
        JSON.stringify(resp.data.refresh)
      );
      localStorage.setItem('user', JSON.stringify(resp.data.user));
      commit('setUser', resp);
      window.location.href = '/';
    });
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
