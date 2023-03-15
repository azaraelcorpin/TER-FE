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
    user:{},
    messageDialog:{
      title:'',
      message:'',
      show:false,
      message_type:"mdi-information-outline",
      color:'green' 
    }
  }
})

export function showInfoDialog (title,message){
  this.globalStore.messageDialog.show=true;
  this.globalStore.messageDialog.title=title;
  this.globalStore.messageDialog.message=message;
  this.globalStore.messageDialog.message_type='mdi-information-outline';
  this.globalStore.messageDialog.color='blue';
}
export function showErrorDialog(title,message){
  this.globalStore.messageDialog.show=true;
  this.globalStore.messageDialog.title=title;
  this.globalStore.messageDialog.message=message;
  this.globalStore.messageDialog.message_type='mdi-close-circle-outline';
  this.globalStore.messageDialog.color='red';
}
export function showSuccessDialog(title,message){
  this.globalStore.messageDialog.show=true;
  this.globalStore.messageDialog.title=title;
  this.globalStore.messageDialog.message=message;
  this.globalStore.messageDialog.message_type='mdi-checkbox-marked-circle-outline';
  this.globalStore.messageDialog.color='green';
}


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
  clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID, scope: 'email',response_type: 'code', prompt: 'consent', fetch_basic_profile: true,
  plugin_name:'Project Test'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
