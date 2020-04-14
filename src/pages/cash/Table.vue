<template>
  <div class="table-wrap">
    <div class="table">
      <div class="tbl-data" v-if="cashList && cashList.length">
        <table>
          <thead>
            <tr>
              <th style="width: 15%;">资金管理</th>
              <th style="width: 12%;">变动金额</th>
              <th style="width: 12%;">变动前金额</th>
              <th style="width: 12%;">变动后金额</th>
              <th>变动时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cashList" :key="index">
              <td style="width: 15%;" :title="item.sourceType">{{ item.sourceType }}</td>
              <td style="width: 12%;" :title="item.changeCnt">{{ item.changeCnt }}</td>
              <td style="width: 12%;" :title="item.beforeCnt">{{ item.beforeCnt }}</td>
              <td style="width: 12%;" :title="item.afterCnt">{{ item.afterCnt }}</td>
              <td :title="item.addTime">{{ item.addTime }}</td>
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
    ...mapGetters(['cashList'])
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
