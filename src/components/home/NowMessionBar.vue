<template>
  <div class="now_mession_title">
    <check-box :id="nowTodoID" :value="nowMession.isCompleted" @toggleValue='toggleItemCompleted'></check-box>
    <div class="now_mession">
      <div class="title">{{ nowMession.title }}</div>
      <div class="dots">
        <div class="dot" v-for="dot in nowMession.doTimes" :key="dot"></div>
        <div class="dot active" v-show="playMode === 'work'">
          <svg id="pie" xmlns="http://www.w3.org/2000/svg">
            <circle ref="circleProcess2" cx="50%" cy="50%" r="6" stroke-width="12" stroke="#FF4384" fill="#FFEDF7"></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from '../CheckBox.vue';
import { mapState } from 'vuex';
export default {
  props: ['nowTodoID'],
  data() {
    return {
      circleProcess2: null
    };
  },
  watch: {
    dashValue(value) {
      this.circleProcess2.setAttribute('stroke-dashoffset', value);
    }
  },
  mounted() {
    this.circleProcess2 = this.$refs['circleProcess2'];
  },
  computed: {
    ...mapState(['modeTime', 'playMode', 'todos', 'dashValue']),
    nowMession() {
      return this.todos.filter(todo => todo.id === this.nowTodoID)[0];
    }
  },
  components: {
    CheckBox
  },
  methods: {
    toggleItemCompleted(id) {
      this.$store.commit('toggleItemCompleted', { id });
    }
  }
};
</script>

<style lang="scss" scoped>
.now_mession_title {
  display: flex;
  .now_mession {
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform:uppercase;
    }
    .dots {
      display: flex;
      margin-top: 0.5rem;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: $primary-color;
      margin-right: 10px;
      &.active {
        border: 1px solid $text-color;
        background-color: white;
        overflow: hidden;
      }
    }
    svg#pie {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      width: 12px;
      height: 12px;
      stroke-dasharray: 360%;
      stroke-dashoffset: 360%;
      background-color: #fff !important;
      fill: 'white';
      circle {
        transition: .4s;
      }
    }
  }
}
</style>
