<template>
     <div class="v-application--wrap">
      <v-app-bar color="#20bfd2" app>
        <v-app-bar-nav-icon style="color:aliceblue" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div style="color:black;">Teacher Efficiency Rating Portal</div>
        <v-spacer />
        <div>
        <!-- <v-btn icon large text id="profileAvatar-id">
            <v-avatar size="36px">
                <v-icon v-if="globalStore.profilePicUrl===''"  x-large class="white--text">
                    mdi-account-circle
                </v-icon>
                <img v-else
                  :src="globalStore.profilePicUrl"
                  referrerpolicy="no-referrer"
                >
            </v-avatar>
        </v-btn> -->
        <profile-avatar/>
      </div>
      </v-app-bar>
      <v-navigation-drawer app
        v-model="drawer"
        src="@/assets/bg.jpeg"
       
      >
        <v-list-item>
          <v-list-item-content>
            <!-- <img
                  src="@/assets/MSU_-_Gensan_logo.png"  
                  alt="MSU GenSan" width="10" height="50"                
                > -->
            <!-- <v-list-item-title class="text-h4"> I-C-T-O </v-list-item-title>
            <v-list-item-subtitle> Powered By</v-list-item-subtitle> -->
            <div class="logo-holder logo">
              <h3>MSU GSC</h3>
              <p>High School Department</p>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <div v-for="item in ConstRoutes" :key="item.path" link>


                <v-list-item v-if="!item.children && item.visible" :to="item.path" ripple="ripple" class="black--text mp-nav-item" active-class="mp-nav-item__active">
                    <v-list-item-icon class="layout-drawer__icon">
                        <v-icon>{{item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            <span>{{item.meta.title }}</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group v-else-if="item.visible" class="black--text mp-nav-item" active-class="black--text mp-nav-item__active" :prepend-icon=item.icon>
                  <template v-slot:activator>
                    <v-list-item  :to="item.path" ripple="ripple" class="black--text mp-nav-item" active-class="mp-nav-item__active">
                        <v-list-item-content>
                            <v-list-item-title>
                                <span>{{item.meta.title}}</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </template>
                    
                    <div v-for="child in item.children" :key="child.path">
                        <v-list-item style="margin-left:10px;" v-if="child.visible" :to="child.path" ripple="ripple" class="black--text mp-nav-item" active-class="mp-nav-item__active">
                            <v-list-item-icon class="layout-drawer__icon">
                                <v-icon >{{child.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>
                                    <span >{{child.meta.title }}</span>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list-group>

            </div>            
        </v-list>
      </v-navigation-drawer>
     
    <v-main>
      <transition
        name="fade-transform"
        mode="out-in"
      >      
        <keep-alive>
          <slot />
        </keep-alive>
      </transition>
    </v-main>

    <!-- <v-footer 
      app
      padless
      inset
      style="height:20px;"
    >
      <v-card 
        flat
        tile
        width="100%"
        class="text-center"
        color="#600000"
        style="height:60px;"
      >
        <v-card-text class="white--text" style="margin-top: -10px;">
          <v-icon color="white">mdi-cog </v-icon>
          <strong>Mindanao State University-Gensan</strong>
          <div>Information Communication and Technology Office </div>
        </v-card-text>
      </v-card>
    </v-footer> -->
     </div>
  </template>
  
  <script>
  import  {
    ConstRoutes
} from '@/router';
import {globalStore,showErrorDialog} from '@/main.js'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
  export default {
    name: 'App',
    components:{
      ProfileAvatar,
    },
    props:{
      routeList: {
            type: Array,
            default: () => ConstRoutes,
        },
    },
    data: () => ({
      globalStore,
      drawer:true,
      ConstRoutes,showErrorDialog
    }),
    mounted(){
      //this.startInterval()
      this.$cookies.refresh()
    },
    methods:{
              
        checkSession(){
            this.$cookies.refresh()
            if(!this.$cookies.get('session')){
              this.showErrorDialog('Session','Session timed out')
              throw new Error('Session Out');
            }

        },
        startInterval(){
              let intervalTime =  5 * 60 * 1000 // 5 minutes in milliseconds
              let intervalId = setInterval(() => {
                try {
                 this.checkSession();
                } catch (error) {
                  console.error('Interval error:', error);
                  clearInterval(intervalId); // Clear the interval
                }
              }, intervalTime);

              // Set up interval to periodically clear and run the interval
              let clearAndRunIntervalTime = 60 * 60 * 1000; // 1 hour in milliseconds
              setInterval(() => {
                clearInterval(intervalId); // Clear interval
                intervalId = setInterval(this.checkSession(), intervalTime); // Set up interval again
              }, clearAndRunIntervalTime)
            }
    }
  };
  </script>

<!-- https://codepen.io/maheshambure21/pen/MWWgyyG (LOGO) -->
  <style scoped>
  @import url('https://fonts.googleapis.com/css?family=Bangers|Cinzel:400,700,900|Lato:100,300,400,700,900|Lobster|Lora:400,700|Mansalva|Muli:200,300,400,600,700,800,900|Open+Sans:300,400,600,700,800|Oswald:200,300,400,500,600,700|Roboto:100,300,400,500,700,900&display=swap');
  .logo h3 {
    color: #8b170a;
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-size: 50px;
    line-height:1.3;
}
.logo p {
    font-size: 12px;
    letter-spacing: 7px;
    text-transform: uppercase;
    background: #34495e;
    font-weight: 400;
    color: #fff;
    padding-left: 5px;
}
  </style>