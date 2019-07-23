<template>
  <div class="todo_input" :class="playMode">
    <input type="text" placeholder="add a new mission..." v-model="text" @keyup.enter="AddTodoItem">
    <i class="material-icons" @click="AddTodoItem">add</i>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      text: ''
    };
  },
  computed: {
    ...mapState(['playing', 'playMode'])
  },
  methods: {
    AddTodoItem() {
      if (this.text.trim().length === 0) return;
      this.$store.commit('addTodoItem', { title: this.text });
      this.text = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.todo_input {
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  input {
    outline: none;
    border: none;
    width: 100%;
    height: 56px;
    color: $text-color;
    &::placeholder {
      color: $text-color;
      font-style: italic;
      font-weight: bold;
      text-transform:uppercase;
    }
  }
  i {
    font-size: 24px;
    color: $text-color;
    cursor: pointer;
    transition: .3s;
    &:hover {
      color: $second-text-color;
      transform: rotate(360deg);
    }
  }
  &.break {
    input {
      color: $second-text-color;
    }
    input::placeholder {
      color: $second-text-color;
    }
    i {
      color: $second-text-color;
      &:hover {
        color: $text-color;
      }
    }
  }
}
</style>
