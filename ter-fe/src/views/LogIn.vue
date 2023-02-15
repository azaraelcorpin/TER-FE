<template>
    <div style="background-color:aqua;display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;">
    {{globalStore.userEmail}}
    <v-btn @click="handleClickSignIn"  v-if="!isSignIn" :disabled="!isInit"
    > 
    <span>Sign In via Google</span></v-btn>
    <v-btn @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signOout</v-btn>
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
  import {globalStore} from '@/main.js'
  export default {
    name: 'LogIn',
    data () {
      return {
        isInit: false,
        isSignIn: false,
        info:"",
        globalStore,
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
          const googleUser = await this.$gAuth.signIn()
          console.log('user', googleUser.getBasicProfile().getId())
          let currentUserProfile = googleUser.getBasicProfile();

            const response = await Vue.axios.get('https://people.googleapis.com/v1/people/'+currentUserProfile.getId()
              +'?personFields=photos&key='+process.env.VUE_APP_GOOGLE_API_KEY);

              
            console.log(response.data.photos[0].url);
            this.globalStore.profilePicUrl = (response.data.photos[0].url).split("=", 1)[0];  
            this.globalStore.userName = currentUserProfile.getEmail().split("@",1)[0];
            this.globalStore.userEmail = currentUserProfile.getEmail();          
            if(!this.globalStore.userEmail.includes('@msugensan')){
              this.handleClickSignOut();
              alert('Invalid email account');
              return;
            }
            /// Code to query from DB userData Employee{fullname,ID,Position,Office,Designation,Salary}
            console.log(this.globalStore.profilePicUrl);
          this.isSignIn = this.$gAuth.isAuthorized

          this.$router.push({ name: 'Dashboard' })
        } catch (error) {
          // On fail do something
          console.error(error);
          return null;
        }
      },
  
      async handleClickSignOut(){
        try {
          await this.$gAuth.signOut()
          this.isSignIn = this.$gAuth.isAuthorized
          this.globalStore.profilePicUrl = ''
          this.globalStore.userName = '';
          this.globalStore.userEmail = ''; 
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
    mounted(){

      let that = this
      let checkGauthLoad = setInterval(async function(){
        that.isInit = that.$gAuth.isInit
        that.isSignIn = that.$gAuth.isAuthorized
        
        try{            
            let currentUserProfile = that.$gAuth.GoogleAuth.currentUser.get().getBasicProfile();
            console.log('user',currentUserProfile.getEmail().split("@",1)[0]);
            that.globalStore.userName = currentUserProfile.getEmail().split("@",1)[0];
            that.globalStore.userEmail = that.isSignIn?currentUserProfile.getEmail():'';
            
            //get ProfilePic url from google account
            try{
                const response = await Vue.axios.get('https://people.googleapis.com/v1/people/'+currentUserProfile.getId()
                  +'?personFields=photos&key='+process.env.VUE_APP_GOOGLE_API_KEY);            
                that.globalStore.profilePicUrl = (response.data.photos[0].url).split("=", 1)[0];      
            }
            catch(error){
              that.globalStore.profilePicUrl=''
            }      

            // let profileImage = this.getProfileImage(currentUserProfile.getId());
            // console.log('profileImage',profileImage)
        }
        catch(error){
          console.log(error);
        }
        if(that.isInit) clearInterval(checkGauthLoad)
      }, 1000);

    }
    
  }
  </script>