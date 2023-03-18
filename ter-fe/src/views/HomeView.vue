<template>
  <div>
    <div v-if="this.$cookies.get('_SID_')">{{$cookies.get('_SID_')}}</div>
    <v-btn @click="deleteCookie()"></v-btn>
  <hello-world />
  <!-- <test-google/> -->
</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld';
import Swal from 'sweetalert2'


// import API from '@/API/api';
  // import TestGoogle from '../views/google.vue';

  export default {
    name: 'HomeView',

    components: {
      // TestGoogle,
      HelloWorld,
    },
    data () {
      return {        
        Swal,
        
      }
    },
    computed:{
      isSigned(){
      return this.$cookies.get('_SID_');
    }
    },
    methods: {
    async deleteCookie() {
      // alert(this.$cookies.get('_SID_'));
      // this.$cookies.remove('_SID_');
      // this.showErrorDialog('asd',this.$cookies.get('_SID_'));
      // const myCookie = this.$cookies.get('_SID_',{ parseJSON: true });
      
          //         let response = await API.checkAccount(this.$cookies.get('_SID_').email);
                  
          // this.Swal.fire(JSON.stringify(response))
//       const inputOptions = {
//       '#ff0000': 'Red',
//       '#00ff00': 'Green',
//       '#0000ff': 'Blue'
//     }

// const { value: color } = await this.Swal.fire({
//   title: 'Select color',
//   input: 'radio',
//   inputOptions: inputOptions,
//   inputValidator: (value) => {
//     if (!value) {
//       return 'You need to choose something!'
//     }
//   }
// });

// if (color) {
//   this.Swal.fire({ html: `You selected: ${color}` })
// }

    //  const text = require('../assets/studentNotice.txt');
    // console.log(text);
    //   Swal.fire({
    //     title: '<strong>HTML <u>example</u></strong>',
    //     icon: 'info',
    //     html:
    //       '@/assets/bg.jpeg'
    //       ,
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     focusConfirm: false,
    //     confirmButtonText:
    //       '<i class="fa fa-thumbs-up"></i> Great!',
    //     confirmButtonAriaLabel: 'Thumbs up, great!',
    //     cancelButtonText:
    //       '<i class="fa fa-thumbs-down"></i>',
    //     cancelButtonAriaLabel: 'Thumbs down'
    //   })
    },
    getCookie() {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        alert(cookies[i]+'---'+JSON.stringify(this.$cookies.get('_SID_')))
      }
    }
  },
    watch: {
       
    },
    
  }
</script>
