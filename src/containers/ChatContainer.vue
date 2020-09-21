<template>
  <div class="chat-container">
    <Header />
    <CreateRoom />
    <SelectRoom />
    <Chat />
  </div>
</template>

<script>
import Header from '../components/Header';
import CreateRoom from '../components/CreateRoom';
import SelectRoom from '../components/SelectRoom';
import Chat from '../components/Chat';

export default {
  name: 'ChatContainer',
  components: {
    Header,
    CreateRoom,
    SelectRoom,
    Chat
  }
};
</script>

<style>
.chat-container {
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  background-color: #d1cece;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
</style>
