<template>
  <div>

  <teacher-list v-if="['P','H'].includes(this.$cookies.get('_SID_').eval_type??'X')"/>
  <COR v-if="['S'].includes(this.$cookies.get('_SID_').eval_type??'X')"/>
</div> 
</template>

<script>
// import HelloWorld from '../components/HelloWorld';
import Swal from 'sweetalert2'
import TeacherList from './modules/Faculty/TeacherList.vue';
import API from "@/API/api.js"
import COR from './modules/Student/COR.vue';
// import API from '@/API/api';
  // import TestGoogle from '../views/google.vue';

  export default {
    name: 'HomeView',

    components: {
      // TestGoogle,
      // HelloWorld,
      TeacherList,
      COR
      
    },
    data () {
      return {        
        Swal,
        dialog:true
      }
    },
    computed:{
      isSigned(){
      return this.$cookies.get('_SID_');
    }
    },
    methods: {
    async testerButton() {
      try {
                let response = await API.getFacultyListByUser();
                if (response.error) {
                    console.log(response);                    
                    Swal.fire({
                      icon: 'error',
                      title: response.error.data.statusCode,
                      text: response.error.data.message,
                    })
                } else {
                  console.log(response); 
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
                this.handleClickSignOut();
                this.displaytext='';
            } 
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
