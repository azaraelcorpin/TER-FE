import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import GAuth from 'vue-google-oauth2'
import axios from 'axios';
import VueAxios from 'vue-axios';

// global variable
export const globalStore = new Vue({
  data: {
    profilePicUrl: '',
    userName:'',
    userEmail:'',
    empFullname:'Juan dela Cruz',
    empID:'tmpID',
    empPosition:'tmpDataPosition',
    empOffice:'tmpDataOffice',
    empDesignation:'tmpDataDesignation',
    empSalary:'tmpDataSalary'
  }
})

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

/*
// const gauthOption = {
//   redirect_uri: "http://localhost:3000",
//   client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
//   access_type: 'offline',
//   response_type: 'code',
//   prompt: 'consent',
//   scope: [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email',
//   ].join(' '),
// }

// Vue.use(GAuth, gauthOption)

*/
Vue.use(GAuth, {
  clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID, scope: 'email', prompt: 'consent', fetch_basic_profile: false,
  plugin_name:'Project Test'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
