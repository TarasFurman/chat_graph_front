<template>
  <button class="create-room-button" type="submit">{{ text }}</button>
</template>

<script>
export default {
  name: 'CreateRoomButton',
  props: {
    text: String
  }
};
</script>

<style>
.create-room-button {
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
</style>
