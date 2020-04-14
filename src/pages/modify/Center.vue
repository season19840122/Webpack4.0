<template>
  <div class="center-wrap">
    <div class="center">
      <h3 class="caption">修改提现账户</h3>
      <div class="form-wrap">
        <div class="formitem">
          <label class="lbl">提现方式：</label>
          <div class="btn-wrap fl" :class="{ active: isActive }" @click="handleClick">
            <!-- <button class="btn-way"><i class="i-alipay"></i>银行卡提现</button> -->
            <button class="btn-way">银行卡提现</button>
            <i class="i-angle"></i>
          </div>
          <span class="error" v-if="error.err1">请选择提现方式！</span>
        </div>
        <div class="formitem">
          <label for="ipt1" class="lbl">银行名称：</label>
          <input type="text" id="ipt1" class="ipt-text m" placeholder="请输入银行名称" v-model="amountDeail.bankName"/>
          <span class="error" v-if="error.err2">银行名称不能为空！</span>
        </div>
        <div class="formitem">
          <label for="ipt2" class="lbl">开户行名称：</label>
          <input type="text" id="ipt2" class="ipt-text m" placeholder="请输入开户行名称" v-model="amountDeail.openBank"/>
          <span class="error" v-if="error.err3">开户行名称不能为空！</span>
        </div>
        <div class="formitem">
          <label for="ipt3" class="lbl">银行账户：</label>
          <input type="text" id="ipt3" class="ipt-text m" placeholder="请输入银行账户" v-model="amountDeail.payAccount"/>
          <!-- <span class="error" v-if="error.err4">银行账户不能为空！</span> -->
          <span class="error" v-if="error.err4">请输入正确的银行卡号！</span>
        </div>
        <div class="formitem">
          <label for="ipt4" class="lbl">账户名：</label>
          <input type="text" id="ipt4" class="ipt-text m" placeholder="请输入账户名" v-model="amountDeail.payName"/>
          <span class="error" v-if="error.err5">账户名不能为空！</span>
        </div>
        <div class="formitem">
          <button class="btn-save" style="margin-left: 135px;" @click="handleUpdate">保存</button>
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
      isActive: true,
      error: {
        err1: false,
        err2: false,
        err3: false,
        err4: false,
        err5: false,
        err6: false
      }
    };
  },
  computed: {
    ...mapGetters(['amountDeail'])
  },
  methods: {
    ...mapActions(['getCurrentModal', 'getFailModal', 'getAmount']),
    handleClick () {
      this.isActive = !this.isActive;
    },
    handleUpdate() {
      var error = {
        err1: false,
        err2: false,
        err3: false,
        err4: false,
        err5: false
      };
      this.error = error;
      if(!this.isActive) {
        return this.error.err1 = true;
      }
      if(common.utils.checkNull(this.amountDeail.bankName)) {
        return this.error.err2 = true;
      }
      if(common.utils.checkNull(this.amountDeail.openBank)) {
        return this.error.err3 = true;
      }
      if(!common.utils.checkNumber(this.amountDeail.payAccount)) {
        return this.error.err4 = true;
      }
      if(common.utils.checkNull(this.amountDeail.payName)) {
        return this.error.err5 = true;
      }
      axios.update({
        'payType': '银行卡',
        'bankName': this.amountDeail.bankName,
        'openBank': this.amountDeail.openBank,
        'payAccount': this.amountDeail.payAccount,
        'payName': this.amountDeail.payName
      }).then(res => {
        if(res && res.success) {
          this.getCurrentModal('modifySuccess');
        } else {
          this.getFailModal({
            message: res.message
          });
        }
      });
    },
    // 获取提现信息
    getAmountDeail(){
      axios.amountdeail().then(res => {
        if(res && res.success) {
          this.getAmount(res.data);
          // this.amount = Object.assign({}, this.amount, this.amountdeail);
          // console.log(1);
        } else {
          // console.log(2);
          this.getFailModal({
            message: res.message || '网络连接超时！'
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
    padding: 10px 50px 0;
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
        .btn-save {
          @include btn($w: 72px);
        }
        .btn-wrap {
          width: 130px;
          height: 32px;
          position: relative;
          &.active {
            .btn-way {
              border: 2px solid #ffd50f;
              line-height: 30px;
            }
            .i-angle {
              cursor: pointer;
              position: absolute;
              right: 2px;
              bottom: 2px;
              width: 16px;
              height: 14px;
              background: url(~@images/i-angle.png) no-repeat;
            }
          }
          .btn-way {
            background: #ffffff;
            text-align: center;
            width: 100%;
            height: 32px;
            line-height: 32px;
            border: 1px solid #dcdcdc;
            .i-alipay {
              width: 18px;
              height: 18px;
              display: inline-block;
              background: url(~@images/i-alipay.png) no-repeat;
              vertical-align: -4px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
