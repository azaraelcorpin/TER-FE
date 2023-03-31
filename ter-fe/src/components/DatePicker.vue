<template>
    <div>
        <v-menu v-model="DateMenu" persistent :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field id="DateValue-id" :label="label" prepend-icon="mdi-calendar" :value="DateDisp"  readonly  v-on="on" class="text-field-line-height-10px">
                </v-text-field>
            </template>
            <v-date-picker locale="en-in" v-model="DateValue" no-title >
                <v-btn
                        color="red darken-1"
                        text
                        @click="($emit('on-select',null),((DateDisp = DateValue=''),DateMenu = false))"
                    >
                        Reset
                    </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="DateMenu = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="($emit('on-select',DateValue),((DateDisp = DateValue),DateMenu = false))"
                >
                    OK
                </v-btn>
            </v-date-picker>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'DatePicker',
    props:{
        label:String,
        DateVal:Date
    },          
    data: () => ({
        DateMenu:false,
        DateValue:"",
        DateDisp:"",
    }),
    activated(){     
        let formattedDate = (this.DateVal)?this.DateVal.toISOString().substring(0, 10):null;    
        this.DateDisp = formattedDate??"";
        this.DateValue=this.DateDisp;
        this.DateMenu=false;
    },
    created(){
        let formattedDate = (this.DateVal)?this.DateVal.toISOString().substring(0, 10):null;    
        this.DateDisp = formattedDate??"";
        this.DateValue=this.DateDisp;
        this.DateMenu=false;
    }
}
</script>
<style>
.v-input .v-label {
    height: 22px;
    line-height: 20px;
    letter-spacing: normal;
    font-size: 12px;
}
.v-text-field input label {
    flex: 1 1 auto;
    line-height: 30px;
    padding: 8px 0 8px;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    font-size: 12px;
}

</style>