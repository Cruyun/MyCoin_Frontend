import Vue from 'vue'
// import VCharts from 'v-charts'
import Month from './components/month'
import './scss/common.scss'

// Vue.use(VCharts)

new Vue({
	el:"#month",
	render: h =>h(Month)
})