import ServiceAPI from '../../services';

const service = new ServiceAPI();

const state = {
  chatMessages: [],
  newMessage: {}
};

const getters = {
  allChatMessages: state => state.chatMessages,
  newMessage: state => state.newMessage
};

const actions = {
  createMessageAction({ commit }, params) {
    service.createMessage(params);
  },

  getAllChatMessagesAction({ commit }, chatId) {
    service.getAllReportMessages(chatId).then(resp => {
      commit('setAllChatMessages', resp.data);
    });
  },

  getNewMessage({ commit }, newMessage) {
    commit('setNewMessage', newMessage);
  }
};

const mutations = {
  setAllChatMessages: (state, messages) => (state.chatMessages = messages),
  setNewMessage: (state, newMessage) =>
    (state.newMessage = {
      userSend: newMessage.user_send,
      usersReceive: newMessage.users_receive.filter(
        item => item.user.id !== newMessage.user_send.user_id
      )
    })
};

export default {
  state,
  getters,
  actions,
  mutations
};
