<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <canvas ref="myChart"></canvas>
    <v-data-table>
    <table style="border: solid black 2px; margin-left: auto; margin-right: auto;">
      <thead>
        <tr>
          <th style="border: solid black 2px; margin-left: auto; margin-right: auto;">Event:</th>
          <td v-for="i in label" style="border: solid black 2px; margin-left: auto; margin-right: auto; text-align: center; width: 17%;">{{i}} </td>
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