<template>
  <v-container fluid>
  <v-card style="overflow-y: scroll;height: 90vh;overflow-x: hidden; position: relative;" >
    <div ref="terForm"></div>
    <v-card style="position: sticky;top: 0;z-index: 4;"> 
      <div class="Hcontainer">
        <div class="item"><strong>Faculty:</strong>&nbsp;{{ evaluateeInfo.fullname }}</div>
        <div class="item"><strong>Subject:</strong>&nbsp;{{evaluateeInfo.subjcode??'N/A'}}</div>
        <div class="item"><strong>Time/Day:</strong>&nbsp;{{evaluateeInfo.time??'N/A'}}&nbsp;{{ evaluateeInfo.days }}</div>
        <div class="item"><strong>Section:</strong>&nbsp;{{evaluateeInfo.section??'N/A'}}</div>
      </div>
      <i><strong>Direction:</strong> Please answer all question carefully. Choose the approriate number which corresponds to your honest evaluation.<br>
      Where 10 is the highest.</i>
        <v-row style="margin-top: 0;border: solid;padding: 0;">
        <v-col cols="12">
        <v-row>
          <v-col cols="3" style="text-align: center;padding: 0%;">
            <strong>
                Never
            </strong>
              <br/>
              5            
          </v-col>
          <v-col cols="3" style="text-align: center;padding: 0%;">
            <strong>
              Seldom
            </strong>
            <br/>
            6-7
          </v-col>
          <v-col cols="3" style="text-align: center;padding: 0%;">
            <strong>
              Often
            </strong>
            <br/>
            8-9
          </v-col>
          <v-col cols="3" style="text-align: center;padding: 0%;">
            <strong>
              Always
            </strong>
            <br/>
            10
          </v-col>
        </v-row>
      </v-col>
      </v-row>
    </v-card>    
    <v-card style="margin-top:10px;" v-if="!loading">

      <v-row v-if="$cookies.get('_SID_').eval_type === 'P'">
        <v-expansion-panels focusable v-model="panel" :multiple="!showButton">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-card-title style="font-size: 18px;" :style="{ color: scholarTextColor() }">I. Scholarship</v-card-title>  
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
              <v-col v-for="(item)  in ScholarShipItems" :key="item.qstnNumber" :cols="showButton?'12':'6'" >
                  <v-card  style="margin-bottom: 10px;" >
                  <div  style="display: flex; justify-content: center;">           
                    <v-col cols="10" :style="{ color: itemTextColor(item) }">
                      {{item.qstnNumber}} . &nbsp; {{ item.question }}
                  <v-row class="my-5" >  
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 5 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 5 )?'secondary':'primary'"
                        @click="showButton? toggleScore(5,item.qstnNumber-1):askToGoback()"
                      >
                        5
                      </v-btn>
                    </v-col>    
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 6 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 6 )?'secondary':'primary'"
                        @click="showButton? toggleScore(6,item.qstnNumber-1):askToGoback()"
                      >
                        6
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 7 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 7 )?'secondary':'primary'"
                        @click="showButton? toggleScore(7,item.qstnNumber-1):askToGoback()"
                      >
                        7
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 8 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 8 )?'secondary':'primary'"
                        @click="showButton? toggleScore(8,item.qstnNumber-1):askToGoback()"
                      >
                        8
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 9 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 9 )?'secondary':'primary'"
                        @click="showButton? toggleScore(9,item.qstnNumber-1):askToGoback()"
                      >
                        9
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 10 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 10 )?'secondary':'primary'"
                        @click="showButton? toggleScore(10,item.qstnNumber-1):askToGoback()"
                      >
                        10
                      </v-btn>
                    </v-col>
                  </v-row>
                  
                    </v-col>
                  </div>
                  </v-card>
              </v-col>
            </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-card-title style="font-size: 18px" :style="{ color: personalityTextColor() }">II. Personality</v-card-title>  
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
              <v-col v-for="(item)  in PersonalityItems" :key="item.qstnNumber" :cols="showButton?'12':'6'">
                  <v-card  style="margin-bottom: 10px;" >
                  <div  style="display: flex; justify-content: center;">           
                    <v-col cols="10" :style="{ color: itemTextColor(item) }">
                      {{item.qstnNumber}} . &nbsp; {{ item.question }}
                  <v-row class="my-5" >  
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 5 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 5 )?'secondary':'primary'"
                        @click="showButton? toggleScore(5,item.qstnNumber-1):askToGoback()"
                      >
                        5
                      </v-btn>
                    </v-col>    
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 6 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 6 )?'secondary':'primary'"
                        @click="showButton? toggleScore(6,item.qstnNumber-1):askToGoback()"
                      >
                        6
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 7 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 7 )?'secondary':'primary'"
                        @click="showButton? toggleScore(7,item.qstnNumber-1):askToGoback()"
                      >
                        7
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 8 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 8 )?'secondary':'primary'"
                        @click="showButton? toggleScore(8,item.qstnNumber-1):askToGoback()"
                      >
                        8
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 9 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 9 )?'secondary':'primary'"
                        @click="showButton? toggleScore(9,item.qstnNumber-1):askToGoback()"
                      >
                        9
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 10 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 10 )?'secondary':'primary'"
                        @click="showButton? toggleScore(10,item.qstnNumber-1):askToGoback()"
                      >
                        10
                      </v-btn>
                    </v-col>
                  </v-row>
                  
                    </v-col>
                  </div>
                  </v-card>
              </v-col>
            </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>          

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-card-title style="font-size: 18px" :style="{ color: commitmentTextColor() }">III. Commitment and dedication to Service</v-card-title>  
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
              <v-col v-for="(item)  in commitmentItems" :key="item.qstnNumber" :cols="showButton?'12':'6'">
                  <v-card  style="margin-bottom: 10px;" >
                  <div  style="display: flex; justify-content: center;">           
                    <v-col cols="10" :style="{ color: itemTextColor(item) }">
                      {{item.qstnNumber}} . &nbsp; {{ item.question }}
                  <v-row class="my-5" >  
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 5 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 5 )?'secondary':'primary'"
                        @click="showButton? toggleScore(5,item.qstnNumber-1):askToGoback()"
                      >
                        5
                      </v-btn>
                    </v-col>    
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 6 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 6 )?'secondary':'primary'"
                        @click="showButton? toggleScore(6,item.qstnNumber-1):askToGoback()"
                      >
                        6
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 7 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 7 )?'secondary':'primary'"
                        @click="showButton? toggleScore(7,item.qstnNumber-1):askToGoback()"
                      >
                        7
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 8 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 8 )?'secondary':'primary'"
                        @click="showButton? toggleScore(8,item.qstnNumber-1):askToGoback()"
                      >
                        8
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 9 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 9 )?'secondary':'primary'"
                        @click="showButton? toggleScore(9,item.qstnNumber-1):askToGoback()"
                      >
                        9
                      </v-btn>
                    </v-col>
                    <v-col cols="2" v-if="showButton || ( (item.score??-1) === 10 )">
                      <v-btn 
                        block
                        :color="( (item.score??-1) !== 10 )?'secondary':'primary'"
                        @click="showButton? toggleScore(10,item.qstnNumber-1):askToGoback()"
                      >
                        10
                      </v-btn>
                    </v-col>
                  </v-row>
                  
                    </v-col>
                  </div>
                  </v-card>
              </v-col>
            </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>                    
        </v-expansion-panels>
      </v-row>
      <v-row justify="center" v-else >

          <v-col v-for="(item)  in itemsAtCurrentPage" :key="item.qstnNumber" :cols="showButton?'12':'6'">
              <v-card  style="margin-bottom: 10px;">
                <!-- {{ item.question }}
                <div v-if="Boolean(item.category)">
                  <v-card-title v-if="(((items[index-1]??'').category??'') !== item.category )">
                    {{ item.category }}
                  </v-card-title>
                </div> -->
              <div style="display: flex; justify-content: center;">           
                <v-col cols="10" :style="{ color: itemTextColor(item) }">
                  {{item.qstnNumber}} . &nbsp; {{ item.question }}
              <v-row class="my-5" >  
                <v-col cols="2" v-if="showButton || ( (item.score??-1) === 5 )">
                  <v-btn 
                    block
                    :color="( (item.score??-1) !== 5 )?'secondary':'primary'"
                    @click="showButton? toggleScore(5,item.qstnNumber-1):askToGoback()"
                  >
                    5
                  </v-btn>
                </v-col>    
                <v-col cols="2" v-if="showButton || ( (item.score??-1) === 6 )">
                  <v-btn 
                    block
                    :color="( (item.score??-1) !== 6 )?'secondary':'primary'"
                    @click="showButton? toggleScore(6,item.qstnNumber-1):askToGoback()"
                  >
                    6
                  </v-btn>
                </v-col>
                <v-col cols="2" v-if="showButton || ( (item.score??-1) === 7 )">
                  <v-btn 
                    block
                    :color="( (item.score??-1) !== 7 )?'secondary':'primary'"
                    @click="showButton? toggleScore(7,item.qstnNumber-1):askToGoback()"
                  >
                    7
                  </v-btn>
                </v-col>
                <v-col cols="2" v-if="showButton || ( (item.score??-1) === 8 )">
                  <v-btn 
                    block
                    :color="( (item.score??-1) !== 8 )?'secondary':'primary'"
                    @click="showButton? toggleScore(8,item.qstnNumber-1):askToGoback()"
                  >
                    8
                  </v-btn>
                </v-col>
                <v-col cols="2" v-if="showButton || ( (item.score??-1) === 9 )">
                  <v-btn 
                    block
                    :color="( (item.score??-1) !== 9 )?'secondary':'primary'"
                    @click="showButton? toggleScore(9,item.qstnNumber-1):askToGoback()"
                  >
                    9
                  </v-btn>
                </v-col>
                <v-col cols="2" v-if="showButton || ( (item.score??-1) === 10 )">
                  <v-btn 
                    block
                    :color="( (item.score??-1) !== 10 )?'secondary':'primary'"
                    @click="showButton? toggleScore(10,item.qstnNumber-1):askToGoback()"
                  >
                    10
                  </v-btn>
                </v-col>
              </v-row>
              
                </v-col>
              </div>
              </v-card>
          </v-col>
          <v-pagination  v-model="pageNo" :length="(items.length>20)?5:((items.length>15)?4:3)">
          </v-pagination>
      </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" md="12">
        <v-card class="pa-8">
         <span v-if="!showButton && (!['P'].includes(this.$cookies.get('_SID_').eval_type??'X'))" @click="askToGoback()">
          <v-icon>
            mdi-comment
          </v-icon>
            {{ comment }}
         </span>
          <v-textarea v-else-if="!(['P'].includes(this.$cookies.get('_SID_').eval_type??'X'))" label="Comment:" variant="solo" clearable prepend-inner-icon="mdi-comment" :disabled="!showButton" v-model="comment">
          </v-textarea><br/>
          <v-flex class="d-flex justify-center">
            <input type="text" name="tokenHolder" ref="myInputRef" hidden/>
            <!-- <div 
                :style="!showButton?'visibility:visible':'visibility:hidden'"
                class="g-recaptcha" 
                ref="recaptcha" 
                data-sitekey="6Ld58w8lAAAAAI1-DKsC2mncU6dR9s6imuEchmA2" 
                data-callback="myFunction">              
            </div> -->
            <div>
              <vue-recaptcha    
              :style="!showButton?'visibility:visible':'visibility:hidden'"          
                ref="recaptcha"
                @verify="onCaptchaVerified"
                sitekey="6LeUzJclAAAAAAWNe8EyZGRj7qr8v9_HqjmJzVwg"
              />
            </div>
          </v-flex>
          <v-flex class="d-flex justify-center">
            <v-btn v-if="showButton"
            @click="isCompleteAnswer"
            color="primary"
            >
              Proceed
            </v-btn>
            <v-btn  v-if="!showButton" class="ma-3"
            color="primary"
            @click="submitForm()"
            >
              SUBMIT
            </v-btn>
            <v-btn v-if="!showButton" class="ma-3"
            @click="showButton = !showButton;scrollToTop()"
            color="secondary"
            >
              EDIT
            </v-btn>
          </v-flex>
          <br />
        </v-card>
      </v-col>
    </v-row>
    </v-card>
    <v-container fluid v-else style="display: flex; justify-content: center;">
              <div>
                <v-progress-circular indeterminate size="90"></v-progress-circular>
                <div style="text-align: center; margin-top: 10px;">Loading... please wait</div>
              </div>
            </v-container>
  </v-card>
</v-container>
</template>

<script>
import Vue from 'vue';
import API from '@/API/api'
import Swal from 'sweetalert2'
import VueRecaptcha from 'vue-recaptcha';
// import { VueReCaptcha } from 'vue-recaptcha-v3'

// Vue.use(VueReCaptcha,{siteKey:'6LfK_jQlAAAAAPm9RqR70wq9X2LiVw0SCQ-3kfKh'})

export default {

  metaInfo: {
    script: [
      { src: 'https://www.google.com/recaptcha/api.js', async: true, defer: true },
      {
          type: 'text/javascript',
          innerHTML: `
            function myFunction(token) {
              document.getElementsByName('tokenHolder')[0].value = token;
            }
          `
        }
    ]
  },

  components:{ 
    VueRecaptcha  
  },
  data() {
    return {
      showButton: true,
      items:[],
      category:'',
      headers: [
        { text: 'Subject Code', value: 'qstnNumber' },
      ],
      loading:false,
      evaluateeInfo:{},
      comment:'',
      nullScoreList:[],
      panel:[],
      pageNo:1,
    }
  },
  created(){ 
    this.showButton=true;
  },
  activated(){  
    if(localStorage.getItem('routeParams')===null)
            this.$router.push({ name: 'Dashboard'})
    this.evaluateeInfo = JSON.parse(localStorage.getItem('routeParams'));
    this.queryData();
    this.comment = '';  
  },
  computed:{
        // pageNumb(){
        //   return this.items
        // },
        ScholarShipItems() {
          return this.items.slice(0, 9);
        },
        PersonalityItems() {
          return this.items.slice(9, 14);
        },
        commitmentItems() {
          return this.items.slice(14);
        },
        itemsAtCurrentPage(){
            return this.items.slice((5*(this.pageNo-1)),((5*(this.pageNo-1))+5));
        },
        itemTextColor(){
          return (itemx) => {
            if(this.nullScoreList.length === 0) return 'black';
            let ndx = this.items.some((item) => item.qstnNumber === itemx.qstnNumber && (item.score??null) === null)
            return ndx?'red':'black';
          };
        },
        scholarTextColor(){
          return () => {
            if(this.nullScoreList.length === 0) return 'black';
            let ndx = this.items.some((item) => (item.qstnNumber < 10 ) && (item.score??null) === null)
            return ndx?'red':'black';
          };
        },
        personalityTextColor(){
          return () => {
            if(this.nullScoreList.length === 0) return 'black';
            let ndx = this.items.some((item) => (item.qstnNumber >= 10  &&  item.qstnNumber < 15) && (item.score??null) === null)
            return ndx?'red':'black';
          };
        },
        commitmentTextColor(){
          return () => {
            if(this.nullScoreList.length === 0) return 'black';
            let ndx = this.items.some((item) => (item.qstnNumber >= 15) && (item.score??null) === null)
            return ndx?'red':'black';
          };
        },
        hasToken(){
          try{
            if(!this.$refs.myInputRef.value)
            return false;
            return this.$refs.myInputRef.value !== '';
          }catch{ return false;}
        }
    },
  methods: {
    onCaptchaVerified(response) {
      // console.log('token',response);
      this.$refs.myInputRef.value = response
    },
     submitForm(){      
      // console.log(this.$refs.myInputRef.value); // log the reCAPTCHA response to the console
      if(this.$refs.myInputRef.value === ''){
        Swal.fire({
          title: 'Requires',
          text: 'Please review tick the checkbox',
          icon: 'error'
        })
      }else{
        console.log('items',this.items);
        console.log('info',this.evaluateeInfo);
        console.log('user',Vue.$cookies.get('_SID_'));
        let _user = Vue.$cookies.get('_SID_');
        let _evaluatee = this.evaluateeInfo;
        let _eval = {
                    "facultyId": _evaluatee.facultyid,
                    "subjcode":  _evaluatee.subjcode?.trim(),
                    "section": _evaluatee.section?.trim(),
                    "evalType": _user.eval_type,
                    "sy": _user.sy,
                    "evalid": _user.id,
                    "sem": _user.sem??'0',
                    "q1": this.getScore(1),
                    "q2": this.getScore(2),
                    "q3": this.getScore(3),
                    "q4": this.getScore(4),
                    "q5": this.getScore(5),
                    "q6": this.getScore(6),
                    "q7": this.getScore(7),
                    "q8": this.getScore(8),
                    "q9": this.getScore(9),
                    "q10": this.getScore(10),
                    "q11": this.getScore(11),
                    "q12": this.getScore(12),
                    "q13": this.getScore(13),
                    "q14": this.getScore(14),
                    "q15": this.getScore(15),
                    "q16": this.getScore(16),
                    "q17": this.getScore(17),
                    "q18": this.getScore(18),
                    "q19": this.getScore(19),
                    "q20": this.getScore(20),
                    "q21": this.getScore(21),
                    "q22": this.getScore(22),
                    "comment": this.comment.trim(),
                    "evalDate": new Date(),
                    "insertedBy": null
                }
        this.submitEval(_eval);
      }
    },
    getScore(qNumber){
      qNumber--;
      if(this.items[qNumber]){
        return this.items[qNumber].score??null;
      }
      return null;
    },
    scrollToTop() {
      this.$refs.terForm.scrollIntoView({behavior:'smooth'})
    },    
    askToGoback() {
    Swal.fire({
      title: 'Do you want to change your choices?',
      text: 'Go back to change selection',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go back to edit page!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showButton = true;
        //this.$refs.terForm.scrollIntoView({behavior:'smooth'})
      }
    })
  },
    showDialogReviewScore(){
      Swal.fire({
        title: 'Review',
        text: 'Please review your choices',
        icon: 'info'
      })
      this.panel=[0,1,2];
      this.$refs.terForm.scrollIntoView(true)
    },
    toggleScore(n, index) {
       this.items[index];
       if(this.items[index].score ===null){
          this.items[index].score = n
       }else if (this.items[index].score === n) {        
        this.items[index].score = null
      } else {
        this.items[index].score = n
      }
      this.$forceUpdate()
    },    
    async queryData(){
      try {
        this.loading = true;
                let response = await API.getMyQuestionnaires();
                if (response.error) {
                    console.log(response);                    
                    Swal.fire({
                      icon: 'error',
                      title: response.error.data.statusCode,
                      text: response.error.data.message,
                    })
                } else {
                  this.items = response.items 
                  this.loading = false;
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
                localStorage.removeItem('routeParams');
                this.displaytext='';
            }             
    },
    async submitEval(_eval){
      try {
                let response = await API.saveEval(_eval);
                if (response.error) {
                    console.log(response);                    
                    Swal.fire({
                      icon: 'error',
                      title: response.error.data.statusCode,
                      text: response.error.data.message,
                    })
                } else {
                  Swal.fire({
                    title: 'Saved',
                    text: 'Evaluation successfully submitted!',
                    icon: 'success'
                  }) 
                  this.$router.push({ name: 'Dashboard'})
                  localStorage.removeItem('routeParams');
                  this.showButton=true;
                }
            } catch (error) {
                alert(error)
                console.log(error.message);                
            } 
    },
    isCompleteAnswer(){
      const nullScoreItems = this.items.filter(item => (item.score??'null')==='null');
      this.nullScoreList = nullScoreItems.map(item => item.qstnNumber);

        if(this.nullScoreList.length > 0 ){
          Swal.fire({
          title: 'Requires',
          text: 'Please review item number {'+this.nullScoreList.join(',')+'}',
          icon: 'error'
        })
          return 1;
        }
        
      this.showButton = !this.showButton;this.showDialogReviewScore();
    }
  },
  watch: {
        // whenever question changes, this function will run
        '$route' (to) {
            // Code to run when route changes
            if(to.name === 'terForm'){
              this.evaluateeInfo = JSON.parse(localStorage.getItem('routeParams'));
            }
          },
          pageNo(to){            
            this.scrollToTop()
            if(to === 4)
            this.$refs.terForm.scrollIntoView(true)
          }
        
    }
}
</script>

<style>
.selected {
  background-color: yellow;
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
