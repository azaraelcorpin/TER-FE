<template>
<div id="chart">
    <h1 class="ml-5">Faculty rate participants</h1>
        <VueApexCharts v-if="chart"  height="350" :options="chartOptions" :series="series"></VueApexCharts>
      </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';
import API from '@/API/api';
export default{
    name:'ChartVue',
    components:{
        VueApexCharts,
    },
    data(){
        return{
          chart:true,
          
          series: [{
            name: 'Unrated',
            data: [1, 1, 1]
          }, {
            name: 'Participated',
            data: [2, 2, 2]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -5,
                  offsetY: 0
                }
              }
            }],
            xaxis: {
              categories: ['Student', 'Peer', 'Head'
              ],
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'right',
              offsetX: 0,
              offsetY: 50
            },
          },
          
          
        };
    },
    mounted(){
      console.log('series',this.series)
        this.queryData()
    },
    created(){//this.queryData()
    },
    methods:{
        async queryData(){
            this.chart=false
            let response = await API.getChartData();
            let part = response.DataChart[0];
            console.log(part);  
            let studentParticipated = part.studentrated;
            let studentUnparticipated = part.totalstudent - studentParticipated;
            let peerParticipated = part.peerrated;
            let peerUnarticipated = part.totalfaculty - peerParticipated;
            let headParticipated = part.headrated;
            let headUnparticipated = 1 - headParticipated;
            let partV = [studentParticipated,peerParticipated,headParticipated];
            let unpartV = [studentUnparticipated,peerUnarticipated,headUnparticipated];
            this.series[1].data = partV;
            this.series[0].data = unpartV;
            console.log('series1',this.series)
            this.chart=true
            },
    }

}
</script>