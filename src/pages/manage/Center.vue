<template>
  <div class="center-wrap">
    <div class="center">
      <h3 class="caption">提现</h3>
      <a :href="currentURL.detail" class="detail">提现明细</a>
      <div class="form-wrap">
        <div class="formitem">
          <label class="lbl">可提现金额：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.values">{{ amountDeail.values }}元</label>
        </div>
        <div class="formitem">
          <label for="iptPwd" class="lbl">到账方式：</label>
          <label class="lbl2">银行卡提现</label>
          <a :href="currentURL.modify" class="link">【修改】</a>
        </div>
        <!-- <div class="formitem">
          <label class="lbl">支付宝账号：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.payAccount">{{ amountDeail.payAccount | formatPhone }}</label>
        </div> -->
        <div class="formitem">
          <label class="lbl">银行名称：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.bankName">{{ amountDeail.bankName }}</label>
        </div>
        <div class="formitem">
          <label class="lbl">开户行名称：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.openBank">{{ amountDeail.openBank}}</label>
        </div>
        <div class="formitem">
          <label class="lbl">银行账户：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.payAccount">{{ amountDeail.payAccount }}</label>
        </div>
        <div class="formitem">
          <label class="lbl">账户名：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.payName">{{ amountDeail.payName }}</label>
        </div>
        <div class="formitem">
          <label class="lbl">手机号：</label>
          <label class="lbl2" v-if="amountDeail && amountDeail.phone">{{ amountDeail.phone | formatPhone }}</label>
        </div>
        <div class="formitem">
          <label for="iptVfy" class="lbl">短信验证码：</label>
          <input type="text" id="iptVfy" class="ipt-text m" placeholder="请输入验证码" v-model="verify" />
          <button class="btns" :class="{ 'disable': !isDisabled }" :disabled="!isDisabled" @click="handleCountdown">{{ countdown }}</button>
          <span class="error" v-show="error.err1">未点击发送验证码</span>
          <span class="error" v-show="error.err2">短信验证码不能为空</span>
        </div>
        <div class="formitem">
          <label for="iptCfm" class="lbl">提现金额：</label>
          <input type="text" id="iptCfm" class="ipt-text m" placeholder="请输入提现金额" @input="oninput" @blur="onblur"/>
          <span class="error" v-show="error.err3">提现金额大于可提现金额！</span>
          <span class="error" v-show="error.err4">提现金额错误！</span>
        </div>
        <div class="formitem">
          <label class="lbl">到账金额：</label>
          <label class="lbl2">{{ arrivalValue }}元</label>
        </div>
        <div class="formitem" style="margin-bottom: 0;">
          <button class="btn-confirm" style="margin-left: 135px;" @click="handleWithdraw">确认提现</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Center',
  data() {
    return {
      values: '',
      verify: '',
      countdown: '发送验证码',
      isDisabled: true,
      isClick: false,
      error: {
        err1: false,
        err2: false
      }
    };
  },
  computed: {
    ...mapGetters(['currentURL', 'amountDeail']),
    // inpNum: {
    //   get() {
    //     return this.values;
    //   },
    //   set(newValue) {
    //     this.values = newValue.replace(/[^\d]/g,'');
    //   }
    // },
    arrivalValue() {
      if(!this.values) return '0.00';
      return common.utils.saveTwoDigit(this.values);
    }
  },
  methods: {
    ...mapActions(['getCurrentModal', 'getFailModal', 'getAmount']),
    oninput(e) {
      // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      this.values = e.target.value;
      // console.log('e',e.target.value);
    },
    onblur(e){
      if(e.target.value.match(/^\d*(\.?\d{0,2})/g)[0].slice(-1) == '.') {
        this.values = e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0].slice(0, -1);
      }
    },
    // 获取提现信息
    getAmountDeail(){
      axios.amountdeail().then(res => {
        if(res && res.success) {
          this.getAmount(res.data);
          // console.log(1);
        } else {
          // console.log(2);
          this.getFailModal({
            message: res.message || '网络连接超时！'
          });
        }
      });
    },
    handleCountdown() {
      axios.sendActiveNo({
        phone: this.amountDeail.phone
      }).then(res => {
        // countdown
        if (res && res.success) {
          this.isClick = true;
          this.isDisabled = false;
          this.error.err1 = false;
          // 倒计时
          this.countdown = 60;
          // 判断是否点击验证码
          let t = setInterval(() => {
            this.countdown--;
            if (this.countdown === 0) {
              clearInterval(t);
              this.countdown = '发送验证码';
              this.isDisabled = true;
            }
          }, 1000);
        } else {
          this.getFailModal({
            message: res.message
          });
        }
      });
    },
    handleWithdraw() {
      var error = {
        err1: false,
        err2: false,
        err3: false,
        err4: false
      };
      this.error = error;
      if(!this.isClick){
        return this.error.err1 = true;
      }
      if(common.utils.checkNull(this.verify)) {
        return this.error.err2 = true;
      }
      if(common.utils.checkNull(this.inpNum) || (this.arrivalValue > this.amountDeail.values)) {
        return this.error.err3 = true;
      }
      if(isNaN(this.arrivalValue)){
        return this.error.err4 = true;
      }
      
      // 提现
      var amountDeail = this.amountDeail;
      axios.save({
        'phone': amountDeail.phone,
        'payType': amountDeail.payType,
        'payAccount': amountDeail.payAccount,
        'payName': amountDeail.payName,
        'values': this.values, 
        'arrivalValue': this.arrivalValue,
        'activeNo': this.verify,
        'bankName': amountDeail.bankName,
        'openBank': amountDeail.openBank
      }).then(res => {
        if(res && res.success) {
          this.getCurrentModal('manageSuccess');
        } else {
          this.getFailModal({
            message: res.message
          });
        }
      });
    },
    init() {
      this.getAmountDeail();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.center-wrap {
  margin-left: 220px;
  .center {
    width: 980px;
    height: 665px;
    position: relative;
    background: #ffffff;
    @include bs;
    padding-left: 50px;
    padding-top: 10px;
    .caption {
      font-size: 16px;
      font-weight: bold;
      color: #212537;
      line-height: 56px;
      border-bottom: 1px solid #e8e9eb;
      margin-bottom: 30px;
    }
    .detail {
      position: absolute;
      right: 50px;
      top: 23px;
      @include btn(96px, 32px, 14px);
    }
    .form-wrap {
      .formitem {
        margin-bottom: 10px;
        .lbl {
          color: #626266;
          width: 130px;
        }
        .lbl2 {
          color: #212537;
          float: left;
          height: 34px;
          line-height: 34px;
          text-align: right;
          margin-right: 5px;
        }
        .btn-confirm {
          @include btn;
        }
      }
    }
  }
}
</style>
