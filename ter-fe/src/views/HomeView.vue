<template>
  <div>
    {{ globalStore.user }}
    <div v-if="this.$cookies.get('session')">{{$cookies.get('session')}}</div>
    <v-btn @click="deleteCookie()"></v-btn>
  <hello-world />
  <!-- <test-google/> -->
</div>
</template>

<script>
  import { globalStore,showErrorDialog } from '@/main.js';
import HelloWorld from '../components/HelloWorld';
import Swal from 'sweetalert2'
  // import TestGoogle from '../views/google.vue';

  export default {
    name: 'HomeView',

    components: {
      // TestGoogle,
      HelloWorld,
    },
    data () {
      return {
        globalStore,
        showErrorDialog,
        Swal
      }
    },
    computed:{
      isSigned(){
      return this.$cookies.get('session');
    }
    },
    methods: {
    async deleteCookie() {
      // alert(this.$cookies.get('session'));
      // this.$cookies.remove('session');
      // this.showErrorDialog('asd',this.$cookies.get('session'));
      // const myCookie = this.$cookies.get('session',{ parseJSON: true });
      const inputOptions = {
      '#ff0000': 'Red',
      '#00ff00': 'Green',
      '#0000ff': 'Blue'
    }

const { value: color } = await this.Swal.fire({
  title: 'Select color',
  input: 'radio',
  inputOptions: inputOptions,
  inputValidator: (value) => {
    if (!value) {
      return 'You need to choose something!'
    }
  }
});

if (color) {
  this.Swal.fire({ html: `You selected: ${color}` })
}
    },
    getCookie() {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        alert(cookies[i]+'---'+JSON.stringify(this.$cookies.get('session')))
      }
    }
  },
    watch: {
        '$cookies.session': function (newVal, oldVal) {
          if (!newVal && oldVal) {
            alert(newVal)
          }
        }
    },
    
  }
</script>
