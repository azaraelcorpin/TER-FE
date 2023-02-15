<template>
    <v-container
      fluid
      style="height: 50px"
    >
      <v-row justify="center">
        <v-menu
          bottom
          min-width="300px"
          rounded
          offset-y
        >
          <template v-slot:activator="{ on }">
            <div style="color:white; margin-top:10px;margin-right:10px;">{{globalStore.userName}}</div>
            <v-btn
              icon
              x-large
              v-on="on"
            >
              <v-avatar
                color="brown"
                size="48"
              >
              <v-icon v-if="globalStore.profilePicUrl===''"  x-large class="white--text">
                        mdi-account-circle
                    </v-icon>
                    <img v-else
                    :src="globalStore.profilePicUrl"
                    referrerpolicy="no-referrer"
                    >
                <!-- <span class="white--text text-h5">{{ user.initials }}</span> -->
                
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar
                  color="brown"
                >
                    <v-icon v-if="globalStore.profilePicUrl===''"  x-large class="white--text">
                        mdi-account-circle
                    </v-icon>
                    <img v-else
                    :src="globalStore.profilePicUrl"
                    referrerpolicy="no-referrer"
                    >
                  <!-- <span class="white--text text-h5">{{ user.initials }}</span> -->
                </v-avatar>
                <h3>{{ globalStore.userName }}</h3>
                <p class="text-caption mt-1">
                  {{ globalStore.userEmail }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                >
                  Edit Account
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  @click="handleClickSignOut"
                >
                  Sign Out
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-row>
    </v-container>
  </template>

<script>
import {globalStore} from '@/main.js'
export default {
    name: 'ProfileAvatar',
  data: () => ({
    user: {
      initials: '',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
    },
    globalStore,
  }),
  methods:{
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
  }
}
</script>