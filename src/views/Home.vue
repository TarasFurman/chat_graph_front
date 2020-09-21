<template>
  <div v-if="token" class="home-container">
    <GraphContainer />
    <ChatContainer />
  </div>
  <Login v-else />
</template>

<script>
import Login from './Login';
import GraphContainer from '../containers/GraphContainer';
import ChatContainer from '../containers/ChatContainer';

export default {
  name: 'Home',
  components: {
    Login,
    GraphContainer,
    ChatContainer
  },
  data() {
    return {
      token: localStorage.getItem('token')
    };
  }
};
</script>

<style scoped>
.home-container {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
