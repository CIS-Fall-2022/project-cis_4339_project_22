<template>
  <main>
    <!--Welcome Title-->
    <div>
      <h3 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h3>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Attendees From Last Two Months</h1>
    </div>
    <!--Bar chart that shows events from the last two months from today's date-->
    <canvas ref="myChart"></canvas>
    <!--Table that shows events from the last two months from today's dat-->
    <v-data-table>
    <table class="table table-dark" style="border: solid black 2px; margin-left: auto; margin-right: auto; box-shadow: 6px 6px 3px #999;">
      <thead>
        <tr>
          <th style="border: solid black 2px; margin-left: auto; margin-right: auto; width:15%;">Event:</th>
          <td v-for="i in label" style="border: solid black 2px; margin-left: auto; margin-right: auto; text-align: center;">{{i}} </td>
        </tr>
        <tr>
          <th style="border: solid black 2px; margin-left: auto; margin-right: auto;"># of Attendes:</th>
          <td v-for="e in chartData" style="border: solid black 2px; margin-left: auto; margin-right: auto; text-align: center;">{{e}}</td>
        </tr>
      </thead>
    </table>
    </v-data-table>
</main>
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  //Calling chart data from chartView from view folder and putting it in bar chart
  async mounted() {
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Attendees",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
            data: this.chartData
          },
        ],
      },
      //Styling the bar chart
      options: {
        layout: {
            padding: {
                left: 55,
                top: 20,
                right: 55,
                bottom: 100
            }
        },
        responsive: true,
        scales: {
            y: {
                min: 0
            }
        }
      }
      
    });

  },
};
</script>