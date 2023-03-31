<template>
    <v-container fluid >  
      <v-row justify="center">
        <v-col cols="12"  >
          <v-card>
            <v-card-title>
              {{($cookies.get('_SID_').position === 'Dean')?'Director':'List of Faculty'}}
            </v-card-title>
            <v-card-text v-if="!list_loading">
              <v-row>
                <v-col v-for="teacher in teachers" :key="teacher.id" class="text-center" cols="12" sm="4">
                  <v-card :style="'background-color:'+(!teacher.validated?'lightblue;':'gray')">
                    <v-card-text>
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs"
                            @click="evaluate(teacher)"
                            v-on="on" 
                            style="border: none;" :disabled="Boolean(teacher.validated)"  class="w-100" outlined>{{ teacher.fullname }}                        
                            </v-btn><br>
                        </template>
                        <span>Evaluate<br>{{ teacher.fullname }}</span>
                        </v-tooltip>
                      {{ teacher.emailaddress }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
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
        list_loading:true,
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
                        this.teachers = JSON.parse(JSON.stringify(response.FacultyList))
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
                        this.list_loading=false;
                    }
                } catch (error) {
                    alert(error)
                } 
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
  </style>
  