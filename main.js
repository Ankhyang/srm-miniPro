import Vue from 'vue'
import App from './App'

import './static/iconfont/iconfont.css'

// import pageHead from './components/page-head.vue'
// import pageFoot from './components/page-foot.vue'
import loadMore from './components/load-more.vue'

import store from './store'
import service from './common/js/service.js'
import util from './common/js/util.js'
import time from './components/time.vue'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$service = service
Vue.prototype.$util = util

// Vue.component('page-head', pageHead)
// Vue.component('page-foot', pageFoot)
// Vue.component('uLink', uLink)
Vue.component('load-more', loadMore)
Vue.component('text-time', time)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
