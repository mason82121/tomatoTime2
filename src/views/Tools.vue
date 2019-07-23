<template>
  <div class="p__tools">
    <menu-recipt></menu-recipt>
    <vue-page-transition id="tools_panel" name="slideInDown">
      <router-view></router-view>
    </vue-page-transition>
    <close-bar></close-bar>
  </div>
</template>

<script>
import MenuRecipt from '@/components/toolsCom/MenuRecipt.vue';
import CloseBar from '@/components/toolsCom/CloseBar.vue';
export default {
  components: {
    MenuRecipt,
    CloseBar
  }
};
</script>

<style lang="scss" scoped>
.p__tools {
  width: 100%;
  height: 100%;
  padding: 0 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  #tools_panel {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
