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
      return this.globalStore.userEmail!=='';
    }
  },

  data(){
    return {
      ConstRoutes,
      globalStore,
    }
  },
  mounted() {
        console.log(ConstRoutes)
        // this.$http.get(`${process.env.VUE_APP_NAVIGATION_API}/navigation`)
        //   .then(({ data }) => {
        //     this.routes = data;
        //   });
    },
  
};
</script>
