<template>
  <div class="menu-recipt" :class="playMode">
    <div class="menu_list">
      <router-link to="/tools/todo" class="menu_link">
        <i class="material-icons">list</i>
        <span class="title">to-do list</span>
      </router-link>
      <router-link to="/tools/analytics" class="menu_link">
        <i class="material-icons">assessment</i>
        <span class="title">analytics</span>
      </router-link>
      <router-link to="/tools/ringtones" class="menu_link">
        <i class="material-icons">library_music</i>
        <span class="title">ringtones</span>
      </router-link>
    </div>
    <reciprocal></reciprocal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Reciprocal from './Reciprocal.vue';
export default {
  components: {
    Reciprocal
  },
  computed: {
    ...mapState(['playing', 'playMode'])
  }
};
</script>

<style lang="scss" scoped>
.menu-recipt {
  height: 100%;
  min-width: 350px;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  .menu_list {
    display: flex;
    flex-direction: column;
    .menu_link {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2.6rem;
      &:hover {
        i, span {
          text-shadow: 0px 0px 10px rgba(white, 0.2);
        }
      }
      &.router-link-active {
        i, span {
          color: $text-color;
        }
      }
    }
    .menu_link i, .menu_link span {
      font-size: 2.25rem;
      color: rgba(white, 0.2);
      transition: .3s;
    }
    .menu_link span {
      margin-left: 0.5rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
  &.break {
    .menu_link.router-link-active {
      i, span {
        color: $second-text-color;
      }
    }
  }
}
</style>
