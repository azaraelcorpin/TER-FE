<template>
  <v-container fluid>
    
      <div style="position: fixed;top: 6.7%;background-color: white;padding-bottom: 10px;z-index: 999;width: 100%;">
        <p>
         <i><strong>Direction:</strong> Please answer all question carefully. Choose the approriate number which corresponds to your honest evaluation.</i>
        </p>
      </div>
    <v-card style="margin-top: 50px;">
      <!-- {{ items }}
      <v-data-table
                :headers="headers"
                :items="items" 
                class="elevation-1"
                :items-per-page= -1
                hide-default-header
                hide-default-footer
                :loading="table_loading"
                loading-text="Loading... Please wait"
      >
              <template v-slot:[`item.qstnNumber`]="{ item }">
                 <v-icon medium color="green" > mdi-magnify-plus </v-icon> 
                {{ item.question }}
              </template>
      </v-data-table> -->
          <v-card v-for="(item,index)  in items" :key="item.qstnNumber" style="margin-bottom: 10px;">
            <!-- {{ item.question }} -->
            <div v-if="Boolean(item.category)">
            <v-card-title v-if="(((items[index-1]??'').category??'') !== item.category )">
              {{ item.category }}
            </v-card-title>
          </div>
          <div style="display: flex; justify-content: center;">           
            <v-col cols="10">
          <v-row class="my-5" >  
            <v-col cols="2">
              <v-btn
                block
                :color="( selected !== 5 )?'secondary':'primary'"
                @click="toggleSelected(5)"
              >
                5
              </v-btn>
            </v-col>    
            <v-col cols="2">
              <v-btn
                block
                :color="( selected !== 6 )?'secondary':'primary'"
                @click="toggleSelected(6)"
              >
                6
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                block
                :color="( selected !== 7 )?'secondary':'primary'"
                @click="toggleSelected(7)"
              >
                7
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                block
                :color="( selected !== 8 )?'secondary':'primary'"
                @click="toggleSelected(8)"
              >
                8
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                block
                :color="( selected !== 9 )?'secondary':'primary'"
                @click="toggleSelected(9)"
              >
                9
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                block
                :color="( selected !== 10 )?'secondary':'primary'"
                @click="toggleSelected(10)"
              >
                10
              </v-btn>
            </v-col>
          </v-row>
          {{item.qstnNumber}} . &nbsp; {{ item.question }}
        </v-col>
        </div>

          </v-card>
      </v-card>
</v-container>
</template>

<script>

import API from '@/API/api'
import Swal from 'sweetalert2'

export default {
  components:{
  },
  data() {
    return {
      selected: null,
      items:[],
      category:'',
      headers: [
        { text: 'Subject Code', value: 'qstnNumber' },
      ],
      table_loading:true,
    }
  },
  mounted(){   
    this.queryData()
  },
  // computed:{
  //       itemChange() {
  //           let tmp = JSON.parse(JSON.stringify(this.items)) 
  //           return tmp
  //   }
  //   },
  methods: {
    toggleSelected(n) {
      if (this.selected === n) {
        this.selected = null
      } else {
        this.selected = n
      }
    },
    changeCategory(cat){
      this.category = cat;
      return cat;
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
