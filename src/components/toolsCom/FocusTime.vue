<template>
  <div class="focus_time" :class="playMode">
    <div class="title-bar">
      <div class="title">FOCUS TIME</div>
    </div>
    <div class="tomato_times_block">
      <div class="times_block" v-for="(tomato, index) in tomatos" :key="index">
        <div class="title-name">{{ tomato.name }}</div>
        <div class="tomato-times">
          <div class="times">{{ tomato.times }}</div>
          <span class="unit">/tomato</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tomatos: [
        {
          name: 'today',
          times: 20
        }, {
          name: 'week',
          times: 108
        }
      ]
    };
  },
  computed: {
    ...mapState(['playMode'])
  }
};
</script>

<style lang="scss" scoped>
.focus_time {
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
  .tomato_times_block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 1rem 0 3rem;
    .times_block {
      display: flex;
      flex-direction: column;
    }
    .title-name {
      font-size: 1rem;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      width: 100%;
      text-align-last: left;
    }
    .tomato-times {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      height: 75px;
      .times {
        font-size: 4rem;
        font-weight: bold;
        color: $text-color;
      }
      .unit {
        display: block;
        font-size: 1rem;
        font-weight: bold;
        text-align-last: left;
        color: rgba(white, 0.2);
        text-transform: uppercase;
        margin-bottom: 12px;
        margin-left: 8px;
      }
    }
  }
  &.break {
    .tomato_times_block .times_block .tomato-times .times {
      color: $second-text-color;
    }
  }
}
</style>
