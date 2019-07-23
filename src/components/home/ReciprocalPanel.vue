<template>
  <div class="reciprocal-panel" :class="playMode">
    <div class="inner-circle" :class="playing ? 'playing' : ''">
      <svg id="circleSvg" xmlns="http://www.w3.org/2000/svg">
        <circle ref="circleProcess" cx="50%" cy="50%" r="260" stroke-width="21" :stroke="playMode === 'work' ? '#FF4384' : '#00A7FF'"></circle>
      </svg>
      <div class="play-btn">
        <i class="material-icons" v-if="playing === false" @click="togglePlaying(true)">play_circle_filled</i>
        <i class="material-icons" v-else @click="togglePlaying(false)">pause_circle_filled</i>
        <div class="dot" @click="resetPlaying"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      circleProcess: null,
      timer: null
    };
  },
  computed: {
    ...mapState(['playing', 'playMode', 'playingTime', 'modeTime', 'isStart', 'ring'])
  },
  mounted() {
    this.circleProcess = this.$refs['circleProcess'];
    if (this.isStart && this.playing) {
      this.timmerRecip();
    }
  },
  created() {
    this.$bus.$on('onTimeStop', event => {
      window.clearInterval(this.timer);
      this.circleProcess.setAttribute('stroke-dashoffset', '360%');
    });
  },
  destroyed() {
    if (this.timer) window.clearInterval(this.timer);
    this.$bus.$off('onTimeStop');
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
    resetPlaying() {
      window.clearInterval(this.timer);
      this.$store.commit('toggleStarted', { value: false });
      this.$store.commit('togglePlaying', { value: false });
      this.$store.commit('setPlayingTime', { value: 0 });
      this.circleProcess.setAttribute('stroke-dashoffset', '360%');
    },
    timmerRecip() {
      this.timer = setInterval(() => {
        this.$store.commit('countDownPlayingTime');
        let percent = this.playingTime / this.modeTime[this.playMode] * 360 + '%';
        this.circleProcess.setAttribute('stroke-dashoffset', percent);
        this.$store.commit('onChangeDashValue', { value: percent });
        if (this.playingTime <= 0) {
          this.$store.commit('addTimesInMession');
          this.resetPlaying();
          this.ringAndAlert();
        }
      }, 1000);
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
  width: 540px;
  height: 540px;
  border: 4px solid $text-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  .inner-circle #circleSvg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    width: 540px;
    height: 540px;
    stroke-dasharray: 360%;
    stroke-dashoffset: 360%;
    fill: none;
    circle {
      transition: .4s;
    }
  }
  .inner-circle {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: $text-color;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;
    .play-btn {
      color: white;
      width: 6rem;
      height: 6rem;
      transition: .3s;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 6.2rem;
        cursor: pointer;
        transition: .3s;
        user-select: none;
        &:hover {
          transform: scale(1.2);
        }
      }
      .dot {
        width: 14px;
        height: 14px;
        background-color: white;
        cursor: pointer;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateX(100%);
        transition: .3s;
        &:hover {
          transform: scale(1.3) translateX(100%);
        }
      }
    }
  }
  .inner-circle.playing {
    background-color: white;
    border: 4px solid $text-color;
    .play-btn {
      color: $text-color;
      .dot {
        background-color: $text-color;
      }
    }
  }
  &.break {
    border-color: $second-text-color;
    .inner-circle {
      background-color: $second-text-color;
    }
    .inner-circle.playing {
      background-color: white;
      border: 4px solid $second-text-color;
      .play-btn {
        color: $second-text-color;
        .dot {
          background-color: $second-text-color;
        }
      }
    }
  }
}
</style>
