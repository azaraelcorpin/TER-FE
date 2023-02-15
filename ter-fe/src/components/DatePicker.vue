<template>
    <div>
        <v-menu v-model="storageStartDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field id="StorageStartDate-id" :label="label" prepend-icon="mdi-calendar" :value="storageStartDateDisp"  readonly  v-on="on" class="text-field-line-height-10px">
                </v-text-field>
            </template>
            <v-date-picker locale="en-in" v-model="storageStartDate" no-title >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="storageStartDateMenu = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="(((storageStartDateDisp = storageStartDate),storageStartDateMenu = false),$emit('on-select',storageStartDate))"
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
        label:String
    },          
    data: () => ({
        storageStartDateMenu:false,
        storageStartDate:"",
        storageStartDateDisp:"",
    }),
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