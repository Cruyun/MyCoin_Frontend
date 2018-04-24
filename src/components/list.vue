<template>
    <div class="wrap">
    <div class="center">
        <div class="today inline-block vertical-align">今天</div>
        <div class="icon inline-block vertical-align">
            <svg viewBox="0 0 40.8 438.6">
                <use xmlns:xlink="http://www.w3.org/1999/svg" xlink:href="#icon"></use>
            </svg>
        </div>
        <div class="line inline-block vertical-align">
            <div class="today">总支出：{{this.total}}</div>
            <div class="col">
                <div class="setting">一般：{{this.normal}}</div>
                <div class="setting">出行：{{this.trip}}</div>
                <div class="setting">娱乐：{{this.entertain}}</div>
                <div class="setting">教育：{{this.education}}</div>
                <div class="setting">服饰：{{this.clothes}}</div>
                <div class="setting">饮食：{{this.food}}</div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import YAJB from 'yajb-js';

export default {
    data() {
            return {
                total: 0,
                normal: 0,
                trip: 0,
                entertain: 0,
                education: 0,
                clothes: 0,
                food: 0,
                data: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTV9.dCu8-1xcMk9KOEEY0QazvG_8S5czwPtnKZvGbi-VEhQ",
                // data: ""
            }
        },
        created() {
            var yajb = new YAJB()           
            this.data = JSON.parse(yajb.data)

            fetch('/api/get_some/', {
                headers: {
                    "token": this.data,
                    "Content-Type" : "application/json"
                }
            }).then(res => {
                    return res.json()
                })
                .then(res => {
                    this.total = res.result[6].expend
                    this.normal = res.result[1].expend
                    this.trip = res.result[3].expend
                    this.entertain = res.result[4].expend
                    this.education = res.result[0].expend
                    this.clothes = res.result[5].expend
                    this.food = res.result[2].expend
                })
        }
}
</script>
<style lang="sass">
.today {
    font-size: 20px;
    color: #7d7d7d;
    margin-bottom: 50px;
}

.icon {
    width: 19%;
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
    margin-bottom: 60px;
    margin-left: 20px;
    font-size: 19px;
    color: #cdcdcd;
}

.col {
    margin-top: 24px;
}
.center {
	margin: 0 auto;
	padding: 50px;
}
</style>
