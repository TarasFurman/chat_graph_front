<template>
  <div class="container">
    <div class="login-input">
      <span class="enter">Enter your name</span>
      <div class="input-container">
        <form @submit.prevent="onSubmit">
          <input class="input-name" type="text" v-model="userName" />
          <div class="submit-button">
            <button class="login-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return { userName: '' };
  },
  methods: {
    ...mapActions(['loginUser']),
    onSubmit() {
      this.userName && this.loginUser(this.userName);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.login-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Gilroy';
  font-weight: 400;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebedf4;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 40px;
}
.enter {
  font-size: 24px;
  line-height: 28px;
  color: #4f4d59;
  margin-bottom: 10px;
}
.input-container {
  width: 100%;
  display: inline-block;
  position: relative;
}
.input-name {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #bebdcb;
  border-radius: 8px;
  min-width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gilroy';
  font-weight: 400;
}
.input-name:focus {
  outline: none;
  border: 1px solid #4d90fe;
  -webkit-box-shadow: 0px 0px 3px #4d90fe;
  box-shadow: 0px 0px 3px #4d90fe;
}
.login-button {
  display: flex;
  justify-content: center;
  position: relative;
  color: #ffffff;
  background: #445b9d;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  width: 100%;
  padding: 11px 20px;
  max-height: 36px;
  box-sizing: border-box;
  align-items: center;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: all 0.4s;
}
.login-button:hover {
  background-color: #324479;
}
.submit-button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.login-button:focus {
  outline: none;
}
</style>
