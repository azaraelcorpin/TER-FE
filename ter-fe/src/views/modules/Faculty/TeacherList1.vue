<template>
    <v-container fluid >  
      <v-row justify="center">
        <v-col cols="12"  >
          <v-card>
            <v-card-title>
              {{('List of Faculty '+((['Academic Head','Director'].includes($cookies.get('_SID_').position))?' (As Head)':'(As Peer)'))}}
            </v-card-title>
            <v-card-text v-if="!list_loading">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>              
              <v-data-table
                :headers="headers"
                :items="teachers" 
                :search="search"
                class="elevation-1"
                :loading="list_loading"
                loading-text="Loading... Please wait"
              >
              <template v-slot:[`item.validated`]="{ item }">
                <!-- <v-icon medium color="green" > mdi-magnify-plus </v-icon> -->
                <div v-if="Boolean(item.fullname)">
                  <v-icon v-if="Boolean(!item.validated) && item.designation !== 'Study Leave'"
                    medium
                    color="green"
                    @click="evaluate(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-tooltip bottom v-else-if="item.designation === 'Study Leave'">
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
                    <span>No TER</span>
                  </v-tooltip>
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
            <v-container fluid v-else style="display: flex; justify-content: center;">
              <div>
                <v-progress-circular indeterminate size="90"></v-progress-circular>
                <div style="text-align: center; margin-top: 10px;">Loading... please wait</div>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="(['Academic Head','Director'].includes($cookies.get('_SID_').position))">
        <v-col cols="12"  >
          <v-card>
            <v-card-title>
              {{'List of Faculty (As Peer)'}}
            </v-card-title>
            <v-card-text v-if="!list_loading">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>              
              <v-data-table
                :headers="headers"
                :items="teachers1" 
                :search="search"
                class="elevation-1"
                :loading="list_loading"
                loading-text="Loading... Please wait"
              >
              <template v-slot:[`item.validated`]="{ item }">
                <!-- <v-icon medium color="green" > mdi-magnify-plus </v-icon> -->
                <div v-if="Boolean(item.fullname)">
                  <v-icon v-if="Boolean(!item.validated) && item.designation !== 'Study Leave'"
                    medium
                    color="green"
                    @click="evaluate(item,'P')"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-tooltip bottom v-else-if="item.designation === 'Study Leave'">
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
                    <span>No TER</span>
                  </v-tooltip>
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
            <v-container fluid v-else style="display: flex; justify-content: center;">
              <div>
                <v-progress-circular indeterminate size="90"></v-progress-circular>
                <div style="text-align: center; margin-top: 10px;">Loading... please wait</div>
              </div>
            </v-container>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>

import Swal from 'sweetalert2'
import API from "@/API/api.js"
  export default {
    name:'TeacherList',
    data() {
      return {
        teachers:[],
        teachers1:[],
        list_loading:true,
        headers: [
        { text: 'Faculty Name', value: 'fullname' },
        { text: 'Email Address', value: 'emailaddress' },
        { text: 'Position', value: 'position',  },
        { text: 'Designation', value: 'designation',  },
        { text: 'Rate', value: 'validated',  },
      ],
      search:'',
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
              this.list_loading=true;
                    let response = await API.getFacultyListByUser();
                    if (response.error) {
                        console.log(response);                    
                        Swal.fire({
                        icon: 'error',
                        title: response.error.data.statusCode,
                        text: response.error.data.message,
                        })
                    } else {
                        // console.log('lis',JSON.parse(JSON.stringify(response.FacultyList)))
                        this.teachers = JSON.parse(JSON.stringify(response.FacultyList??response.FacultyList_H))
                        this.teachers.sort((a, b) => {
                        // Check if either a or b is validated
                        const aValidated = a.validated ? true : false;
                        const bValidated = b.validated ? true : false;

                        // Compare validated status
                        if (aValidated && !bValidated) {
                            return 1;
                        } else if (!aValidated && bValidated) {
                            return -1;
                        }

                        // Compare fullname
                        if (a.fullname > b.fullname) {
                            return 1;
                        } else if (a.fullname < b.fullname) {
                            return -1;
                        } else {
                            return 0;
                        }
                        });
                        this.teachers1 = JSON.parse(JSON.stringify(response.FacultyList_P??[]))
                        this.teachers1.sort((a, b) => {
                        // Check if either a or b is validated
                        const aValidated = a.validated ? true : false;
                        const bValidated = b.validated ? true : false;

                        // Compare validated status
                        if (aValidated && !bValidated) {
                            return 1;
                        } else if (!aValidated && bValidated) {
                            return -1;
                        }

                        // Compare fullname
                        if (a.fullname > b.fullname) {
                            return 1;
                        } else if (a.fullname < b.fullname) {
                            return -1;
                        } else {
                            return 0;
                        }
                        });
                        this.list_loading=false;
                    }
                } catch (error) {
                    alert(error)
                } 
        },
        evaluate(item,evalType){
          if(evalType)
          item.evalType = evalType
          localStorage.setItem('routeParams',JSON.stringify(item))
          console.log(localStorage.getItem('routeParams'))
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
  </style>
  