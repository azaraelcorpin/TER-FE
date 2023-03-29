<template>
  <v-container fluid>
    <v-card class="mb-5">
     <User/> 
    </v-card>
    
    <v-card>
     <TerSched/> 
    </v-card>
    
  </v-container> 
</template>

<script>
import Swal from 'sweetalert2'
import API from "@/API/api.js"
import User from './User.vue'
import TerSched from './TerSched.vue'

  export default {
    name: 'AdminPage',

    components: {  
      User,    
      TerSched
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
