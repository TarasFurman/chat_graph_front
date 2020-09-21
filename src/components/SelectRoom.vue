<template>
  <div class="select-container">
    <select
      class="choose-room"
      v-model="selected"
      @change="changeRoomHandler($event.target.value)"
    >
      <option disabled value="">Select chat room</option>
      <option
        v-for="room in allUserChatRooms"
        :key="room.chat_room_id.id"
        :value="room.chat_room_id.id"
        >{{ room.chat_room_id.name }}</option
      >
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SelectRoom',
  data() {
    return {
      selected: '',
      userId: JSON.parse(localStorage.user).user_id
    };
  },
  methods: {
    ...mapActions(['getAllUserChatRooms', 'changeCurrentChatRoom']),
    changeRoomHandler(id) {
      if (id !== this.currentChatRoom.id) {
        this.changeCurrentChatRoom(id);
      }
    }
  },
  computed: {
    ...mapGetters(['allUserChatRooms', 'currentChatRoom'])
  },
  created() {
    this.getAllUserChatRooms(this.userId);
  }
};
</script>

<style scoped>
.select-container {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
}
.choose-room {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #bebdcb;
  border-radius: 8px;
  min-width: 70%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gilroy';
  font-weight: 400;
}
.choose-room:focus {
  outline: none;
  border: 1px solid #4d90fe;
  -webkit-box-shadow: 0px 0px 3px #4d90fe;
  box-shadow: 0px 0px 3px #4d90fe;
}
</style>
