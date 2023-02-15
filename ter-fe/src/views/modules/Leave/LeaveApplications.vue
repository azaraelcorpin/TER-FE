<template>
<div >
    
    <h3>Employee Information:</h3>
    <v-card>
        <v-row no-gutters>
            <v-col
                cols="12"
                sm="4"
                class="pa-2"
            >
                <b>Name</b>
                <br/>{{globalStore.empFullname}}
            </v-col>
            <v-col
                cols="12"
                sm="4"
                class="pa-2"
            >
                <b>Department</b>
                <br/>{{globalStore.empOffice}}
            </v-col>
            <v-col
                cols="12"
                sm="4"
                class="pa-2"
            >
                <b>Position</b>
                <br/>{{globalStore.empPosition}}
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col
                cols="12"
                sm="4"
                class="pa-2"
            >
                <b>ID</b>
                <br/>{{globalStore.empID}}
            </v-col>
            <v-col
                cols="12"
                sm="4"
                class="pa-2"
            >
                <b>Designation</b>
                <br/>{{globalStore.empDesignation}}
            </v-col>
            <v-col
                cols="12"
                sm="4"
                class="pa-2"
            >
                <b>Salary</b>
                <br/>{{globalStore.empSalary}}
            </v-col>
        </v-row>
        
    </v-card>
<br/>
<v-dialog v-model="alert_show" width="auto " >
    <v-alert v-model="alert_show" :type="alert_type" transition="scale-transition" dismissible>
        {{alert_text}}
    </v-alert>  
 </v-dialog>   
    <!-- table -->  
    <v-card>
        <h5>Leave Applications Record</h5>
       <v-data-table
                dense
                fixed-header
                height="500"
                class="elevation-1"
                :headers="table_header"
                :items="leaveApplicationList"
                :options.sync="options"
                :footer-props="{
                    'items-per-page-options': listSize,
                    'disable-pagination':true,
                    'prev-icon':'',
                    'next-icon':'',
                }"
                :items-per-page="pagination.pageSize"
                >
                <template v-slot:[`item.application_date`]="{ item }">
                    {{(new Date(item.application_date)).toLocaleString()}}
                </template>
                <template v-slot:[`item.number_of_days`]="{ item }">
                    {{(item.leave_dates.includes('[')?(item.leave_dates.replace('[','').replace(']','')).split(',').length:item.leave_dates)}}
                </template>
                <template v-slot:[`item.controls`]="{ item }">
                <v-icon
                  medium
                  color="green"
                  @click="alert('view Data'+item.id,'info')"
                >
                  mdi-magnify-plus
                </v-icon>
                <v-icon
                  medium
                  color="green"
                  @click="alert('update Data'+item.id,'info')"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  medium
                  color="red"
                  @click="alert('Delete Data'+item.id,'error')"
                >
                  mdi-delete
                </v-icon>                
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="warning" icon="mdi-information">
                  Found no results.
                </v-alert>
              </template> 
              <template v-slot:[`footer.prepend`]>
                    <v-row style="height: 50px; border-style: solid;border-width:1px;border-radius: 3px;border-right: 0px;border-top: 0px;" no-gutters justify="center">
                        <v-col 
                            cols="10"
                            sm="1"
                            md="2"                                                
                        >
                            <div class="text-center" style="margin-top:20px;">                               
                               <span>Date Application Range</span> <input type="checkbox" v-model="dateRange"/>                                                         
                            </div>            
                        </v-col>
                        <v-col v-if="dateRange"
                            cols="10"
                            sm="1"
                            md="2"                    
                        >
                        <DatePicker style="height: 50px;padding:0px;margin-top: -10px;" label="Start Date" v-on:on-select="(value)=>{date=new Date(value)}"></DatePicker>                    
                        </v-col>
                        <v-col v-if="dateRange"
                            cols="10"
                            sm="1"
                            md="2"                    
                        >
                        <DatePicker style="height: 50px;padding:0px;margin-top: -10px;" label="End Date" v-on:on-select="(value)=>{date=new Date(value)}"></DatePicker>                    
                        </v-col>
                        <v-col 
                            cols="10"
                            sm="1"
                            md="2"                    
                        >
                            <v-select
                                class="pa-2"
                                v-model="select"
                                :items="['TRN','Type','Details','Status']"
                                label="Select Field"                            
                                dense
                                >
                            </v-select>                    
                        </v-col>
                        <v-col 
                            cols="10"
                            sm="6"
                            md="2"                    
                        >
                            <v-text-field
                                class="pa-2"
                                v-model="searchData"
                                label="Search Value"                            
                                dense
                                >
                            </v-text-field>                    
                        </v-col>
                        <v-col 
                            cols="10"
                            sm="6"
                            md="1"
                        >
                            <v-btn
                            class="ma-2"
                            @click="alert('search value')"
                            >                            
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
             </template>             
             <template v-slot:[`footer.page-text`] >
                {{(((pagination.pageNumber-1)*(pagination.pageSize))+1)}} - {{(((pagination.pageNumber-1)*(pagination.pageSize))+pagination.numberOfElements)}}
                 of {{pagination.totalElements}}

            <v-icon  :disabled="(pagination.pageNumber === 1)" @click="(pagination.pageNumber--,queryData())" >mdi-chevron-left</v-icon>
            page {{pagination.pageNumber}} of {{pagination.totalPages}}
            <v-icon :disabled="(pagination.pageNumber === pagination.totalPages)" @click="(pagination.pageNumber++,queryData())" >mdi-chevron-right</v-icon>
            </template>
            
        </v-data-table> 
    </v-card>    
    <br/>
    <!-- end table-->
    <v-card>
                <v-btn                
                @click="(alert('HI','success'))"
                >
                New Leave Application
                </v-btn>
    </v-card>
     <!-- Dialog -->   
    <div>
        <v-dialog style="margin: auto;"
            v-model="dialog"
            persistent
            max-width="600px"
            @keydown.esc="!confirm_dialog?close():(dialog=false,confirm_dialog=false)"
            @keydown.enter="!confirm_dialog?save():dialog=false"
            >            
            <v-form ref="formEntry" v-if="!confirm_dialog" >
                <v-card>
                    <v-alert v-model="alert_show" :type="alert_type" transition="scale-transition" dismissible>
                  {{alert_text}}
                </v-alert>
                    <v-card-title>
                    <span class="text-h5">{{(LEAVE_TYPE.id===null)?"New Leave Type":"Update Leave Type"}}</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Leave Type Code*"
                            hint="(VL,SL,FL,..)"
                            :rules="[rules.requiredField,rules.noSpace]"
                            v-model="LEAVE_TYPE.code"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Description*"
                            hint="RA. No."
                            :rules="[rules.requiredField]"
                            v-model="LEAVE_TYPE.description"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="No.of days per year"
                            hint="Number of allowed days per year"
                            persistent-hint
                            :rules="[rules.numbers]"
                            v-model="LEAVE_TYPE.numberOfDays"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
            <div v-else>
                <v-card>
                    <v-alert v-model="alert_show" :type="alert_type" transition="scale-transition" dismissible>
                  {{alert_text}}
                </v-alert>
                    <v-card-title>
                    <span class="text-h5">Delete Leave Type Item?</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Leave Type Code*"
                            hint="(VL,SL,FL,..)"
                            disabled
                            v-model="LEAVE_TYPE.code"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Description*"
                            hint="RA. No."
                            disabled
                            v-model="LEAVE_TYPE.description"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="No.of days per year"
                            hint="Number of allowed days per year"
                            persistent-hint
                            disabled
                            v-model="LEAVE_TYPE.numberOfDays"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog=false,alert_show=false,confirm_dialog=false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Delete
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-dialog>
    </div>
    <!-- end Dialog -->   
</div>
</template>

<script>
import {globalStore} from '@/main.js'
import API from "@/API/api.js"
import DatePicker from '@/components/DatePicker.vue';
export default{
    name:'LeaveApplications',
    components:{DatePicker},
    data(){
      return  {
        select:"",
        dateRange:false,
        date:new Date(),
        globalStore,
        query:{
            code:"",
            description:"",
            },
            listSize: [5,10, 25, 50, 100],
            options:{},
          pagination:
                    {totalElements:0,
                    numberOfElements:0,
                    totalPages:0,
                    pageNumber:0,
                    pageSize:10,   // default value
                    },
         leaveApplicationList:[],
         table_header:[
        {
          text: "TRN id",
          value: "transaction_referrence_id",
        },
        {
          text: "Date Applied",
          value: "application_date",
        },
        {
          text: "Leave Type",
          value: "code",
        },
        {
          text: "Leave Details",
          value: "leave_details",
        },
        {
          text: "Number of working days",
          value: "number_of_days",
          sortable:false
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
        searchData:"",
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
        LEAVE_TYPE:{
            id:null,
            code:null,
            description:null,
            numberOfDays:null,
        },
        alert_show:false,
        alert_text:"",
        alert_type:"info", //success, info ,warning, error
        };
    },

    methods:{
        async queryData() {
            this.query.code = '';
            this.query.description='';
            try {
                    this.query.pageNo = this.pagination.pageNumber-1;
                    this.query.pageSize = this.pagination.pageSize;
                const response =
                await API.getLeaveApplication(
                    this.query
                );
                console.log("leaveApplication: ", response);
                if (response.error) {
                // error getting data
                console.log(`${response.error}`);
                this.alert(response.error,'error')
                } else {
                    
                this.leaveApplicationList = response.leaveApplications;
                this.pagination.totalPages = response.totalPages;
                this.pagination.numberOfElements = response.numberOfElements;
                this.pagination.totalElements = response.totalElements;
                console.log('ert',this.leaveApplicationList)
                }
            } catch (e) {
                console.log(e);
            }
            },
            alert(text,type){
                this.alert_type = type??'info';
                this.alert_text = text;
                this.alert_show = true;
            },

        async save(){
                if(this.confirm_dialog){//for delete 
                    try {
                        let response = await API.deleteLeaveType(
                            this.LEAVE_TYPE
                            );
                        console.log("leaveType: ", response);
                        if (response.error) {
                            // error getting data
                            console.log(response);
                            this.alert(response.error,'error')
                        } else {
                            this.alert('Leave Type Deleted','success')
                            this.dialog = false;
                            this.confirm_dialog = false;
                            this.queryData();
                        }
                    } catch (error) {
                        this.alert(error)
                        console.log(error.message);
                    }         
                }else
                if(this.$refs.formEntry.validate()){
                    // this.alert(this.LEAVE_TYPE,'success')
                    try {
                        let response;
                        if(!this.LEAVE_TYPE.id)
                            response = await API.createLeaveType(
                            this.LEAVE_TYPE
                            );
                        else
                            response = await API.updateLeaveType(
                            this.LEAVE_TYPE
                            );
                        
                        console.log("leaveType: ", response);
                        if (response.error) {
                            // error getting data
                            console.log(response);
                            this.alert(response.error,'error')
                        } else {
                            this.alert('Leave Type Saved','success')
                            this.$refs.formEntry.reset()
                            this.dialog = false;
                            this.queryData();
                        }
                    } catch (error) {
                        this.alert(error)
                        console.log(error.message);
                    }                    
                    // this.$refs.formEntry.reset();                    
                }
            },
            close(){
                    this.dialog = false;
                    this.alert_show=false;
                    this.$refs.formEntry.reset()
            },
            
    },
    mounted(){
        // this.queryData();
    },
    watch: {
        // whenever question changes, this function will run
        dialog(newState) {
        if (newState === true) {
            this.alert_show=false;
        }
        },
        options(newState,oldState){
            
            if((newState.itemsPerPage != oldState.itemsPerPage))
            {
                this.pagination.pageNumber = newState.page;
                this.pagination.pageSize = newState.itemsPerPage;
                this.queryData();
                // setTimeout(()=>{this.alert_show=false}, 5000)
            }
        }

    }
}
</script>
<style>

</style>