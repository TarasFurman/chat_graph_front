<template>
  <button class="button-exit" type="button" @click="() => exitHandler()">
    Exit
  </button>
</template>

<script>
export default {
  name: 'ExitButton',
  methods: {
    exitHandler() {
      localStorage.clear();
      window.location.href = '/';
    }
  }
};
</script>

<style>
.button-exit {
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  max-height: 40px;
  box-sizing: border-box;
  align-items: center;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: all 0.4s;
}
.button-exit:hover {
  background: #fff;
}
</style>
