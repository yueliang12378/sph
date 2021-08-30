<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>145687</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{ payInfo.totalFee }}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess" @click="pay">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay"> 立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
  export default {
    name: 'Pay',
     data() {
    return {
      orderNo: "",
      payInfo: {},
      payStatus: 0,
    };
  },
  beforeMount() {
    // 获得路由的query阐述
    this.orderNo = this.$route.query.orderNo;
  },
  mounted() {
    this.getPayInfo();
  },
  methods: {
    async getPayInfo() {
      // 根据订单id 获取订单信息
      const result = await this.$API.reqPayInfo(this.orderNo);
      if (result.code === 200) {
        this.payInfo = result.data;
      }
    },
    async pay() {
      //第一步、点击立即支付后，先生成二维码（用到qrcode这个包 然后GitHub上面的文档是node-qrcode）
        try {
          // 根据url生成二维码
          const imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
        //2、生成二维码图片url成功之后，再去弹出消息盒子
          this.$alert(`<img src='${imgUrl}'/>`, '请使用微信扫码支付', {
          dangerouslyUseHTMLString: true,
          center:true,
          showClose:false,
          // 显示取消按钮
          showCancelButton:true,
          cancelButtonText:'支付遇到问题？',
          confirmButtonText:'我已成功支付',
          beforeClose: (action,instance,done) => {
            //action  confirm确认  还是cancel取消  还是close右上角的叉号
            //instance 代表当前弹出的消息盒子实例
            //done  就是给我们的开关   是一个函数
            if (action === 'confirm'){
              /*//这里是正常的逻辑，但是为了不要每次都支付，（我们留个后门，点击确定 直接跳到支付成功页面）

                //如果点击了确定  只需要判断是否支付
                if(!this.payStatus){ //如果没有支付
                // 这里仅需要提示一下即可，（因为支付成功会自动跳转的）
                  this.$message.warning('请检查是否支付成功！')
                }
              */
            //  这个是后门 上面的才是正常逻辑
             clearInterval(this.timer)
              this.timer = null;
              done() //关闭弹出框
              this.$message.success('支付成功');
              this.$router.replace("/paysuccess"); //跳到支付成功页面
            }
            else if (action === 'cancel'){
              this.$message.info('请联系客服前台，排查故障')
              //然后要关闭定时器
              clearInterval(this.timer)
              this.timer = null;
              done() //关闭弹出框
            }
          }
        })
          .then(() => {})  //对应的是点击确定按钮的逻辑，只要点击了按钮，就会强制关闭消息盒子，我们控制不了关闭不关闭
          .catch(() => {}); //对应的是点击取消按钮的逻辑，只要点击了按钮，就会强制关闭消息盒子，我们控制不了关闭不关闭


        //一但打开有二维码的支付页面，就要立即开始轮询（开启循环定时器发送请求，看看支付完成没有）
        if (!this.timer){ //先判断有没有定时器 没有就创建
          this.timer = setInterval(async () =>{
            //发送请求 看看支付是否成功
            const result = await this.$API.reqPayStatus(this.orderNo)
            if (result.code === 200){ //200说明支付成功了
              // 如果支付成功则需要
              //1.将成功的标志存储起来，以便下次用户点击了我已支付 用于标识
              this.payStatus = 200;
              
              //2.提示支付成功
              this.$message.success('支付成功');

              //3.清除循环定时器
              clearInterval(this.timer);//这里只是清除了定时器，this上的timer还没清除
              this.timer = null;//所以这里要将其指向null 不然下次再打开this.timer会挂着一个无效的定时器，使功能实现不了

              //4.跳转到支付成功页面（跳转前请关闭弹出框）
              this.$msgbox.close()
              this.$router.replace('/paysuccess')
            }
          },2000)
        }

        } catch (error) {
          // 这里是生成二维码失败
          this.$message.error('生成支付二维码失败',error.message)
        }
        
        
        
        
    }
  }
}
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>