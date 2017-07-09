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
            <div class="today">总支出：{{items[6].expend}}</div>
            <div class="col">
                <div class="setting">一般：{{items[1].expend}}</div>
                <div class="setting">出行：{{items[3].expend}}</div>
                <div class="setting">娱乐：{{items[4].expend}}</div>
                <div class="setting">教育：{{items[0].expend}}</div>
                <div class="setting">服饰：{{items[5].expend}}</div>
                <div class="setting">饮食：{{items[2].expend}}</div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                items: [],
                result: ['class','expend']
            }
        },
        created() {
            fetch('/api/get_some/').then(res => {
                    return res.json()
                })
                .then(res => {
                    this.items = res.result
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
    margin-bottom: 42px;
    margin-left: 20px;
    font-size: 19px;
    color: #cdcdcd;
}

.col {
    margin-top: 24px;
}
.center {
	margin: 0 auto;
	width: 60%;
	padding: 50px;
}
</style>
