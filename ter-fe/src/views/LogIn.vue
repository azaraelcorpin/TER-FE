<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; position: relative;" class="bg">
    <div style="text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;justify-content: center; text-align: end; position: absolute; top: 20px; font-size: 48px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; color: #ffffff;">
      Mindanao State University
    </div>
      <div  style="position: absolute;margin-bottom: 30%;  font-size: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; color: black;">
        Junior High School Department
    </div>
    <div  style="position: absolute;margin-bottom: 15%;  font-size: 22px;text-decoration: underline; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; color:#137272;">
      TEACHING EFFICIENCY RATING
    </div>
    <br/>
    <div style="position: absolute;margin-bottom: -10%;">
      <v-btn @click="handleClickSignIn" > 
        <span>Sign In As Google</span>
      </v-btn>
      <!-- <div style="position: absolute; top: 90px; left: 50%; transform: translateX(-50%); animation: arrow 1s infinite;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="#4CAF50" d="M12 17.3l-5.6-5.6c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.9 4.9V2c0-.6.4-1 1-1s1 .4 1 1v13.2l4.9-4.9c.4-.4 1-.4 1.4 0s.4 1 0 1.4L12 17.3z"/>
        </svg>
      </div> -->
    </div>
    <v-btn @click=" dialog=true" class="mt-5" color="green">Test Here</v-btn>
        <v-dialog v-model="dialog" persistent>
          <v-card>
            <v-card-title>
              Select Role
            </v-card-title>
            <v-card-text>
              <v-radio-group v-model="selectedRole" inline>
                <v-radio value="dean" label="Dean"></v-radio>
                <v-radio value="director" label="As Director"></v-radio>
                <v-radio value="faculty" label="As Faculty"></v-radio>
                <v-radio value="student" label="As Student"></v-radio>
              </v-radio-group>
              <v-select v-if="selectedRole === 'faculty'" v-model="selectedFaculty" :items="faculty" label="Select faculty"></v-select>
              <v-select v-if="selectedRole === 'student'" v-model="selectedStudent" :items="students" label="Select Student"></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn @click="confirmSelection">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>

<style>
  @keyframes arrow {
    0% { top: 10px; }
    50% { top: 20px; }
    100% { top: 10px; }
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../assets/bg.jpeg') no-repeat center center;
    background-size: cover;
    background-color: rgb(64, 235, 235);
  }
</style>





<script>
/** 
* You should first need to place these 2 lines of code in your APP ENTRY file, e.g. src/main.js
*
* import GAuth from 'vue-google-oauth2'
* Vue.use(GAuth, {clientId: '4584XXXXXXXX-2gqknkvdjfkdfkvb8uja2k65sldsms7qo9.apps.googleusercontent.com'})
* 
*/
// import GAuth from 'vue-google-oauth2'
// import Vue from 'vue';
import API from "@/API/api.js"
import Swal from 'sweetalert2'

export default {
  name: 'LogIn',
  data () {
    return {
      imageUrl: '../assets/bg.jpeg',
      isInit: false,
      isSignIn: false,
      info:"",
      displaytext:"",

      dialog: false,
      selectedRole: '',
      selectedStudent: '',
      selectedFaculty: '',
      students: ['najiha.musa@msugensan.edu.ph', 'shairafatma.ismael@msugensan.edu.ph', 'salma.maningcara@msugensan.edu.ph','jasmine.limjap@msugensan.edu.ph'],
      faculty: ['jinky.bibat@msugensan.edu.ph', 'jinky.bibat@msugensan.edu.ph', 'irene.bernadas@msugensan.edu.ph','daryl.valdez@msugensan.edu.ph'],
      resolve: null
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
        

          // const response = await Vue.axios.get('https://people.googleapis.com/v1/people/'+currentUserProfile.getId()
          //   +'?personFields=photos&key='+process.env.VUE_APP_GOOGLE_API_KEY);

         console.log('test',currentUserProfile.getName());
          let profilePicUrl = currentUserProfile.getImageUrl();  
          let userName = currentUserProfile.getName();
          // this.globalStore.userEmail = currentUserProfile.getEmail();  
          let userEmail =currentUserProfile.getEmail();// 'mariatheresa.pelones@msugensan.edu.ph' //'azelamaye.arbilo@msugensan.edu.ph'; sample email currentUserProfile.getEmail();
          if(!userEmail.includes('@msugensan')){
            this.handleClickSignOut();
            Swal.fire({
                      icon: 'error',
                      title: 'Unauthorized',
                      text: 'Invalid email account',
                    })
            // alert('Invalid email account');
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
                  try{this.$router.push({ name: 'Dashboard'})
                  }catch(e){
                    console.log(e)
                  }
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

  async  confirmSelection() {
      

        let userEmail=''

        
          if(this.selectedRole === 'dean'){userEmail = 'mariatheresa.pelones@msugensan.edu.ph';}
          else if(this.selectedRole === 'director'){ userEmail = 'renante.magoncia@msugensan.edu.ph';}
          else if(this.selectedRole === 'faculty') {userEmail = this.selectedFaculty;}
          else if(this.selectedRole === 'student'){ userEmail = this.selectedStudent;}

        if(userEmail === '')
        return;
      console.log('1',userEmail)
        try { 
                let response = await API.checkAccount(userEmail);
                console.log('2',response)
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
                  // response.user.profilePicUrl = profilePicUrl;
                  response.user.userName = response.user.userName??userEmail;
                  this.$cookies.set('_SID_',JSON.stringify(response.user),'1d');
                  console.log('test',JSON.stringify(response.user))
                  localStorage.removeItem('logOut')
                  try{this.$router.push({ name: 'Dashboard'})
                  }catch(e){
                    console.log(e)
                  }
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
                this.handleClickSignOut();
                this.displaytext='';
            } 
            this.dialog = false

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