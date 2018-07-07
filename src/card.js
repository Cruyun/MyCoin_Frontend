import Vue from 'vue'
import Card from './components/card'
import './scss/common.scss'

new Vue({
	el: "#card",
	render: h =>h(Card)
})