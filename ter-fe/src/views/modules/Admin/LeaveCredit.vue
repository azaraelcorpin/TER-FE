<template>
<div >
    <v-card-title>
      Leave Credits
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchData"
        append-icon="mdi-magnify"
        @click:append="(pagination.pageNumber=1,queryData())"
        @keydown.enter="(pagination.pageNumber=1,queryData())"
        label="Search"
        single-line
        hide-details
      ></v-text-field>      
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
                @click="dialog = !dialog,LEAVE_CREDIT.id=null,getDepartment()"
                >
                Register New Leave Credit
                </v-btn>
                <v-alert v-model="alert_show" :type="alert_type" transition="scale-transition" dismissible>
                  {{alert_text}}
                </v-alert>    
                 
       <v-data-table
                dense
                class="elevation-1"
                :headers="table_header"
                :items="leaveCreditList"                
                :options.sync="options"
                :footer-props="{
                    'items-per-page-options': listSize,
                    'disable-pagination':true,
                    'prev-icon':'',
                    'next-icon':'',
                }"
                :items-per-page="pagination.pageSize"
                >
                <template v-slot:[`item.name`]="{ item }">
                {{(item.lastname+', '+item.firstname+' '+(item.middlename?item.middlename[0]+'.':'')).toUpperCase()}}                
              </template>
            <template v-slot:[`item.controls`]="{ item }">
                <!-- <v-icon medium color="green" > mdi-magnify-plus </v-icon> -->
                <v-icon
                  medium
                  color="green"
                  @click="LEAVE_CREDIT = {...item},LEAVE_CREDIT.id = item.empId,generateTRN(),update_credits=false,dialog=true"
                >
                  mdi-pencil
                </v-icon>
                <!-- <v-icon
                  medium
                  color="red"
                  @click="LEAVE_CREDIT = {...item},dialog=true,confirm_dialog=true"
                >
                  mdi-delete
                </v-icon> -->
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="warning" icon="mdi-information">
                  Found no results.
                </v-alert>
              </template> 
              <!-- <template v-slot:footer>
                <div  class="text-center">
                    <v-btn
                    color="primary"
                    dark
                    class="ma-2"
                    @click="buttonCallback">
                        Button
                    </v-btn>
                </div>
             </template>              -->
             <template v-slot:[`footer.page-text`]>
                {{(((pagination.pageNumber-1)*(pagination.pageSize))+1)}} - {{(((pagination.pageNumber-1)*(pagination.pageSize))+pagination.numberOfElements)}}
                 of {{pagination.totalElements}}

            <v-icon  :disabled="(pagination.pageNumber === 1)" @click="(pagination.pageNumber--,queryData())" >mdi-chevron-left</v-icon>
            page {{pagination.pageNumber}} of {{pagination.totalPages}}
            <v-icon :disabled="(pagination.pageNumber === pagination.totalPages)" @click="(pagination.pageNumber++,queryData())" >mdi-chevron-right</v-icon>
            </template>
            
        </v-data-table> 
        <!-- <div class="text-center" style="font-size: small;">
            <v-pagination 
                    v-model="page"
                    :length="20"
                    :total-visible="7">
                </v-pagination>
                </div>        -->
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
                    <span class="text-h5">{{(LEAVE_CREDIT.id===null)?"Register New Leave Credit":"Update Leave Credit"}}</span>
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
                            label="Employee ID*"
                            :rules="[rules.requiredField,rules.noSpace]"
                            v-model="LEAVE_CREDIT.empId"   
                            @input="generateTRN()"                         
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="TRN id"
                            disabled
                            :rules="[rules.requiredField,rules.noSpace]"
                            v-model="LEAVE_CREDIT.trnId"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Firstname*"
                            :rules="[rules.requiredField]"
                            v-model="LEAVE_CREDIT.firstname"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Middlename"
                            v-model="LEAVE_CREDIT.middlename"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Lastname*"
                            :rules="[rules.requiredField]"
                            v-model="LEAVE_CREDIT.lastname"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-combobox
                             v-model="LEAVE_CREDIT.department"
                             :items="departmentList"
                             label="Department*"
                             :rules="[rules.requiredField,rules.noSpace]"
                            >                                
                            </v-combobox>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Position"
                            v-model="LEAVE_CREDIT.position"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            label="Salary"
                            v-model="LEAVE_CREDIT.salary"
                            :rules="[rules.currency]"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row><v-col
                            cols="12"
                            sm="6"
                            md="4"                            
                        >
                           <v-checkbox style="margin-top: -20px;margin-bottom: -20px;"
                            v-if="LEAVE_CREDIT.id"
                            v-model="update_credits" 
                            label="Update Credits"
                            ></v-checkbox>
                            <b>LEAVE CREDITS EARNED</b></v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                                <v-text-field
                                :disabled="LEAVE_CREDIT.id && !update_credits"
                                label="Total VL Earned"
                                hint="Total Vacation Leave Earned"
                                v-model="LEAVE_CREDIT.totalVlEarned"
                                :rules="[rules.numbers,rules.requiredField]"
                                ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                                <v-text-field
                                :disabled="LEAVE_CREDIT.id && !update_credits"
                                label="Total SL Earned"
                                hint="Total Sick Leave Earned"
                                v-model="LEAVE_CREDIT.totalSlEarned"
                                :rules="[rules.numbers,rules.requiredField]"
                                ></v-text-field>
                            </v-col>  
                            <v-col v-if="LEAVE_CREDIT.id && update_credits">
                                <v-text-field
                                label="Remarks on Update Credits*"
                                hint="example:  Adjustment on entry"
                                persistent-hint
                                v-model="LEAVE_CREDIT.update_credits_remarks"
                                :rules="[rules.requiredField]"
                                ></v-text-field>
                            </v-col>                          
                        </v-row>

                        <v-row>
                            <v-text-field
                                label="Remarks"
                                hint="for new/update value of SL or VL sample: leave credit balance from physical document No. as of date (mm/dd/yyyy)"
                                persistent-hint
                                v-model="LEAVE_CREDIT.remarks"
                                ></v-text-field>
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
                            v-model="LEAVE_CREDIT.code"
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
                            v-model="LEAVE_CREDIT.description"
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
                            v-model="LEAVE_CREDIT.numberOfDays"
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
</div>
</template>

<script>
import API from "@/API/api.js"
export default{
    name:'LeaveCredit',
    data(){
      return  {
        query:{
            code:"",
            description:"",
            },
            listSize: [1,5,10, 25, 50, 100],
            options:{},
          pagination:
                    {totalElements:0,
                    numberOfElements:0,
                    totalPages:0,
                    pageNumber:0,
                    pageSize:5,   // default value
                    },
         leaveCreditList:[],
         table_header:[
        {
          text: "Employee ID",
          value: "empId",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Department",
          value: "department",
        },
        {
          text: "Position",
          value: "position",
        },
        {
          text: "Total VL",
          value: "totalVlEarned",
        },
        {
          text: "Total SL",
          value: "totalSlEarned",
        },
        {
          text: "Last Updated",
          value: "lastUpdated",
        },
        {
          text: "Remarks",
          value: "remarks",
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
        LEAVE_CREDIT:{
            empId:null,
            firstname:null,
            middlename:null,
            lastname:null,
            department:null,
            position:null,
            salary:null,
            VlAmount:null,
            SlAmount:null,
            remarks:null,    
            trnId:null,        
        },
        update_credits:true,
        update_credits_remarks:'',
        departmentList:[],
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
                    this.query.searchValue = this.searchData;
                const response =
                await API.getLeaveCredit(
                    this.query
                );
                console.log("LeaveCredit: ", response);
                if (response.error) {
                // error getting data
                console.log(`${response.error}`);
                this.alert(response.error,'error')
                } else {
                    
                this.leaveCreditList = response.leaveCredits;
                this.pagination.totalPages = response.totalPages;
                this.pagination.numberOfElements = response.numberOfElements;
                this.pagination.totalElements = response.totalElements;
                console.log('ert',this.leaveCreditList)
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

            generateTRN(){
                if(this.LEAVE_CREDIT.id){
                    if(this.LEAVE_CREDIT.id !== this.LEAVE_CREDIT.empId)
                        this.LEAVE_CREDIT.trnId = this.LEAVE_CREDIT.empId+'-'+this.LEAVE_CREDIT.id+'-UPT-'+
                        ((new Date().toISOString().slice(2, 10)).replaceAll('-',''))
                    else     
                        this.LEAVE_CREDIT.trnId = this.LEAVE_CREDIT.empId+'-UPT-'+
                        ((new Date().toISOString().slice(2, 10)).replaceAll('-',''))
                }else{
                    this.LEAVE_CREDIT.trnId = this.LEAVE_CREDIT.empId+'-RGN-'+
                        ((new Date().toISOString().slice(2, 10)).replaceAll('-',''))
                }
            },

        async save(){
                if(this.$refs.formEntry.validate()){
                    // this.alert(this.LEAVE_CREDIT,'success')
                    try {
                        let response;
                        if(!this.LEAVE_CREDIT.id)
                            response = await API.createLeaveCredit(
                            this.LEAVE_CREDIT
                            );
                        else{
                            if(!this.update_credits){
                                delete this.LEAVE_CREDIT.SlAmount;
                                delete this.LEAVE_CREDIT.VlAmount;
                                delete this.LEAVE_CREDIT.update_credits_remarks;
                            }
                            response = await API.updateLeaveCredit(
                            this.LEAVE_CREDIT
                            );
                        }
                        
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
                    this.$refs.formEntry.reset();
                    this.LEAVE_CREDIT = {}
            },

           async getDepartment(){
                try {
                    const response =
                    await API.getDepartments();
                    console.log("departments: ", response);
                    if (response.error) {
                    // error getting data
                    console.log(`${response.error}`);
                    this.alert(response.error,'error')
                    } else {
                    this.departmentList = response.departmenList;
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            
    },
    async mounted(){
        // this.queryData();
        this.getDepartment();
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
        },
        // LEAVE_CREDIT(newState,oldState){
        //     if(oldState.id){
        //         if(newState.empId !== oldState.empId){
        //             console.log(newState)
        //             newState.trnId = newState.empId+'-'
        //         }
        //     }
        // }

    }
}
</script>