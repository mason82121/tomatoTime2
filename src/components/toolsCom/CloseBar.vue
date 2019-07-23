<template>
  <div class="close-bar">
    <router-link to="/" class="close_link">
      <i class="material-icons">close</i>
    </router-link>
    <div class="menu-title">POMODORO</div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="scss" scoped>
.close-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 3rem 0;
  .close_link {
    color: $second-color;
    transition: .3s;
    i {
      font-size: 3rem;
    }
    &:hover {
      transform: rotate(180deg);
    }
  }
  .menu-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: $second-color;
    writing-mode: vertical-lr;
  }
}
</style>
