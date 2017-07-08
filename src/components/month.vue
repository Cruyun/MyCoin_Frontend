<template>
    <div>
    <ve-pie
      :data="chartData"
      :settings="chartSettings"
      :colors = "chartColors"
      tooltip-visible
      :legend-position="legend_position"
      legend-visible>
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
        <div v-if="edu" class="analysis">教育</div>
        <div v-if="normal" class="analysis"></div>
        <div v-if="food" class="analysis"></div>
        <div v-if="trip" class="analysis"></div>
        <div v-if="entertain" class="analysis"></div>
        <div v-if="clothes" class="analysis"></div>
    </div>
</template>
<script>
import VePie from 'v-charts/lib/pie'
export default {
    data() {
            return {
            chartData:{
                columns: ['date', 'expend'],
                rows : []
                },
            result: [],
            maxExpend: " ",
            TotalExpend: " ",
            MaxClass: " ",
            flag: false,
            edu: false,
            trip: false
            }
        },
        components: {
            VePie
        },
        created(){
            fetch("api/get_month/").then(res => {
                return res.json()
            })
            .then(res => {
                this.chartData = {
                    columns: ['class', 'expend'],
                    rows : res.result
                }
                this.MaxClass = res.MaxClass
                this.maxExpend = res.maxExpend
                this.TotalExpend = res.TotalExpend
                if(this.TotalExpend !=0)
                    this.flag = true
                if(this.MaxClass=="教育")
                this.edu = true
                    else if(this.MaxClass=="出行")
                        this.trip = true
                    else if(this.MaxClass=="一般")
                        this.normal = true
                    else if(this.MaxClass=="服饰")
                        this.clothes = true
                    else if(this.MaxClass=="娱乐")
                        this.entertain = true
                    else if(this.MaxClass=="饮食")
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
            this.chartColors = ['#ffb876','#d4eeff','#40c0cb','#ffe9d4','#ef767a','#b4c3ff']
            this.legend_position='bottom'
        }
}
</script>
