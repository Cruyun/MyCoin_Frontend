<template>
    <div class="wrap">
        <div class="start" v-if="this.start">
            <img class="picture" src="http://p688ihx0v.bkt.clouddn.com/coin.png">
            <div class="text">开始记账吧~</div>
        </div>
        <div class="center" v-if="!this.start">
            <div v-for="item in items" :key="item.id" class="items">
                <div class="today inline-block vertical-align">{{item.日期}}</div>
                <div class="icon inline-block vertical-align">
                    <svg viewBox="0 0 40.8 438.6">
                        <use xmlns:xlink="http://www.w3.org/1999/svg" xlink:href="#icon"></use>
                    </svg>
                </div>
                <div class="line inline-block vertical-align">
                    <div class="today">总支出：{{item.总和.toFixed(2)}}</div>
                    <div class="col">
                        <div class="setting">一般：{{item.一般.toFixed(2)}}</div>
                        <div class="setting">出行：{{item.出行.toFixed(2)}}</div>
                        <div class="setting">娱乐：{{item.娱乐.toFixed(2)}}</div>
                        <div class="setting">教育：{{item.教育.toFixed(2)}}</div>
                        <div class="setting">服饰：{{item.服饰.toFixed(2)}}</div>
                        <div class="setting">饮食：{{item.饮食.toFixed(2)}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                start: false,
                items: [],
                data: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.XhjfuL0l4giQZAIVZN29RQwDFVgeoFZWnkhdYztr8pk",
            }
        },
        created() {
            if (window.location.pathname.split('/')[1])
                this.data = window.location.pathname.split('/')[1];
    
            fetch('/api/get_two/', {
                    headers: {
                        "token": this.data,
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    return res.json()
                })
                .then(res => {
                    if (res.expend.length == 0) {
                        this.start = true
                    } else {
                        this.items = res.expend
                    }
                })
        }
    }
</script>

<style lang="sass">
.today {
    font-size: 20px;
    color: #7d7d7d;
}

.icon {
    width: 10%;
    height: 300px;
    margin-left: 10px;
}

.inline-block {
    display: inline-block;
}

.vertical-align {
    vertical-align: top;
}

.setting {
    margin-bottom: 18px;
    margin-left: 10px;
    font-size: 19px;
    color: #cdcdcd;
}

.col {
    margin-top: 5px;
}
.center {
	margin: 0 auto;
	padding: 50px;
}
.picture {
    width: 40%;
    margin-top: 20px;
  }
.text {
    margin-top: 20px;
    color: #a1b7ec;
    font-size: 24px;
  }
  .start {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(70%);
  }
  .items {
      margin-top: 20px;
  }
</style>
