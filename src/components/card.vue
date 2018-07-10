<template>
  <div class="price">
    <div class="plan">
      <div class="plan-inner">
        <div class="entry-title">
          <div class="title">我的校园卡账单</div>
          <div class="price">￥{{sum}}<span class="total">{{this.time.slice(5, 10)}}</span>
          </div>
        </div>
        <div v-if="this.tip" class="tip">
            <img class="picture" src="http://p688ihx0v.bkt.clouddn.com/coin.png">
            <div class="text">该日没有消费喔~</div>
        </div>
        <div class="entry-content">
          <ul>
            <li v-for="item in data" :key="item.id"><strong>{{item.smtOrgName}}&nbsp&nbsp&nbsp</strong>{{item.smtTransMoney}}</li>
          </ul>
        </div>
        <div class="btn">
          <button class="view_day" v-on:click="preDay">前一天</button>
          <button class="view_day" v-on:click="nextDay">后一天</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: "2016210773",
        time: "",
        data: [],
        sum: 0,
        calendar: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        tip: false
      }
    },
    mounted() {
      this.username = window.location.href.split("=")[1].split("&")[0];
      this.time = window.location.href.split("=")[2]
      this.getCard();
    },
    methods: {
      getCard() {
        fetch("/api/card/?time=" + this.time + "&sid=" + this.username, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.ok)
            return res.json()
        }).then(res => {
          if (res.response.list == null || res.response.list == undefined || res.response.list.length == 0) {
            this.data = [];
            this.tip = true;
          } else {
            this.tip = false;
            this.data = res.response.list[0].data;
            for (let i of res.response.list[0].data) {
              this.sum += parseInt(i.smtTransMoney);
            }
          }
        })
      },
      preDay() {
        let month = parseInt(this.time.slice(5, 7));
        let day = parseInt(this.time.slice(8, 10));
        let date = this.time.slice(5, 10);
        let newday;
  
        if (day == 1) {
          newday = month - 1 + "-" + this.calendar[month - 1];
          if (month < 11) {
            newday = "0" + newday;
          }
        } else {
          day--;
          if (day < 10)
            newday = this.time.slice(5, 7) + "-0" + day;
          else {
            newday = this.time.slice(5, 7) + "-" + day;
          }
        }
        this.sum = 0;
        this.time = this.time.replace(date, newday);
        this.getCard();
      },
      nextDay() {
        let month = parseInt(this.time.slice(5, 7));
        let day = parseInt(this.time.slice(8, 10));
        let date = this.time.slice(5, 10);
        let newday;
  
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let currentDay = currentDate.getDay() + 1;
        if (currentMonth > month || (currentMonth == month && currentDay > day)) {
          if (day == this.calendar[month]) {
            month++;
            newday = month + "-01";
            if (month < 10) {
              newday = "0" + newday;
            }
          } else {
            day++;
            if (day < 10) {
              newday = this.time.slice(5, 7) + "-0" + day;
            } else {
              newday = this.time.slice(5, 7) + "-" + day;
            }
          }
          this.sum = 0;
          this.time = this.time.replace(date, newday);
          this.getCard();
        }
      }
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:400,700);
  .price {
    text-align: center;
    width: 100%;
    height: 100%;
  }
  
  .plan {
    display: inline-block;
    margin: 10px 1%;
    font-family: 'Lato', Arial, sans-serif;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  
  .total {
    font-size: 12px;
  }
  
  .plan-inner {
    background: #fff;
    margin: 0 auto;
    max-width: 100%;
    position: relative;
  }
  
  .entry-title {
    height: 170px;
    position: relative;
    text-align: center;
    color: #fff;
    margin-bottom: 30px;
  }
  
  .entry-title>.title {
    background: #a1b7ec;
    font-size: 20px;
    padding: 5px 0;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0;
  }
  
  .title {
    height: 60px;
    line-height: 60px;
  }
  
  .entry-title .price {
    position: absolute;
    bottom: -25px;
    background: #a1b7ec;
    height: 95px;
    width: 95px;
    margin: 0 auto;
    left: 0;
    right: 0;
    overflow: hidden;
    border-radius: 50px;
    border: 5px solid #fff;
    line-height: 80px;
    font-size: 28px;
    font-weight: 700;
  }
  
  .price span {
    position: absolute;
    bottom: -10px;
    left: 30px;
    font-weight: 400;
  }
  
  .entry-content {
    color: #323232;
  }
  
  .entry-content ul {
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }
  
  .entry-content li {
    border-bottom: 1px solid #E5E5E5;
    padding: 10px 0;
  }
  
  .entry-content li:last-child {
    border: none;
  }
  
  .btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
  
  .view_day {
    background: #f2a6b4;
    color: #fff;
    font-weight: 700;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 16px;
  }
  
  .basic {
    background: #75DDD9;
  }
  
  .entry-title {
    background: #d4eeff;
  }
  
  .price {
    background: #ffffff;
  }
  .tip {
    width: 100%;
    margin: 30px auto;
  }
  .picture {
    width: 40%;
    margin-top: 20px;
  }
  .text {
    margin-top: 20px;
  }
</style>
