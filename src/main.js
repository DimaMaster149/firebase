// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import VueRouter from 'vue-router/dist/vue-router.js';
import Vuelidate from 'vuelidate'
import './main.css'

Vue.use(Vuelidate)
Vue.use(VueFire)

Vue.config.productionTip = false

const Login = Vue.component('login', require('./components/Login.vue'));

const router = new VueRouter({
    routes: [
        { path:"/login", name:'login', component: Login},
    ]
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
