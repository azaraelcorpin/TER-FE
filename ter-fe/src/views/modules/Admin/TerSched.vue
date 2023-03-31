<template>
<div >
    
    <v-card-title>
      SCHEDULES AND EVALUATION ITEMS
      <v-spacer></v-spacer>
    </v-card-title>

       <v-data-table
                dense
                hide-default-footer
                class="elevation-1"
                :headers="table_header"
                :items="(table_loading)?[]:items"
                :loading="table_loading"                
                >
            <template v-slot:[`item.date_end`]="{ item }">
                {{ dateToString(item.date_end) }}
            </template>
            <template v-slot:[`item.date_start`]="{ item }">
                {{ dateToString(item.date_start) }}
            </template>
            <template v-slot:[`item.controls`]="{ item }">
                <!-- <v-icon medium color="green" > mdi-magnify-plus </v-icon> -->
                <v-icon class="mr-1" v-if="item.status!=='open'"
                  medium
                  color="gray"
                  @click="open(item)"
                >
                mdi-close-circle-outline
                </v-icon>
                
                <v-icon class="mr-1" v-else
                  medium
                  color="green"
                  @click="close(item)"
                >
                mdi-checkbox-marked-circle-outline
                </v-icon>
                <v-icon class="mr-1"
                  medium
                  :color="(item.status==='open')?'green':'black'"
                  @click="dialog=true,selectedItem=item"
                >
                mdi-pencil
                </v-icon>
                <v-icon
                  medium
                  :color="(item.status==='open')?'green':'black'"
                  @click="manageTer(item)"
                >
                mdi-login
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
            <v-form ref="formEntry" >
                <v-card>
                    <v-card-title>
                    <span class="text-h5">Update Schedule Date</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                            <DatePicker v-if="dialog" label="Date Start" :date-val="selectedItem.date_start"  @on-select="(val)=>{date_start=val}"></DatePicker>
                            </v-col>
                            <v-col cols="6">
                            <DatePicker v-if="dialog" label="Date End" :date-val="selectedItem.date_end" @on-select="(val)=>{date_end=val}"></DatePicker>
                            </v-col>
                        </v-row>
                    </v-container>  
                    </v-card-text>
                    <v-card-actions>                        
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="updateSched(selectedItem);"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>          
        </v-dialog>
    </div>
</div>
</template>

<script>
import API from "@/API/api.js"
import Swal from "sweetalert2";
import DatePicker from "@/components/DatePicker.vue";
export default{
    name:'TerSched',
    components:{DatePicker},
    data(){
      return  {
        Swal,
         items:[],
         table_header:[
        {
          text: "School Year",
          value: "sy",
        },
        {
          text: "Items for Head Evaluators",
          value: "h",
        },
        {
          text: "Items for Peer-peer Evaluators",
          value: "p",
        },
        {
          text: "Items for Student Evaluators",
          value: "s",
        },  
        {
          text: "Start",
          value: "date_start",
        },
        {
          text: "End",
          value: "date_end",
        },
        {
          text: "Status",
          value: "status",
        },        
        {
          text: "Actions",
          value: "controls",
          sortable: false,
        },
            ],
        dialog:false,
        menu:false,
        date_start:"",
        date_end:"",
        selectedItem:{},
        confirm_dialog:false,
        table_loading:false,
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
                this.table_loading=true;
                const response = await API.getTerSchedAll();
                if (response.error) {
                // error getting data
                console.log(`${response.error}`);
                } else {                    
                this.items = response.items;
                this.items.forEach(item=>{
                    if(item.date_start){
                        item.date_start = new Date(item.date_start);
                    }
                    if(item.date_end){
                        item.date_end = new Date(item.date_end);
                    }
                });
                this.table_loading=false;
                }
            } catch (e) {
                console.log(e);
            }
            },

            async close(item){
                Swal.fire({
                title: 'Close '+item.sy+'?',
                text: 'Do you want to set status into close?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, set it close!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    try {
                            const response = await API.setClose(item);
                            if (response.error) {
                            // error getting data
                            console.log(`${response.error}`);
                            } else {
                                
                            this.queryData();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                }
                })
            },
            async open(item){
                Swal.fire({
                title: 'Open '+item.sy+'?',
                text: 'Do you want to set status into open?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, set it open!'
                }).then(async(result) => {
                if (result.isConfirmed) {                    
                    try {
                            if(this.checkOpenCounts())
                             throw new Error('Only one openstatus allowed')

                            const response = await API.setOpen(item);
                            if (response.error) {
                            // error getting data
                            console.log(`${response.error}`);
                            } else {
                                
                            this.queryData();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                }
                })
            },
            async updateSched(item){                
                try {
                        if(this.date_end && this.date_start){
                            if(new Date(this.date_end) <= new Date(this.date_start)){
                                Swal.fire({
                                    title: 'Invalid',
                                    text: `Start should not be later than end`,
                                    icon: 'error',
                                })
                                return;
                            }
                        }
                    this.selectedItem.date_start=this.date_start?new Date(this.date_start):null;
                    this.selectedItem.date_end=this.date_end?new Date(this.date_end):null;                        
                    this.table_loading=true;
                        const response = await API.updateTerSched(item);
                        if (response.error) {
                        // error getting data
                        console.log(`${response.error}`);
                        Swal.fire({
                                title: 'Error',
                                text: `${response.error}`,
                                icon: 'error',
                            })
                        } else {
                            this.dialog = false;
                            Swal.fire({
                                title: 'Updated',
                                text: 'Successfully Updated',
                                icon: 'success',
                            })                            
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    this.table_loading=false;
                    
            },

            async openTerItems(item){
                alert('Open'+item.sy)
            },

            checkOpenCounts(){
                let openCount = 0;
                for ( let item in this.items) {
                    if(this.items[item].status === 'open')
                        openCount++;
                }
                if(openCount >= 1){
                    Swal.fire({
                        title: 'One evaluation schedule open only',
                        text: 'Please review your choices',
                        icon: 'error'
                    })
                    return true
                }
                return false;
            },
            dateToString(item){
                if(item){
                    // let options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
                    let formattedDate = item.toISOString().substring(0, 10);    
                    return formattedDate; 
                }
                return '';
            },
            getRowClass(item) {
      // Return the CSS classes to apply to the row

            if (item.status === 'open') {
                return 'row-even';
            } else {
                return 'row-odd';
            }
            },

            manageTer(item){
          localStorage.setItem('routeParams',JSON.stringify(item))
          this.$router.push({ name: 'terFormMgt'})
        }

        // async removeUser(user){


        //         Swal.fire({
        //         title: 'Confirmation',
        //         text: "Remove user "+user.email+"?",
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Yes, delete it!',
        //         cancelButtonText: 'No, cancel!',
        //         cancelButtonColor: 'darkred',
        //         confirmButtonColor: 'green',
        //         showLoaderOnConfirm: true,
        //         reverseButtons: false,
        //         preConfirm:async (value) => {
        //             if (value) {                                    
        //                 try {
        //                     const response = await API.removeUser(user.email);
        //                         if (response.error) {
        //                             console.log(`${response.error}`);
        //                             Swal.fire({
        //                                 icon: 'error',
        //                                 title: `${response.error.status}`,
        //                                 text: `${response.error.message}`
        //                             })
        //                         } else {
        //                             this.queryData()
        //                             Swal.fire(
        //                             'Deleted!',
        //                             'Your file has been deleted.',
        //                             'success'
        //                             )
        //                         }
        //                 } catch (e) {
        //                     console.log(e);
        //                 }  
        //             }
        //         }
        //         })
        //     },
        
        // async addUser(){
        //         Swal.fire({
        //             title: 'Submit new email admin',
        //             input: 'email',
        //             inputAttributes: {
        //                 autocapitalize: 'off'
        //             },
        //             showCancelButton: true,
        //             confirmButtonText: 'Submit',
        //             showLoaderOnConfirm: true,
        //             preConfirm:async (_email) => {
        //                 if(_email.endsWith('@msugensan.edu.ph')){
        //                     try {
        //                         const response = await API.setAsAdmin(_email);
        //                         if (response.error) {
        //                             console.log(`${response.error}`);
        //                             Swal.fire({
        //                                 icon: 'error',
        //                                 title: 'Duplication',
        //                                 text: `${response.error}`
        //                             })
        //                         } else {
        //                             this.queryData()
        //                             Swal.fire({
        //                                 icon: 'success',
        //                                 title: 'Saved',
        //                                 text: 'Success'
        //                             })
        //                         }
        //                     } catch (e) {
        //                         console.log(e);
        //                     }
        //                 }else{
        //                     Swal.showValidationMessage(
        //                     `Not an institutional email`
        //                     )
        //                 }
                       
        //             },
        //             allowOutsideClick:false
        //             })
                    
        // },
            
    },
    activated(){
        this.queryData();
    },
    mounted(){
        this.queryData();
    },
    watch: {
        // whenever question changes, this function will run
        dialog(newState) {
        if (newState === true) {
            
            // this.date_start="";
            // this.date_end="";
        }
        }
    }
}
</script>
<style>
.row-even {
  background-color: #4bbe16;
  
}
.row-even :hover{
    background-color: #82e056;
}
.row-odd {
  background-color: #e0e0e0;
}
</style>