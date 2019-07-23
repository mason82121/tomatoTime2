<template>
  <div class="play-btn" :class="home ? 'home' : playMode">
    <i class="material-icons" @click="onChangeNowMession">play_circle_outline</i>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapState } from 'vuex';
export default {
  props: ['home', 'id'],
  computed: {
    ...mapState(['isStart', 'playMode'])
  },
  methods: {
    onChangeNowMession() {
      if (this.isStart === true) {
        Swal.fire({
          heightAuto: false,
          title: `正在 ${this.playMode === 'break' ? '休息' : '工作'}中`,
          text: '確定要停止目前動作',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.value) {
            this.$store.commit('toggleStarted', { value: false });
            this.$store.commit('togglePlaying', { value: false });
            this.$store.commit('setPlayMode', { value: 'work' });
            this.$store.commit('onChangeNowMession', { id: this.id });
            this.$bus.$emit('onTimeStop');
          }
        });
      } else {
        this.$store.commit('onChangeNowMession', { id: this.id });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.play-btn {
  i {
    color: white;
    cursor: pointer;
    transition: .3s;
    &:hover {
      color: $text-color;
    }
  }
  &.home {
    i {
      color: $primary-color;
      &:hover {
        color: rgba($primary-color, 0.5);
      }
    }
  }
  &.break {
    i:hover {
      color: $second-text-color;
    }
  }
}
</style>
