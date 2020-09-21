<template>
  <div
    class="chat-message"
    v-bind:class="{ 'chat-message--right': currentUser }"
  >
    <p>
      {{ user.username }}
    </p>
    <p>
      {{ messageDataForm }}
    </p>
    <p class="chat-message__text">
      {{ message }}
    </p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Message',
  props: {
    message: String,
    dateCreate: String,
    user: Object
  },
  data() {
    return {
      messageDataForm: '',
      currentUser: JSON.parse(localStorage.user).user_id === this.user.id
    };
  },
  created() {
    this.messageDataForm = moment(this.dateCreate).format('DD.MM.YY hh:mm');
  }
};
</script>

<style scoped>
.chat-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  max-width: 80%;
  min-width: 40%;
  margin-top: 10px;
  background-color: #e4e6eb;
  border-radius: 5px;
  color: #000;
  padding: 5px;
}
.chat-message--right {
  align-self: flex-end;
  align-items: flex-end;
  text-align: end;
  min-width: 40%;
  max-width: 80%;
  background-color: #4883ff;
  color: #fff;
}
p {
  margin: 0;
  word-wrap: break-word;
  text-align: start;
}
.chat-message__text{
  margin-top: 5px;
}
.chat-message__text--right {
  text-align: end;
}
</style>
