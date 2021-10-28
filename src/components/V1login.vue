<template>
  <div>
    <ShowPage v-show="isShow" />
    <div ref="v_wrappers" class="v_wrapper" v-show="isLogin">
      <!-- 头像 -->
      <div class="header_pic">
        <img
          style="width: 150px; height: 150px; border-radius: 100px"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-02-20%2F5c6d01f6bfd8a.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637455844&t=dcd81aad878350bda7973254b802c2c6"
          alt="好天气"
        />
      </div>
      <!-- input父级 -->
      <div class="input_phone">
        <!-- 手机号 -->
        <input
          type="text"
          id="phone_id"
          @blur="phone_blur"
          @focus="phone_focus"
          v-model="phone_id"
          :placeholder="placeholder"
        />
        <!-- 获取验证码 -->

        <!-- 验证码 -->
        <input type="text" v-model="verification" class="verification" />
        <button
          class="getVerification"
          :disabled="disabled"
          @click="getVerificationCode"
          type="info"
        >
          {{ getUserVerificationCode }}
        </button>
        <button class="login" @click="login_phone">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import ShowPage from "./ShowPage.vue";
export default {
  name: "V1login",
  data() {
    return {
      phone_id: "",
      placeholder: "请输入手机号",
      getUserVerificationCode: "获取验证码",
      num: 60,
      tiemr: null,
      disabled: false,
      show: false,
      verification: "",
      faVer: parseInt(Math.random() * 1000000),
      isShow: false,
      isLogin: true,
    };
  },
  components: { ShowPage },
  methods: {
    // 获取焦点为 ""
    phone_focus() {
      this.placeholder = "";
    },
    // 失去焦点为请输入手机号
    phone_blur() {
      this.placeholder = "请输入手机号";
    },
    // 获取验证码按钮
    getVerificationCode() {
      if (this.phone_id.length > 11 || this.phone_id.length < 11) {
        this.phoneFont = "手机号有误";
        this.phone_id == ""
          ? Toast.fail("手机号不能为空")
          : console.log("手机号不为空 过");
        this.placeholder = "请输入手机号";
      } else {
        this.phoneFont = "";
        this.disabled = true;
        this.timer = setInterval(() => {
          this.getUserVerificationCode = this.num-- + "后重试";
          if (this.num == -2) {
            this.getUserVerificationCode = "重新获取";
            this.num += 62;
            this.disabled = false;
            clearInterval(this.timer);
          }
          if (this.num == 58) {
            // alert(
            //   "【LPL】您的验证码是" +
            //     this.faVer +
            //     "，转发给他人可能导致账号被盗，请勿遗漏"
            // );
            this.verification = this.faVer;
            // 输出验证码
            console.log(this.faVer);
          }
        }, 1000);
      }
    },
    // 登录
    login_phone() {
      this.verification == this.faVer
        ? (Toast.success({ message: "登录成功", duration: 500 }),
          (this.verFont = "验证码正确"),
          (this.isShow = true),
          (this.isLogin = false),
          (this.$refs.v_wrappers.style.opacity = 0))
        : (this.verFont = "验证码不正确");
      this.verification == ""
        ? Toast.fail("验证码或手机号有误")
        : console.log(1);
      this.phone_id.length > 11 ||
      this.phone_id.length < 11 ||
      this.phone_id == ""
        ? (this.phoneFont = "手机号有误")
        : console.log("手机号正确 过");
      this.phone_id == ""
        ? (this.phoneFont = "手机号不能为空")
        : (console.log("手机号不为空正确 过"), (this.phoneFont = ""));
      // clearInterval(this.timer);
    },
  },
};
</script>

<style scoped>
/* 最外侧容器 */
.v_wrapper {
  width: 350px;
  height: 600px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
/* 头像 */
.header_pic {
  width: 150px;
  height: 150px;
  border-radius: 100px;
  text-align: center;
  line-height: 150px;
  margin: 100px auto;
}
/* 所有input框 */
input {
  display: block;
  width: 200px;
  height: 30px;
  color: #000;
  outline: none;
  border: 1px solid skyblue;
  border-radius: 5px;
  font-size: 13px;
  text-indent: 5px;
}
/* input的父级 */
.input_phone {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
/* 获取验证码按钮 */
.getVerification {
  position: absolute;
  right: 0px;
  top: 47px;
  border-radius: 0px 5px 5px 0;
  width: 100px;
  height: 33px;
  background-color: lightblue;
  text-align: center;
  line-height: 30px;
  border: none;
  outline: none;
  color: #fff;
  /* z-index: 999; */
}
/* 登录按钮 */
.login {
  position: absolute;
  top: 200px;
  left: 50%;
  width: 120px;
  height: 30px;
  transform: translate(-50%);
  border-radius: 50px;
  outline: none;
  border: none;
  background-color: #f40;
}
p {
  color: red;
  font-size: 12px;
  margin-top: -7px;
}
.verification {
  margin: 12px 0 0 0;
}
</style>