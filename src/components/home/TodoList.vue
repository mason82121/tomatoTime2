<template>
  <div class="todo_list" :class="playMode">
    <transition-group name="slide" class="todo-block">
      <div class="todo-item" v-for="item in todosDoing" :key="item.id">
        <check-box width="24" height="24" size="16" :id="item.id" :value="item.isCompleted" @toggleValue='toggleItemCompleted'></check-box>
        <div class="title">{{ item.title }}</div>
        <play-btn :home="true" :id="item.id"></play-btn>
      </div>
    </transition-group>
    <div class="more"><span @click="redirect">MORE</span></div>
  </div>
</template>

<script>
import CheckBox from '../CheckBox.vue';
import PlayBtn from '../Playbtn.vue';
import { mapState } from 'vuex';
export default {
  components: {
    CheckBox,
    PlayBtn
  },
  computed: {
    ...mapState(['playing', 'playMode', 'todos', 'nowTodoID']),
    todosDoing() {
      return this.todos.filter(todo => todo.isCompleted === false && todo.id !== this.nowTodoID)
                       .sort((a, b) => new Date(b.id) - new Date(a.id)).slice(0, 5);
    }
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'todo' });
    },
    toggleItemCompleted(id) {
      this.$store.commit('toggleItemCompleted', { id });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo_list {
  width: 100%;
  .todo-block {
    display: block;
    max-height: 112px;
    overflow: hidden;
  }
  .todo-item {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid rgba($primary-color, 0.2);
    margin-bottom: 0.5rem;
    .title {
      color: $primary-color;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    .play-btn {
      margin-left: auto;
      cursor: pointer;
      i {
        color: $primary-color;
      }
    }
  }
  .more {
    color: $text-color;
    font-size: 1rem;
    font-weight: bold;
    text-align: right;
    margin-top: 8px;
    span {
      cursor: pointer;
    }
  }
  &.break {
    .more {
      color: $second-text-color;
    }
  }
}
</style>
