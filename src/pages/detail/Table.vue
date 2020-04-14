<template>
  <div class="table-wrap">
    <div class="table">
      <div class="tbl-data" v-if="detailList.data && detailList.data.length">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">提现时间</th>
              <th style="width: 25%;">到账账户</th>
              <th style="width: 12%;">提现金额</th>
              <th style="width: 13%;">状态</th>
              <th style="width: 30%;">备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in detailList.data" :key="index">
              <td style="width: 20%;" :title="item.addTime">{{ item.addTime }}</td>
              <td style="width: 25%;" :title="item.arrivalAccount">{{ item.arrivalAccount }}</td>
              <td style="width: 12%;" :title="item.values">{{ item.values }}</td>
              <td style="width: 13%;" :title="item.status">{{ item.status }}</td>
              <td style="width: 30%;" :title="item.remark">{{ item.remark }}</td>
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
    ...mapGetters(['detailList'])
  },
  methods: {
    init() {

    }
  },
  mounted() {
    this.init();
  }
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
