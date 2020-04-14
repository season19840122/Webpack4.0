<template>
  <div class="datepicker-wrap">
    <div class="datepicker">
      <span class="s1">创建时间</span>
      <a-range-picker 
        @change="onChange"
        :defaultValue="[moment(date.startTime, dateFormat), moment(date.endTime, dateFormat)]"
        :format="dateFormat" />
      <span class="s1" style="margin-left: 10px;">状态</span>
      <a-select defaultValue="全部" style="width: 120px" @change="handleChange">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="支付成功">支付成功</a-select-option>
        <a-select-option value="交易成功">交易成功</a-select-option>
        <a-select-option value="交易失败">交易失败</a-select-option>
        <a-select-option value="退款中">退款中</a-select-option>
        <a-select-option value="退款成功">退款成功</a-select-option>
        <a-select-option value="退款失败">退款失败</a-select-option>
      </a-select>
      <button class="btn-confirm" @click="handleQuery">查询</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
export default {
  name: 'Datepicker',
  data() {
    return {
      date: {
        startTime: moment(new Date()).subtract(1,'months').format('YYYY-MM-DD') + ' 00:00:00',
        endTime: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
      },
      dateFormat: 'YYYY-MM-DD',
      isActive: true,
      // orderInfo: {
      //   status: '',
      //   page: 1,
      //   limit: 10
      // }
    };
  },
  computed: {
    ...mapGetters(['orderList', 'orderInfo'])
  },
  methods: {
    moment,
    ...mapActions(['getCurrentModal', 'getFailModal', 'getOrderList', 'getPage', 'getOrderInfo']),
    // datapicker
    onChange(date, dateString) {
      console.log(dateString);
      // this.orderInfo.startTime = dateString[0];
      // this.orderInfo.endTime = dateString[1];
      this.getOrderInfo({
        startTime: dateString[0] + ' 00:00:00',
        endTime: dateString[1] + ' 23:59:59'
      });
    },
    // select
    handleChange(value) {
      // this.orderInfo.status = value;
      this.getOrderInfo({
        status: value
      });
    },
    getList() {
      // console.log(JSON.stringify(this.date));
      // this.orderInfo.startTime = this.date.startTime;
      // this.orderInfo.endTime = this.date.endTime;
      this.getOrderInfo({
        startTime: this.orderInfo.startTime,
        endTime: this.orderInfo.endTime,
      });
      this.getOrderInfo({
        page: 1
      });
      axios.orderList(this.orderInfo).then(res => {
        if(res && res.success) {
          this.getOrderList(res.data);
          // 分页
          let pageObj = {};
          pageObj['flag'] = 0;
          pageObj['total'] = res.data.count;
          pageObj['currentPage'] = res.data.page;
          // pageObj['total'] = 100;
          // pageObj['currentPage'] = 3;
          this.getPage(pageObj);
        } else {
          this.getFailModal({
            message: res.message || '网络连接超时！'
          });
        }
      });
    },
    handleQuery(){
      this.getList();
    },
    init() {
      this.getOrderInfo({
        startTime: this.date.startTime,
        endTime: this.date.endTime
      });
      this.getList();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.ant-calendar-picker {
  width: 250px;
}
.datepicker-wrap {
  .datepicker {
    margin-bottom: 15px;
   .s1 {
     line-height: 32px;
     margin-right: 5px;
   }
   .btn-confirm {
     @include btn(68px, 28px, 14px);
     margin-left: 10px;
   }
  }
}
</style>
