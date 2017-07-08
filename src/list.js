import Vue from 'vue'
import List from './components/list'
import './scss/common.scss'

new Vue({
	el:"#list",
	render: h =>h(List)
})