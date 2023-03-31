<template>
  <v-container fluid>
    <TesTingN :item_prop="items"></TesTingN>
</v-container>
</template>

<script>

import TesTingN from './TesTingN.vue'
import Swal from 'sweetalert2';
import API from '@/API/api';
export default {
  components:{
    TesTingN,
  },
  data() {
    return {
      items: [],  
    }
  },
    mounted(){   
    this.queryData()
  },
  methods: {
    async queryData(){
      try {
                let response = await API.getQuationnaire();
                if (response.error) {
                    console.log(response);                    
                    Swal.fire({
                      icon: 'error',
                      title: response.error.data.statusCode,
                      text: response.error.data.message,
                    })
                } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'asd',
                      text: JSON.stringify(response.items),
                    })
                  this.items = response.items 
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
                this.handleClickSignOut();
                this.displaytext='';
            } 
    },
  }
}
</script>

<style>
.selected {
  background-color: yellow;
}
</style>
