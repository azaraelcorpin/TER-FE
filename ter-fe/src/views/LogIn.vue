<template>
  <div style="background-color:aqua;display: flex; align-items: center;
  justify-content: center;
  height: 100vh;">
  {{displaytext}}
  <v-btn @click="handleClickSignIn" v-if="displaytext==''"> 
  <span>Sign In via Google</span></v-btn>
  <!-- <v-btn @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signOout</v-btn> -->
      <!-- <img :src="GoogleLogo" alt="Google Logo" /> -->
     

</div>
  <!-- <div>
    <h1>Test</h1>{{globalStore.profilePicUrl}}
    <v-btn @click="handleClickGetAuth">get auth code</v-btn>
    <v-btn @click="handleClickSignIn" v-if="!isSignIn" :disabled="!isInit">signIn</v-btn>
    <v-btn @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signOout</v-btn>
  </div> -->
</template>

<script>
/** 
* You should first need to place these 2 lines of code in your APP ENTRY file, e.g. src/main.js
*
* import GAuth from 'vue-google-oauth2'
* Vue.use(GAuth, {clientId: '4584XXXXXXXX-2gqknkvdjfkdfkvb8uja2k65sldsms7qo9.apps.googleusercontent.com'})
* 
*/
// import GAuth from 'vue-google-oauth2'
import Vue from 'vue';
import API from "@/API/api.js"
import Swal from 'sweetalert2'

export default {
  name: 'LogIn',
  data () {
    return {
      isInit: false,
      isSignIn: false,
      info:"",
      displaytext:"",
    }
  },

  methods: {
    async handleClickGetAuth() {
      try {
        const authCode = await this.$gAuth.getAuthCode()
          console.log('asd1',authCode);
        // const response = await this.$http.post('http://localhost:3000', { code: authCode, redirect_uri: 'http://localhost:3000' })
        // console.log(response);
      } catch (error) {
        // On fail do something
        console.log('asd',error);
      }
    },

    async handleClickSignIn(){
      try {
        this.displaytext = "Checking Account....";
        const googleUser = await this.$gAuth.signIn()
        // // console.log('googleUser', googleUser)
        // // console.log("test",this.$gAuth)
        // // console.log('user', googleUser.getBasicProfile().getId())          
        let currentUserProfile = googleUser.getBasicProfile();
        

          const response = await Vue.axios.get('https://people.googleapis.com/v1/people/'+currentUserProfile.getId()
            +'?personFields=photos&key='+process.env.VUE_APP_GOOGLE_API_KEY);

        //   // console.log(response.data.photos[0].url);
          let profilePicUrl = (response.data.photos[0].url).split("=", 1)[0];  
          let userName = currentUserProfile.getName();
          // this.globalStore.userEmail = currentUserProfile.getEmail();  
          let userEmail = currentUserProfile.getEmail(); //'azelamaye.arbilo@msugensan.edu.ph'; sample email
          if(!userEmail.includes('@msugensan')){
            this.handleClickSignOut();
            alert('Invalid email account');
            return;
          }
          try {
                let response = await API.checkAccount(userEmail);
                if (response.error) {
                    console.log(response);
                    this.handleClickSignOut();
                    this.displaytext='';
                    Swal.fire({
                      icon: 'error',
                      title: response.error.data.statusCode,
                      text: response.error.data.message,
                    })
                } else {
                  response.user.profilePicUrl = profilePicUrl;
                  response.user.userName = userName;
                  this.$cookies.set('_SID_',JSON.stringify(response.user),'1d');
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
                this.handleClickSignOut();
                this.displaytext='';
            } 
          this.isSignIn = this.$gAuth.isAuthorized
      } catch (error) {
        // On fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickSignOut(){
      try {
        await this.$gAuth.signOut()
        this.displaytext='';
      } catch (error) {
        // On fail do something
        console.error(error);
      }
    },

    // getProfileImage:async function (Id) {
    //   try {
    //     const response = await this.$https.get('https://people.googleapis.com/v1/people/'+Id
    //     +'?personFields=photos&key='+process.env.VUE_APP_GOOGLE_API_KEY);
    //     console.log(response);
    //     // return response;

    //   } catch (error) {
    //     // On fail do something
    //     console.log('asd',error);
    //   }
    //   return "";
    // },
  },
  async mounted(){

  }
  
}
</script>