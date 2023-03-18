<template>
<div >
    
    <v-card-title>
      Admin User
      <v-spacer></v-spacer>
      <!-- <v-text-field
        v-model="searchData"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>       -->
    </v-card-title>
    <!-- <v-navigation-drawer
      v-model="dialog"
      absolute
      temporary
      :right="true"
    >
    <div>asdasda</div>
    </v-navigation-drawer> -->
                <v-btn                
                @click="addUser()"
                >
                New Admin User
                </v-btn>           
       <v-data-table
                dense
                hide-default-footer
                class="elevation-1"
                :headers="table_header"
                :items="userList"
                >
            <template v-slot:[`item.controls`]="{ item }">
                <!-- <v-icon medium color="green" > mdi-magnify-plus </v-icon>
                <v-icon
                  medium
                  color="green"
                  @click="Swal.fire('Hi!   '+item.email)"
                >
                  mdi-pencil
                </v-icon> -->
                <v-icon
                  medium
                  color="red"
                  @click="removeUser(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="warning" icon="mdi-information">
                  Found no results.
                </v-alert>
              </template> 
        </v-data-table> 
    <div>
        <v-dialog style="margin: auto;"
            v-model="dialog"
            persistent
            max-width="600px"
            @keydown.esc="!confirm_dialog?close():(dialog=false,confirm_dialog=false)"
            @keydown.enter="!confirm_dialog?save():dialog=false"
            >            
        </v-dialog>
    </div>
</div>
</template>

<script>
import API from "@/API/api.js"
import Swal from "sweetalert2";
export default{
    name:'UserList',
    data(){
      return  {
        Swal,
         userList:[],
         table_header:[
        {
          text: "User email",
          value: "email",
        },
        {
          text: "Position",
          value: "position",
        },
        {
          text: "Actions",
          value: "controls",
          sortable: false,
        },
            ],
        dialog:false,
        confirm_dialog:false,
        rules: {
                noSpace: v => (!v?.includes(' ')) || "No space allowed.",
                requiredField: v => !!v || "Required field.",
                requiredSelection: v => !!v || "Required at least one selection",
                properEmail: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid. Ex. juandelacruz@apollo.com.ph',
                matchPassword: v => v === this.form.password || "Does not match new password.",
                mobileNumber: v => !v || /^(09)\d{9}$/.test(v) || 'Mobile number must be valid. Ex. starts with (09) followed by xxxxxxxxx, where x = numeric character only', 
                maxLength: (v) => (v && v.length <= 12) || "Max 12 characters",
                numbers: (v) => (!isNaN(v) && /^[0-9.]*$/.test(v)) || !v || "Must be positive numbers only",
                currency: v => (/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(v)) || (/^[1-9]\d*(((,\d{3}){2})?(\.\d{0,2})?)$/.test(v)) || (/^[0]\.\d{0,2}$/.test(v))|| v ==="0.00" || v ==="0"  || 'Currency value only',
                // float: (v) => ((!isNaN(this.StringToNumber(v)) && this.StringToNumber(v).indexOf('.') != -1) || (!isNaN(this.StringToNumber(v)) && /^[0-9]*$/.test(this.StringToNumber(v)))) || "Must be a number"
                ///^(09|\+639)\d{9}$/ <- if needed full philippine mobile number 
            },
        };
    },

    methods:{
        async queryData() {
            try {
                const response = await API.getUserAll();
                console.log("users: ", response);
                if (response.error) {
                // error getting data
                console.log(`${response.error}`);
                } else {
                    
                this.userList = response.USERS;
                }
            } catch (e) {
                console.log(e);
            }
            },

        async removeUser(user){


                Swal.fire({
                title: 'Confirmation',
                text: "Remove user "+user.email+"?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                cancelButtonColor: 'darkred',
                confirmButtonColor: 'green',
                showLoaderOnConfirm: true,
                reverseButtons: false,
                preConfirm:async (value) => {
                    if (value) {                                    
                        try {
                            const response = await API.removeUser(user.email);
                                if (response.error) {
                                    console.log(`${response.error}`);
                                    Swal.fire({
                                        icon: 'error',
                                        title: `${response.error.status}`,
                                        text: `${response.error.message}`
                                    })
                                } else {
                                    this.queryData()
                                    Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                    )
                                }
                        } catch (e) {
                            console.log(e);
                        }  
                    }
                }
                })
            },
        async addUser(){
                Swal.fire({
                    title: 'Submit new email admin',
                    input: 'email',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    showLoaderOnConfirm: true,
                    preConfirm:async (_email) => {
                        if(_email.endsWith('@msugensan.edu.ph')){
                            try {
                                const response = await API.setAsAdmin(_email);
                                if (response.error) {
                                    console.log(`${response.error}`);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Duplication',
                                        text: `${response.error}`
                                    })
                                } else {
                                    this.queryData()
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Saved',
                                        text: 'Success'
                                    })
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }else{
                            Swal.showValidationMessage(
                            `Not an institutional email`
                            )
                        }
                       
                    },
                    allowOutsideClick:false
                    })
                    
        },
            
    },
    mounted(){
        this.queryData();
    },
    watch: {
        // whenever question changes, this function will run
        dialog(newState) {
        if (newState === true) {
            this.alert_show=false;
        }
        }
    }
}
</script>