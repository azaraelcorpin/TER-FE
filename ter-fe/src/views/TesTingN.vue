<template>
  <v-container fluid>
    <form @submit.prevent="submitForm">
      <input type="text" name="tokenHolder" v-model="testtt" ref="myInputRef" />
      <div class="g-recaptcha" ref="recaptcha" data-sitekey="6Ld58w8lAAAAAI1-DKsC2mncU6dR9s6imuEchmA2" data-callback="myFunction"></div>
      <br />
      <input type="submit" value="Submit">
    </form>
{{ testtt }}
  <v-card>
    <i><strong>Direction:</strong> Please answer all question carefully. Choose the approriate number which corresponds to your honest evaluation.</i>
<v-btn @click="showButton = !showButton;submitForm()">show</v-btn>
    
    <v-card style="margin-top: 50px;">
      <v-row>
      <v-col v-for="(item,index)  in items" :key="item.qstnNumber" :cols="showButton?'12':'6'">
          <v-card  style="margin-bottom: 10px;">
            <!-- {{ item.question }} -->
            <div v-if="Boolean(item.category)">
              <v-card-title v-if="(((items[index-1]??'').category??'') !== item.category )">
                {{ item.category }}
              </v-card-title>
            </div>
          <div style="display: flex; justify-content: center;">           
            <v-col cols="10">
              {{item.qstnNumber}} . &nbsp; {{ item.question }}
          <v-row class="my-5" >  
            <v-col cols="2" v-if="showButton || ( (item.score??-1) === 5 )">
              <v-btn 
                block
                :color="( (item.score??-1) !== 5 )?'secondary':'primary'"
                @click="showButton? toggleScore(5,index):showAlert()"
              >
                5
              </v-btn>
            </v-col>    
            <v-col cols="2" v-if="showButton || ( (item.score??-1) === 6 )">
              <v-btn 
                block
                :color="( (item.score??-1) !== 6 )?'secondary':'primary'"
                @click="showButton? toggleScore(6,index):showAlert()"
              >
                6
              </v-btn>
            </v-col>
            <v-col cols="2" v-if="showButton || ( (item.score??-1) === 7 )">
              <v-btn 
                block
                :color="( (item.score??-1) !== 7 )?'secondary':'primary'"
                @click="showButton? toggleScore(7,index):showAlert()"
              >
                7
              </v-btn>
            </v-col>
            <v-col cols="2" v-if="showButton || ( (item.score??-1) === 8 )">
              <v-btn 
                block
                :color="( (item.score??-1) !== 8 )?'secondary':'primary'"
                @click="showButton? toggleScore(8,index):showAlert()"
              >
                8
              </v-btn>
            </v-col>
            <v-col cols="2" v-if="showButton || ( (item.score??-1) === 9 )">
              <v-btn 
                block
                :color="( (item.score??-1) !== 9 )?'secondary':'primary'"
                @click="showButton? toggleScore(9,index):showAlert()"
              >
                9
              </v-btn>
            </v-col>
            <v-col cols="2" v-if="showButton || ( (item.score??-1) === 10 )">
              <v-btn 
                block
                :color="( (item.score??-1) !== 10 )?'secondary':'primary'"
                @click="showButton? toggleScore(10,index):showAlert()"
              >
                10
              </v-btn>
            </v-col>
          </v-row>
          
            </v-col>
          </div>
          </v-card>
      </v-col>
    </v-row>
    </v-card>
  </v-card>
</v-container>
</template>

<script>
import Vue from 'vue';
import API from '@/API/api'
import Swal from 'sweetalert2'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha,{siteKey:'6LfK_jQlAAAAAPm9RqR70wq9X2LiVw0SCQ-3kfKh'})

export default {
  
  metaInfo: {
    script: [
      { src: 'https://www.google.com/recaptcha/api.js', async: true, defer: true },
      {
          type: 'text/javascript',
          innerHTML: `
            function myFunction(token) {
              document.getElementsByName('tokenHolder')[0].value = token;
              console.log('Hello, world!' + token)
            }
          `
        }
    ]
  },

  components:{
    
  },
  data() {
    return {
      testtt:'asd',
      showButton: true,
      items:[],
      category:'',
      headers: [
        { text: 'Subject Code', value: 'qstnNumber' },
      ],
      table_loading:true,
    }
  },
  mounted(){ 
    
    // const script = document.createElement('script');
    // script.src = 'https://www.google.com/recaptcha/api.js';
    // script.async = true;
    // script.defer = true;
    // document.body.appendChild(script);
    this.queryData()
  },
  computed:{
        computedItems() {
          return this.items
    }
    },
  methods: {
     submitForm(){      
      // const recaptchaResponse = this.$refs.recaptcha.getResponse();
      console.log(this.$refs.myInputRef.value); // log the reCAPTCHA response to the console
      // Now you can include the reCAPTCHA response in your form data and submit it to your server
    },
    async cons(){
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded()

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha('login')
     console.log(token)
      console.log(JSON.parse(JSON.stringify(this.items)));
    },
    showAlert() {
    Swal.fire({
      title: 'Do you want to change your choices?',
      text: 'Go back to change selection',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go back to edit page!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showButton = true
      }
    })
  },
    toggleScore(n, index) {
       this.items[index];
       if(this.items[index].score ===null){
          this.items[index].score = n
       }else if (this.items[index].score === n) {        
        this.items[index].score = null
      } else {
        this.items[index].score = n
      }
      this.$forceUpdate()
    },    
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
                  this.items = response.items 
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
                this.handleClickSignOut();
                this.displaytext='';
            } 
    }
  }
}
</script>

<style>
.selected {
  background-color: yellow;
}
</style>
