<template>
    <div>
        <ve-pie :data="chartData" :settings="chartSettings" :colors="chartColors" tooltip-visible :legend-position="legend_position" legend-visible>
        </ve-pie>
        <div class="content">
            <span class="word">本月您一共花费</span>
            <span class="max">{{TotalExpend}}</span>
            <span class="word">元</span>
        </div>
        <div v-if="this.flag" class="content bottom">
            <span class="word">其中</span>
            <span class="max">{{MaxClass}}</span>
            <span class="word">花费最多,共计</span>
            <span class="max">{{maxExpend}}</span>
            <span class="word">元</span>
        </div>
        <div v-if="edu" class="analysis">{{eduWord[getRandomInt(4)]}}</div>
        <div v-if="normal" class="analysis">{{normalWord[getRandomInt(4)]}}</div>
        <div v-if="food" class="analysis">{{foodWord[getRandomInt(4)]}}</div>
        <div v-if="trip" class="analysis">{{tripWord[getRandomInt(4)]}}</div>
        <div v-if="entertain" class="analysis">{{enterWord[getRandomInt(3)]}}</div>
        <div v-if="clothes" class="analysis">{{clothesWord[getRandomInt(3)]}}</div>
    </div>
</template>

<script>
    // import VePie from 'v-charts/lib/pie';
    
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
                data: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.XhjfuL0l4giQZAIVZN29RQwDFVgeoFZWnkhdYztr8pk",
                // data: "",
                month: 4,
                eduWord: ["你可真是个爱学习的好宝宝~","花钱在学习用品上，最不心疼啦！","拿钱买知识，我觉得蛮值 ><","一定是个学霸,看好你哦!"],
                foodWord: ["哈哈,一看就是个小吃货!","哇塞,是经常下馆子的土豪~", "民以食为天,填饱肚子是最重要的!", "让我猜猜你是经常点外卖呢,还是经常去饭店呢(x"],
                tripWord:[ "哇!看起来是经常旅行的大佬", "一定是踏足世界了把!", "再来一次说走就走的旅行吧 0v0", "读万卷书不如行万里路"],
                enterWord: ["浪浪浪起来!", "佛系少年,没有什么可以阻止我去耍~", "思考:今天玩点什么呢"],
                clothesWord: [ "你一定是爱美的小姐姐/讲究的小哥哥", "你一定穿衣特有品~", "买买买,衣服什么的越多越好!"],
                normalWord: ["消费虽易，生活不易","你的生活真是多姿多彩呢","生活的各个方面都要”雨露均沾“呢","花最normal的钱，走最个性化的路！"]
            }
        },
        components: {
            VePie
        },
        created() {
            var d = new Date()
            this.month = d.getMonth() + 1;
            this.data = window.location.pathname.split('/')[1];
          
            fetch("/api/get_month/" + this.month + '/', {
                    headers: {
                        "token": this.data,
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    return res.json()
                })
                .then(res => {
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
        },
        methods: {
            getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
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
.bottom {
    margin-bottom: 50px;
}
</style>