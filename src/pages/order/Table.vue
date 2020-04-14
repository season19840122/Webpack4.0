<template>
  <div class="table-wrap">
    <div class="table">
      <div class="tbl-data" v-if="orderList.data && orderList.data.length">
        <table>
          <thead>
            <tr>
              <th style="width: 17%;">创建时间</th>
              <th style="width: 25%;">订单号</th>
              <th style="width: 15%;">商品名称</th>
              <th style="width: 13%;">游戏区服</th>
              <th style="width: 10%;">规格</th>
              <th style="width: 8%;">订单金额</th>
              <th style="width: 10%;">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderList.data" :key="index">
              <td style="width: 17%;" :title="item.addTime">{{ item.addTime }}</td>
              <td style="width: 25%;" :title="item.orderNo">{{ item.orderNo }}</td>
              <td style="width: 15%;" :title="item.productName">{{ item.productName }}</td>
              <td style="width: 13%;" :title="item.areaServerName">{{ item.areaServerName }}</td>
              <td style="width: 10%;" :title="item.confName">{{ item.confName }}</td>
              <td style="width: 8%;" :title="item.partnerPrice">{{ item.partnerPrice }}</td>
              <td style="width: 10%;" :title="item.status">{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="nodata-wrap" v-else>
        <div class="nodata">
          <img src="@images/nodata.png" alt="">
          <p class="info">暂无数据，您可以变更条件再次查询</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Table',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['orderList'])
  },
  methods: {
    init() {
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    // orderList(newVal, oldVal){
    //   console.log(newVal,oldVal);
    //   if(!this.orderList.data.length) {
    //     this.isShow = false;
    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  .table {
    height: 688px;
    .tbl-data {
      table {
        width: 100%;
        table-layout: fixed;
        border: 1px solid #e8e9eb;
        tr {
          &:nth-of-type(even){
            td {
              background-color: #f7f7f7;
            }
          }
          th, td {
            text-indent: 10px;
            height: 64px;
            color: #8d8e99;
            @include eps;
          }
          th {
            height: 46px;
            background-color: #eeeeee;
            color: #5a5b66;
          }
        }
      }
    }
    .nodata-wrap {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
