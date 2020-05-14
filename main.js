import Vue from 'vue'
import App from './App'

import './static/iconfont/iconfont.css'

// import pageHead from './components/page-head.vue'
// import pageFoot from './components/page-foot.vue'

import store from './store'
import service from './common/js/service.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$service = service

// Vue.component('page-head', pageHead)
// Vue.component('page-foot', pageFoot)
// Vue.component('uLink', uLink)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
