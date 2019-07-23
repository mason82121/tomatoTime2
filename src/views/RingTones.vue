<template>
  <div class="p__ring_tones">
    <div class="ring_tones_panel">
      <ring-radio-panel
        v-model="workRing"
        title="WORK"
        :ringOptions="workOptions"
        :value="workRing"
      ></ring-radio-panel>
      <ring-radio-panel
        v-model="breakRing"
        title="BREAK"
        :ringOptions="breakOptions"
        :value="breakRing">
      </ring-radio-panel>
    </div>
  </div>
</template>

<script>
import RingRadioPanel from '@/components/toolsCom/RingRadioPanel.vue';
export default {
  data() {
    return {
      workOptions: [{ value: 'none' }, { value: 'default' }, { value: 'alarm' }, { value: 'alert' },
        { value: 'beep' }, { value: 'bell' }, { value: 'bird' }, { value: 'bugle' }, { value: 'digital' },
        { value: 'drop' }, { value: 'horn' }, { value: 'music' }, { value: 'ring' }, { value: 'warning' },
        { value: 'whistle' }
      ],
      breakOptions: [{ value: 'none' }, { value: 'default' }, { value: 'alarm' }, { value: 'alert' },
        { value: 'beep' }, { value: 'bell' }, { value: 'bird' }, { value: 'bugle' }, { value: 'digital' },
        { value: 'drop' }, { value: 'horn' }, { value: 'music' }, { value: 'ring' }, { value: 'warning' },
        { value: 'whistle' }
      ]
    };
  },
  computed: {
    breakRing: {
      get() {
        return this.$store.state.ring.break;
      },
      set(value) {
        this.$store.commit('onChangeBreakRing', { value: value.value });
      }
    },
    workRing: {
      get() {
        return this.$store.state.ring.work;
      },
      set(value) {
        this.$store.commit('onChangeWorkRing', { value: value.value });
      }
    }
  },
  components: {
    RingRadioPanel
  }
};
</script>

<style lang="scss">
.p__ring_tones {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
  height: 100%;
  .ring_tones_panel {
    width: 100%;
    max-width: 445px;
  }
}
</style>
