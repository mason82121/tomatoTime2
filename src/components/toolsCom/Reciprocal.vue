<template>
  <div class="reciprocal-panel" :class="playMode">
    <div class="out-circle">
      <div class="inner-circle">
        <div class="play-btn">
          <i class="material-icons" v-if="playing === false" @click="togglePlaying(true)">play_circle_filled</i>
          <i class="material-icons" v-else @click="togglePlaying(false)">pause_circle_filled</i>
        </div>
      </div>
    </div>
    <div class="mession">
      <div class="time-block">{{ time | timeformat }}</div>
      <transition-group name="bounce" class="bounce-block">
        <div class="title" :key="nowMession.id">
          {{ playMode === 'work' ? nowMession.title : 'take a break' }}</div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      timer: null
    };
  },
  mounted() {
    if (this.isStart && this.playing) {
      this.timmerRecip();
    }
  },
  created() {
    this.$bus.$on('onTimeStop', event => {
      window.clearInterval(this.timer);
    });
  },
  destroyed() {
    if (this.timer) window.clearInterval(this.timer);
    this.$bus.$off('onTimeStop');
  },
  computed: {
    ...mapState(['ring', 'playing', 'playMode', 'playingTime', 'modeTime', 'isStart', 'todos', 'nowTodoID']),
    time() {
      if (!this.isStart) return this.modeTime[this.playMode];
      else return this.playingTime;
    },
    nowMession() {
      return this.todos.filter(todo => todo.id === this.nowTodoID)[0];
    }
  },
  methods: {
    togglePlaying(value) {
      this.$store.commit('togglePlaying', { value });
      if (!this.isStart && value === true) {
        this.$store.commit('toggleStarted', { value: true });
        this.$store.commit('setPlayingTime', { value: this.modeTime[this.playMode] });
        this.timmerRecip();
      } else if (this.isStart && value === true) {
        this.timmerRecip();
      } else if (value === false) {
        window.clearInterval(this.timer);
      }
    },
    timmerRecip() {
      this.timer = setInterval(() => {
        this.$store.commit('countDownPlayingTime');
        if (this.playingTime <= 0) {
          this.$store.commit('addTimesInMession');
          this.resetPlaying();
          this.ringAndAlert();
        }
      }, 1000);
    },
    resetPlaying() {
      window.clearInterval(this.timer);
      this.$store.commit('toggleStarted', { value: false });
      this.$store.commit('togglePlaying', { value: false });
      this.$store.commit('setPlayingTime', { value: 0 });
    },
    ringAndAlert() {
      let audio = null;
      if (this.ring[this.playMode] !== 'none') {
        audio = new Audio(`${process.env.BASE_URL}audio/alert/${this.ring[this.playMode]}.mp3`);
        audio.play();
      }
      Swal.fire({
        heightAuto: false,
        title: `${this.playMode === 'break' ? '休息' : '工作'}時間到囉`,
        type: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定'
      }).then((result) => {
        if (result.value) {
          if (audio) audio.pause();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.reciprocal-panel {
  width: 350px;
  height: 350px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  .time-block {
    font-size: 4rem;
    font-weight: bold;
    color: $text-color;
    text-align: center;
  }
  .mession {
    width: 100%;
    position: absolute;
    top: 57px;
  }
  .title {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: $primary-color
  }
  .out-circle {
    width: 116px;
    height: 116px;
    border-radius: 50%;
    background-color: $primary-color;
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    .inner-circle {
      width: 104px;
      height: 104px;
      border: 2px solid $text-color;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .play-btn{
      width: 88px;
      height: 88px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: $text-color;
        font-size: 6.7rem;
        cursor: pointer;
        transition: .3s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  &.break {
    .out-circle .inner-circle {
      border: 2px solid $second-text-color;
    }
    .out-circle .inner-circle .play-btn i {
      color: $second-text-color;
    }
    .time-block {
      color: $second-text-color
    }
  }
}
</style>
