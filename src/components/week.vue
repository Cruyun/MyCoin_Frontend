<template>
    <div>
        <ve-line
         :data="lineData"
         :colors="lineColors"
         tooltip-visible
         legend-visible
         :width="linewidth"
         :height="lineheight"
         :scale="linescale"
         :settings="lineSettings"
         class="chart">
        </ve-line>
        <ve-pie
      :data="pieData"
      :settings="pieSettings"
      :colors = "pieColors"
      tooltip-visible
      :legend-position="legend_position"
      legend-visible
      class="chart pie">
      </ve-pie>

        <div class="content">
            <span class="word">最近7天您一共花费</span>
            <span class="max">{{TotalExpend}}</span>
            <span class="word">元</span>
        </div>
        <div class="content">
            <span class="word">其中</span>
            <span class="max">{{maxDay[0]}}</span>
            <span class="word">花费最多,花费</span>
            <span class="max">{{maxDay[1]}}</span>
            <span class="word">元</span>
        </div>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
import VePie from 'v-charts/lib/pie'

export default {
    data() {
            return {
                lineData:{
                	columns: ['date', 'expend'],
                    rows : []
                },
                pieData:{
                    columns: ['class', 'expend'],
                    row : []
                },
                sumup: [],
                maxDay: [],
                TotalExpend: " ",
                MaxClass :" ",
                maxExpend: " ",
                result: []
            }
        },
        components: {
            VeLine,
            VePie
        },
        created() {
            fetch("api/get_seven/").then(res => {
                return res.json()
            })
            .then(res => {
                this.lineData = {
                    columns: ['date', 'expend'],
                    rows : res.sumup
                }
                this.pieData = {
                    columns: ['class', 'expend'],
                    rows : res.result
                }
                this.maxDay = res.maxDay
                this.TotalExpend = res.TotalExpend
                this.MaxClass = res.MaxClass
                this.maxExpend = res.maxExpend
                })
            this.lineColors = [
                    '#a1b7ec', '#5ab1ef', '#fa6e86',
                    '#ffb980', '#0067a6', '#c4b4e4',
                    '#d87a80', '#9cbbff', '#d9d0c7',
                    '#87a997', '#d49ea2', '#5b4947',
                    '#7ba3a8'
                ]
            this.linescale = {
                y: true
            }
            this.linewidth = '90%'
            this.lineheight = '350px'
            this.lineSettings = {
                area: true,
                nullAddZero: true
             }

            this.pieSettings = {
            dimension: 'class',
            metrics: 'expend',
            selectedMode: 'single',
            hoverAnimation: false,
            radius: 100,
            offsetY: 150
            }
            this.pieColors = ['#ffb876','#d4eeff','#40c0cb','#ffe9d4','#ef767a','#b4c3ff']
            this.legend_position='bottom'
        }
}
</script>
<style lang="sass">

</style>