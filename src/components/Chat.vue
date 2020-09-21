<template>
  <div v-if="showChat" class="chat-container">
    <div>
      <div class="currentRoom">Room name "{{ currentChatRoom.name }}"</div>
      <div class="usersInChat-container">
        <div class="usersInChat">Users in chat: {{ usersInChatString }}</div>
        <form @submit.prevent="addUserToChat()">
          <div class="addUser-container">
            <select class="addUser" v-model="selectedUser">
              <option selected disabled value="">Add user</option>
              <option
                v-for="user in allUsersNotInChat"
                :key="user.id"
                :value="user.id"
                >{{ user.username }}</option
              >
            </select>
            <button class="addUser-button" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="chat-log">
      <Message
        v-for="item in allChatMessages"
        :key="item.id"
        :message="item.message"
        :dateCreate="item.date_create"
        :user="item.user"
      />
    </div>
    <div class="enterMessage-container">
      <form @submit.prevent="createMessage">
        <div class="create-room-container">
          <input
            class="create-room-input"
            type="text"
            placeholder="Enter message"
            v-model="message"
          />
          <CreateRoomButton text="Enter" />
        </div>
      </form>
    </div>
  </div>
  <div class="selectOrCreateChat" v-else>Select or create chat room</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CreateRoomButton from './Buttons/CreateRoomButton';
import Message from './Message';

export default {
  name: 'Chat',
  components: {
    CreateRoomButton,
    Message
  },
  data() {
    return {
      selectedUser: '',
      usersInChatString: '',
      message: '',
      connection: null
    };
  },
  methods: {
    ...mapActions([
      'getAllUsers',
      'appendUserToRoom',
      'getUsersInChat',
      'createMessageAction',
      'getAllChatMessagesAction',
      'getUsersNotInChat',
      'getNewMessage',
      'getAllUsersConnections'
    ]),
    addUserToChat() {
      if (this.selectedUser) {
        this.appendUserToRoom({
          currentChatRoomId: this.currentChatRoom.id,
          selectedUserId: this.selectedUser
        });
        this.getUsersNotInChat(this.currentChatRoom.id);
        this.selectedUser = '';
      }
    },
    sendMessage(message) {
      this.connection.send(message);
    },
    createMessage() {
      const params = {
        message: this.message,
        chat_room_id: this.currentChatRoom.id
      };
      if (this.message) {
        this.createMessageAction(params);
        this.message = '';
        this.sendMessage(
          JSON.stringify({
            user_send: this.currentUser,
            users_receive: this.usersInChat
          })
        );
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentChatRoom',
      'currentUser',
      'allUsers',
      'usersInChat',
      'allChatMessages',
      'allUsersNotInChat'
    ]),
    showChat() {
      return Object.keys(this.currentChatRoom).length;
    },
    chatRoom() {
      return this.$store.state.chatRooms.currentChatRoom;
    }
  },
  watch: {
    usersInChat: {
      deep: true,
      handler() {
        this.getAllUsersConnections();
        this.usersInChatString = this.usersInChat
          .map(item => {
            return item.user.username;
          })
          .join();
        this.getUsersNotInChat(this.currentChatRoom.id);
      }
    },
    currentChatRoom: {
      deep: true,
      handler() {
        this.getUsersInChat(this.currentChatRoom.id);
        this.getUsersNotInChat(this.currentChatRoom.id);
        this.getAllChatMessagesAction(this.currentChatRoom.id);

        const self = this;

        if (self.connection) {
          console.log('Connection close');
          this.connection.close();
        }

        // Statrting websocket
        console.log('Starting connection to WebSocket Server');
        this.connection = new WebSocket(
          `ws://localhost:8000/ws/chat_room/${this.currentChatRoom.id}`
        );

        this.connection.onmessage = function(event) {
          self.getAllChatMessagesAction(self.currentChatRoom.id);
          self.getNewMessage(JSON.parse(event.data));
        };

        this.connection.onopen = function() {
          console.log('Successfully connected to the echo websocket server...');
        };
      }
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  width: 100%;
  height: 80%;
  padding: 10px;
  margin-top: 10px;
  background: #fff;
}
.selectOrCreateChat {
  margin-top: 10px;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gilroy';
  font-weight: 400;
}
.currentRoom {
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gilroy';
  font-weight: 400;
  text-align: left;
  border-bottom: 1px solid #bebdcb;
}
.usersInChat-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
}
.usersInChat {
  max-width: 60%;
}
.addUser-container {
  display: flex;
  justify-content: flex-end;
}
.addUser {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #bebdcb;
  border-radius: 5px;
  width: 70%;
  box-sizing: border-box;
  padding: 5px;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Gilroy';
}
.addUser:focus {
  outline: none;
  border: 1px solid #4d90fe;
  -webkit-box-shadow: 0px 0px 3px #4d90fe;
  box-shadow: 0px 0px 3px #4d90fe;
}
.addUser-button {
  font-size: 14px;
  font-weight: 500;
  padding: 12px 5px;
  max-height: 40px;
  box-sizing: border-box;
  align-items: center;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  position: relative;
  color: #ffffff;
  background: #445b9d;
  line-height: 14px;
}
.create-room-button:hover {
  background-color: #324479;
}
.chat-log {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  margin: 10px 0;
}
</style>
