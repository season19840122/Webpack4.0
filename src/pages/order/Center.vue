<template>
  <div class="center-wrap">
    <div class="center">
      <Datepicker />
      <div class="info-wrap" v-if="orderList && orderList.count">
        <p class="info">总计{{ orderList.count }}单，订单金额{{ orderList.totalMoney}}元</p>
      </div>
      <Table />
    </div>
    <Paging v-if="orderList && orderList.count"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Datepicker from './Datepicker';
import Table from './Table';
import Paging from '@components/Paging';
export default {
  name: 'Center',
  data() {
    return {
    };
  },
  components: {
    Datepicker,
    Table,
    Paging
  },
  computed: {
    ...mapGetters(['orderList'])
  },
  methods: {
    init() {
      // console.log(JSON.stringify(this.orderList));
      // console.log(this.orderList);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.center-wrap {
  margin-left: 220px;
  .center {
    width: 980px;
    position: relative;
    background: #ffffff;
    @include br(1px);
    @include bs;
    padding: 30px;
    .info-wrap {
      .info {
        background-color: #ebf0fa;
        color: #8d8e99;
        height: 34px;
        line-height: 34px;
        @include br(1px);
        text-indent: 10px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
