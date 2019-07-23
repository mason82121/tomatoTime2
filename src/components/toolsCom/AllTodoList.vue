<template>
  <div class="all-todo-list" :class="playMode">
    <div class="title-bar">
      <div class="title">{{ title }}</div>
      <i class="material-icons" :class="closed ? 'closed' : ''" @click="toggleLsit">arrow_drop_down</i>
    </div>
    <div class="todo-list" :class="closed ? 'closed' : ''">
      <transition-group name="fade">
        <div class="todo-item" v-for="item in todos" :key="item.id">
          <check-box width="24" height="24" size="16" color="white" :id="item.id" :value="item.isCompleted"
            @toggleValue='toggleItemCompleted'>
          </check-box>
          <div class="item-title" :class="item.isCompleted ? 'line' : ''" @dblclick="dbClickItem(item.id, item.title)">
            <span v-if="item.id === $store.state.nowTodoID && $store.state.playMode === 'work'"></span>
            {{ item.title }}
          </div>
          <play-btn v-if="item.isCompleted === false" :id="item.id"></play-btn>
          <div class="dots" v-else>
            <div class="dot" v-for="(dot, index) in item.doTimes" :key="index"></div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import CheckBox from '@/components/CheckBox.vue';
import PlayBtn from '@/components/Playbtn.vue';
export default {
  props: ['todos', 'title'],
  computed: {
    playMode() {
      return this.$store.state.playMode;
    }
  },
  data() {
    return {
      closed: false
    };
  },
  components: {
    CheckBox,
    PlayBtn
  },
  methods: {
    toggleLsit() {
      this.closed = !this.closed;
    },
    toggleItemCompleted(id) {
      this.$store.commit('toggleItemCompleted', { id });
    },
    dbClickItem(id, text) {
      Swal.fire({
        customClass: {
          header: 'alert__header',
          title: this.playMode === 'break' ? 'alert__btitle' : 'alert__mtitle',
          input: 'alert__input',
          popup: 'alert__popup',
          actions: 'alert__actions',
          cancelButton: 'alert__cancelbtn'
        },
        heightAuto: false,
        title: '修改或刪除待辦任務',
        input: 'text',
        inputValue: text,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '刪除'
      }).then((result) => {
        if (result.dismiss === 'cancel') {
          this.$store.commit('deleteTodoItemById', { id });
        }
        if (result.value) {
          this.$store.commit('editTodoItemById', { id, text: result.value });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.all-todo-list {
  margin-top: 3rem;
  .title-bar {
    background-color: $title-bar-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    .title {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
    i {
      cursor: pointer;
      font-size: 1.5rem;
      color: white;
      transition: .3s;
      &.closed {
        transform: rotate(-180deg);
      }
    }
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    transition: .3s;
    height: 250px;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    .todo-item {
      width: 100%;
      height: 49px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid rgba(white, 0.2);
      cursor: pointer;
    }
    .item-title {
      width: 100%;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      color: white;
      text-align: left;
      transition: .3s;
      span {
        width: 12px;
        height: 12px;
        display: inline-block;
        border-radius: 50%;
        background-color: $text-color;
        margin-right: 8px;
        text-transform: initial;
      }
      &:hover {
        color: $text-color;
      }
      &.line {
        text-decoration: line-through;
      }
    }
    .dots {
      display: flex;
      .dot {
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-radius: 50%;
        margin-left: 0.5rem;
      }
    }
    &.closed {
      height: 0;
      overflow: hidden;
    }
  }
  &.break {
    .todo-list .todo-item .item-title:hover {
      color: $second-text-color;
    }
  }
}
</style>
