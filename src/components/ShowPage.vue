<template>
  <div class="wrapperData">
    <!-- 开始时间 ******************* -->
    <van-field
      readonly
      :value="startDateValue"
      label="开始时间"
      placeholder="请选择开始时间"
      @click="startDateExhale"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        v-model="modleDateValue"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 结束时间 ******************* -->
    <van-field
      readonly
      :value="endDateValue"
      label="结束时间"
      placeholder="请选择结束时间"
      @click="endDateExhale"
    />
    <button @click="searchData">查询</button>
    <div id="showData">
      <ul>
        <li v-for="(item, index) in this.data" :key="index">
          {{ "九和订单号：" + item.九和订单号 }} <br />
          {{ "日日顺订单号：" + item.日日顺订单号 }} <br />
          {{ "退款订单号：" + item.退款订单号 }} <br />
          {{ "状态：" + item.退款订单号 }} <br />
          {{ "创建时间：" + item.创建时间 }} <br />
          {{ "油枪信息：" + item.油枪信息 }} <br />
          {{ "油品：" + item.油品 }} <br />
          {{ "柴油：" + item.柴油 }} <br />
          {{ "加油机价格：" + item.加油机价格 }} <br />
          {{ "加油机数量：" + item.加油机数量 }} <br />
          {{ "优惠价格：" + item.优惠价格 }} <br />
          {{ "结算金额：" + item.结算金额 }}<br />
          {{ "支付类型：" + item.支付类型 }} <br />
          {{ "手机号：" + item.手机号 }}
        </li>
        <span
          v-show="data"
          style="
            display: block;
            font-size: 16px;
            margin: 50px 0 30px 00;
            text-align: center;
          "
          >已经到底啦 ~
        </span>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { startDate, endDate,timeString} from "../tools";
export default {
  name: "ShowPage",
  data() {
    return {
      data: "",
      showPicker: false,
      minDate: new Date("2019-01-01 00:00"),
      maxDate: new Date("2031-12-31 23:59"),
      startDateValue: "",
      endDateValue: "",
      modleDateValue: "",
      flag1: false,
      flag2: false,
    };
  },
  mounted() {
    this.startDateValue = startDate();
    this.endDateValue = endDate();
    axios({
      method: "GET",
      url: `/api/golfactivity/station_id_get_payment_code?station=14&Ctime=${this.value}&Etime=${this.value1}`,
    })
      .then((response) => {
        let arr = JSON.parse(response.data);
        this.data = arr;
      })
      .catch((error) => {
        console.log("出错啦", error);
      });
  
  },
  methods: {
    startDateExhale() {
      this.modleDateValue = this.startDateValue;
      this.showPicker = true;
      this.flag1 = true;
    },
    endDateExhale() {
      this.modleDateValue = this.endDateValue;
      this.flag2 = true;
      this.showPicker = true;
    },
    onConfirm(time) {
      this.showPicker = false;
      let timer = timeString(time)
      if (this.flag1) {
        this.startDateValue = timer;
        this.modleDateValue = this.startDateValue
        this.flag1 = false;
      }
      if (this.flag2) {
        this.endDateValue = timer;
        this.flag2 = false;
      }
    },
    onCancel(){
      this.showPicker = false
    },
    searchData() {
        axios({
          method: "GET",
          url: `/api/golfactivity/station_id_get_payment_code?station=14&Ctime=${this.startDateValue}&Etime=${this.endDateValue}`,
        })
          .then((response) => {
            let arr = JSON.parse(response.data);
            this.data = arr;
          })
          .catch((error) => {
            console.log("出错啦", error);
          });
    },
  },
};
</script>
<style scoped>
.wrapperData {
  width: 100%;
}
button {
  width: 80%;
  height: 30px;
  background-color: skyblue;
  outline: none;
  text-align: center;
  border: none;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 100px;
  border-radius: 100px;
}
ul {
  width: 100%;
  list-style: none;
  padding: 0;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%);
}
ul li {
  width: 98%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 1%;
  padding: 10px;
}

/* 
  修改组件库  点击组件问题

*/
</style>