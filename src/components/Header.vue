<template>
  <div class="header-container">
    <div class="hi-username">Hi, {{ userName }}</div>
    <ExitButton />
  </div>
</template>

<script>
import ExitButton from './Buttons/ExitButton';
export default {
  name: 'Header',
  components: {
    ExitButton
  },
  data() {
    return {
      userName: JSON.parse(localStorage.user).user_name
    };
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.hi-username {
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gilroy';
  font-weight: 400;
}
</style>
