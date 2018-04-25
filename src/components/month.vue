<template>
    <div>
        <ve-pie :data="chartData" :settings="chartSettings" :colors="chartColors" tooltip-visible :legend-position="legend_position" legend-visible>
        </ve-pie>
        <div class="content">
            <span class="word">本月您一共花费</span>
            <span class="max">{{TotalExpend}}</span>
            <span class="word">元</span>
        </div>
        <div v-if="this.flag" class="content">
            <span class="word">其中</span>
            <span class="max">{{MaxClass}}</span>
            <span class="word">花费最多,共计</span>
            <span class="max">{{maxExpend}}</span>
            <span class="word">元</span>
        </div>
        <div v-if="edu" class="analysis">你真是个爱学习的好宝宝</div>
        <div v-if="normal" class="analysis">消费虽易，生活不易</div>
        <div v-if="food" class="analysis">哈哈，你是个小吃货</div>
        <div v-if="trip" class="analysis">行万里路的你去看了更大的世界吗？</div>
        <div v-if="entertain" class="analysis">浪浪浪浪，还不去学习？</div>
        <div v-if="clothes" class="analysis">捕获一只爱美的你</div>
    </div>
</template>

<script>
    import VePie from 'v-charts/lib/pie';
    // import YAJB from 'yajb-js';
    
    export default {
        data() {
            return {
                chartData: {
                    columns: ['date', 'expend'],
                    rows: []
                },
                result: [],
                maxExpend: 0,
                TotalExpend: 0,
                MaxClass: "",
                flag: false,
                edu: false,
                trip: false,
                entertain: false,
                clothes: false,
                normal: false,
                food: false,
                chartSettings: {
                    type: Object
                },
                chartColors: [],
                legend_position: "",
                data: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTl9.6EmnjIj0NcizMbgOvYIaSmb88UoIROxY4WayUINO-gA",
                // data: "",
                month: 4
            }
        },
        components: {
            VePie
        },
        created() {
            var d = new Date()
            this.month = d.getMonth() + 1;
            console.log(this.month)
            // var yajb = new YAJB()
            // this.data = JSON.parse(yajb.data)
          
            fetch("/api/get_month/" + this.month + '/', {
                    headers: {
                        "token": this.data,
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    return res.json()
                })
                .then(res => {
                    console.log(res)
                    this.chartData = {
                        columns: ['class', 'expend'],
                        rows: res.result
                    }
                    this.MaxClass = res.MaxClass
                    this.maxExpend = res.maxExpend
                    this.TotalExpend = res.TotalExpend
                    if (this.TotalExpend != 0)
                        this.flag = true
                    if (this.MaxClass == "教育")
                        this.edu = true
                    else if (this.MaxClass == "出行")
                        this.trip = true
                    else if (this.MaxClass == "一般")
                        this.normal = true
                    else if (this.MaxClass == "服饰")
                        this.clothes = true
                    else if (this.MaxClass == "娱乐")
                        this.entertain = true
                    else if (this.MaxClass == "饮食")
                        this.food = true
                })
            this.chartSettings = {
                dimension: 'class',
                metrics: 'expend',
                selectedMode: 'single',
                hoverAnimation: false,
                radius: 100,
                offsetY: 200
            }
            this.chartColors = ['#ffb876', '#d4eeff', '#40c0cb', '#ffe9d4', '#ef767a', '#b4c3ff']
            this.legend_position = 'bottom'
        }
    }
</script>

<style lang="sass">
.analysis {
    color: #f2a6b4;
    text-align: center;
    margin-top: 20px;
    font-size: 26px;
}
</style>