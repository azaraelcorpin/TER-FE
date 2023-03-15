<template>
  <v-app id="inspire">
    <component :is="layout" v-if="isSigned">
      <router-view />
    </component>
    <Login v-else/>
  </v-app>
</template>

<script>
import Layout from '@/views/layout/Layout.vue';
import Login from '@/views/LogIn.vue'
import {globalStore} from '@/main.js'
import VueCookies from 'vue-cookies-reactive'
Vue.use(VueCookies)
import Vue from 'vue'

import  {
  ConstRoutes
} from '@/router';
export default {
  name: 'App',
  components: {
    Layout,
    Login,
  },
  computed: {
    layout() {
      return 'layout';
    },
    isSigned(){
      return this.$cookies.get('session');
    }
  },
  methods: {
    closeDialog() {
      this.globalStore.messageDialog.show=false;
      this.globalStore.messageDialog.title='';
      this.globalStore.messageDialog.message='';
    },
    
  },

  data(){
    return {
      ConstRoutes,
      globalStore,
      isOON:false,
      cookieValue:'',
      
    }
  },
  mounted() {
        // this.$http.get(`${process.env.VUE_APP_NAVIGATION_API}/navigation`)
        //   .then(({ data }) => {
        //     this.routes = data;
        //   });

        // Set up interval with a 5-minute interval time
        // startInterval();
    },

  
};
</script>
