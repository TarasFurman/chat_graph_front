<template>
  <form @submit.prevent="onSubmit">
    <div class="create-room-container">
      <input
        class="create-room-input"
        type="text"
        v-model="chatRoomName"
        placeholder="Room name"
      />
      <CreateRoomButton text="Create" />
    </div>
  </form>
</template>

<script>
import CreateRoomButton from './Buttons/CreateRoomButton';
import { mapActions } from 'vuex';

export default {
  name: 'CreateRoom',
  components: {
    CreateRoomButton
  },
  data() {
    return { chatRoomName: '' };
  },
  methods: {
    ...mapActions(['createChatRoom']),
    onSubmit() {
      this.chatRoomName && this.createChatRoom({ name: this.chatRoomName });
      this.chatRoomName = '';
    }
  }
};
</script>

<style>
.create-room-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.create-room-input {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #bebdcb;
  border-radius: 8px;
  min-width: 80%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gilroy';
  font-weight: 400;
}
.create-room-input:focus {
  outline: none;
  border: 1px solid #4d90fe;
  -webkit-box-shadow: 0px 0px 3px #4d90fe;
  box-shadow: 0px 0px 3px #4d90fe;
}
</style>
