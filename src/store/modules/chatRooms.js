import ServiceAPI from '../../services';

const service = new ServiceAPI();

const state = {
  userChatRooms: [],
  currentChatRoom: {},
  user: localStorage.user ? JSON.parse(localStorage.user) : {},
  usersInChat: [],
  allUsersNotInChat: [],
  allUsers: [],
  allUsersConnections: []
};

const getters = {
  allUserChatRooms: state => state.userChatRooms,
  currentChatRoom: state => state.currentChatRoom,
  currentUser: state => state.user,
  usersInChat: state => state.usersInChat,
  allUsersNotInChat: state => state.allUsersNotInChat,
  allUsers: state => state.allUsers,
  allUsersConnections: state => state.allUsersConnections
};

const actions = {
  getAllUserChatRooms({ commit }, userId) {
    service.getAllUserChatRooms(userId).then(resp => {
      if (resp.status === 200) {
        commit('setUserChatRooms', resp.data);
      } else {
        // TODO: change when back is gonna change
        commit('setUserChatRooms', []);
      }
    });
  },

  createChatRoom({ commit }, chatName) {
    service.createChatRoom(chatName).then(resp => {
      commit('createChatRoom', resp.data);
    });
  },

  changeCurrentChatRoom({ commit }, roomId) {
    service.getSingleChatRoom(roomId).then(resp => {
      commit('changeCurrentChatRoom', resp.data);
    });
  },

  getAllUsers({ commit }) {
    service.getAllUsers().then(resp => {
      commit('setAllUsers', resp.data);
    });
  },

  appendUserToRoom({ commit }, params) {
    service
      .appendUserToRoom(params.currentChatRoomId, { id: params.selectedUserId })
      .then(resp => {
        commit('appendUserToRoom', resp.data);
      });
  },

  getUsersInChat({ commit }, chatId) {
    service.getUsersInChat(chatId).then(resp => {
      commit('setUsersInChat', resp.data);
    });
  },

  getUsersNotInChat({ commit }, chatId) {
    service.getUsersNotInChat(chatId).then(resp => {
      commit('setUsersNotInChat', resp.data);
    });
  },

  getAllUsersConnections({ commit }) {
    service.getAllUsersConnections().then(resp => {
      commit('setAllUsersConnections', resp.data);
    });
  }
};

const mutations = {
  setUserChatRooms: (state, userChatRooms) =>
    (state.userChatRooms = userChatRooms),
  createChatRoom: (state, newChatRoom) => {
    state.userChatRooms = [
      ...state.userChatRooms,
      { chat_room_id: newChatRoom }
    ];
    state.currentChatRoom = newChatRoom;
  },
  changeCurrentChatRoom: (state, chatRoom) =>
    (state.currentChatRoom = chatRoom),

  setAllUsers: (state, allUsers) => {
    // state.allUsersNotInChat = allUsers.filter(
    //   item => item.id !== state.user.user_id
    // );
    state.allUsers = allUsers;
  },
  appendUserToRoom: (state, allUsersinChat) =>
    (state.usersInChat = allUsersinChat),

  setUsersInChat: (state, usersInChat) => (state.usersInChat = usersInChat),

  setUsersNotInChat: (state, usersNotInChat) =>
    (state.allUsersNotInChat = usersNotInChat),

  setAllUsersConnections: (state, allUsersConnections) =>
    (state.allUsersConnections = allUsersConnections)
};

export default {
  state,
  getters,
  actions,
  mutations
};
