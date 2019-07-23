<template>
  <div class="ring_radio_panel">
    <div class="title-bar">
      <div class="title">{{ title }}</div>
    </div>
    <div class="radio-items">
      <div class="item" v-for="(item, index) in ringOptions" :key="index">
        <input type="radio" :id="`${title}_${item.value}`"
               :name="title + 'rung'" :checked="item.value === value"
               :value="item.value"
               @change="playSound">
        <label :for="`${title}_${item.value}`" class="fake-radio"></label>
        <label :for="`${title}_${item.value}`">{{ item.value }}</label>
        <i class="material-icons" v-if="audio && soundValue === item.value" @click="pauseSound">pause</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'ringOptions', 'value'],
  data() {
    return {
      soundValue: null,
      audio: null
    };
  },
  destroyed() {
    if (this.audio) this.audio.pause();
  },
  methods: {
    playSound(e) {
      this.soundValue = e.target.value;
      if (this.soundValue !== 'none') {
        if (this.audio) this.audio.pause();
        this.audio = new Audio(`${process.env.BASE_URL}audio/alert/${this.soundValue}.mp3`);
        this.audio.play();
      } else {
        if (this.audio) this.audio.pause();
        this.audio = null;
      }
      this.$emit('input', { value: this.soundValue });
    },
    pauseSound() {
      if (this.audio) this.audio.pause();
      this.audio = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.ring_radio_panel {
  width: 100%;
  margin-bottom: 2rem;
  .title-bar {
    background-color: $title-bar-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 16px;
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
  .radio-items {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33.333%;
      font-size: 1rem;
      font-weight: normal;
      color: white;
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      label {
        margin-left: 8px;
        text-transform: uppercase;
        cursor: pointer;
        transition: .3s;
        &:hover {
          text-shadow: 0px 0px 5px rgba($second-text-color, 1);
        }
      }
      input {
        display: none;
        &:checked {
          ~label.fake-radio {
            border-color: $text-color;
            &:after {
              opacity: 1;
            }
          }
        }
      }
      label.fake-radio {
        margin: 0;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        transition: .3s;
        cursor: pointer;
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background-color: $text-color;
          transition: .3s;
          opacity: 0;
          cursor: pointer;
        }
      }
      i {
        font-size: 1rem;
        color: $text-color;
        cursor: pointer;
        margin-left: 0.5rem;
        transition: .3s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
