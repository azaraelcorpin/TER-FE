<template>
    <v-container fluid>
          <v-card>
            <v-card>
              <div class="Hcontainer">
                <div class="item"><strong>Student ID:</strong>&nbsp;{{$cookies.get('_SID_').id}}</div>
                <div class="item"><strong>Section:</strong>&nbsp;{{$cookies.get('_SID_').section}}</div>
                <div class="item"><strong>Name:</strong>&nbsp;{{$cookies.get('_SID_').userName}}</div>                
                <div class="item"><strong>Year Level:</strong>&nbsp;{{$cookies.get('_SID_').yearlevel}}</div>
              </div>
            </v-card>
            <v-card-title>
              List of Enrolled Subjects
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="items" 
                class="elevation-1"
                hide-default-footer
                :items-per-page = -1
                :loading="table_loading"
                loading-text="Loading... Please wait"
              >
              <template v-slot:[`item.validated`]="{ item }">
                <!-- <v-icon medium color="green" > mdi-magnify-plus </v-icon> -->
                <div v-if="Boolean(item.fullname)">
                  <v-icon v-if="Boolean(!item.validated)"
                    medium
                    color="green"
                    @click="evaluate(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-tooltip bottom v-else>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon 
                    medium
                    color="gray"
                    v-bind="attrs"
                        v-on="on"
                  >
                  mdi-checkbox-marked-circle
                  </v-icon>
                    </template>
                    <span>Evaluated</span>
                  </v-tooltip>
                </div>
                <v-tooltip bottom v-else>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon 
                        medium
                        color="red"
                        v-bind="attrs"
                        v-on="on"
                      >
                      mdi-alert-box
                      </v-icon>
                    </template>
                    <span>No Faculty Assigned</span>
                  </v-tooltip>
              </template>
              </v-data-table>
            </v-card-text>
          </v-card>
    </v-container>
  </template>
  
  <script>

import Swal from 'sweetalert2'
import API from "@/API/api.js"
  export default {
    name:'COR',
    data() {
      return {
        items:[],
        headers: [
        { text: 'Subject Code', value: 'subjcode' },
        { text: 'Days', value: 'days' },
        { text: 'Section', value: 'section' },
        { text: 'Time', value: 'time' },
        { text: 'Faculty', value: 'fullname' },
        { text: 'Room', value: 'room' },
        { text: 'Rate', value: 'validated',  },
      ],
      table_loading:true,
      };
    },
    computed:{
    //     sortedTeachers() {
    //         let tmp = {...this.teachers}
    //         return 
    // }
    },
  mounted(){   
    this.queryData()
  },
  activated(){   
    this.queryData()
  },
  methods: {
        async queryData() {
        try {
                    this.table_loading = true;
                    let response = await API.getCORByUser();
                    if (response.error) {
                        console.log(response);                    
                        Swal.fire({
                        icon: 'error',
                        title: response.error.data.statusCode,
                        text: response.error.data.message,
                        })
                    } else {
                        this.items = response.COR 
                        this.table_loading = false;                      
                    }
                } catch (error) {
                    alert(error)
                } 
        },
        alert(text){
          Swal.fire(text);
        },
        evaluate(item){
          localStorage.setItem('routeParams',JSON.stringify(item))
          this.$router.push({ name: 'terForm'})
        }
    }
  };
  </script>
  
  <style>
  .teacher-list {
    display: flex;
    justify-content: center;
  }
  .teacher-list button {
    margin: 10px;
  }
  .Hcontainer {
    display: flex;
    flex-wrap: wrap; /* allow wrapping items to the next line */
    justify-content: space-between; /* distribute items evenly on each row */
    align-items: flex-start; /* align items to the top of the container */
    padding: 5px;
  }

  .item {
    flex: 0 0 calc(50% - 10px); /* take up 50% of the container width minus some margin */
    height: 50px;
    margin-bottom: 10px; /* add some spacing between rows */
  }
  </style>
  