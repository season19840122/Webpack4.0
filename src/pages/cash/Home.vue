<template>
  <div class="home-wrap">
    <div class="home">
      <Menu />
      <Center />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from '@components/Menu';
import Center from './Center';
export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Menu,
    Center
  },
  computed: {
  
  },
  methods: {
    ...mapActions(['getCurrentCaption', 'getThisIndex']),
    init() {
      this.getCurrentCaption(['资金管理']);
      this.getThisIndex(1);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.home-wrap {
  margin-bottom: 46px;
  overflow: hidden;
  .home {
    @include center;
    position: relative;
  }
}
</style>
