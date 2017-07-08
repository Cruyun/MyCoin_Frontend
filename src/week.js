import Vue from 'vue'
import VCharts from 'v-charts'
import Week from './components/week'
import './scss/common.scss'

Vue.use(VCharts)

new Vue({
	el:"#week",
	render: h =>h(Week)
})