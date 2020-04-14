<template>
  <div class="datepicker-wrap">
    <div class="datepicker">
      <span class="s1">创建时间</span>
      <a-range-picker 
        @change="onChange"
        :defaultValue="[moment(date.startTime, dateFormat), moment(date.endTime, dateFormat)]"
        :format="dateFormat" />
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
        startTime: moment(new Date()).subtract(7,'days').format('YYYY-MM-DD') + ' 00:00:00',
        endTime: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
      },
      dateFormat: 'YYYY-MM-DD',
      isActive: true
    };
  },
  computed: {
    ...mapGetters(['cashList', 'cashInfo'])
  },
  methods: {
    moment,
    ...mapActions(['getCurrentModal', 'getFailModal', 'getCashList', 'getPage', 'getCashInfo']),
    // datapicker
    onChange(date, dateString) {
      // console.log(dateString);
      this.getCashInfo({
        startTime: dateString[0],
        endTime: dateString[1]
      });
    },
    getList() {
      // console.log(JSON.stringify(this.date));
      this.getCashInfo({
        startTime: this.cashInfo.startTime,
        endTime: this.cashInfo.endTime
      });
      this.getCashInfo({
        page: 1
      });
      axios.page(this.cashInfo).then(res => {
        if(res && res.success) {
          let cashList = res.data.data;
          this.getCashList(cashList);

          // 分页
          let pageObj = {};
          pageObj['flag'] = 2;
          pageObj['total'] = res.data.count;
          pageObj['currentPage'] = res.data.page;
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
      this.getCashInfo({
        startTime: this.date.startTime,
        endTime: this.date.endTime,
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
