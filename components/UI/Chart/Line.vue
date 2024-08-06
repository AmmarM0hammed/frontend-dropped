<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
  const ctx = document.getElementById('myChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 15, 15, 16, 14, 12],
          borderWidth: 2,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true, // Fill the area under the line
          tension: 0.4, // Smooth lines
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: false, // Hide y-axis grid lines
            },
            ticks: {
              display: false, // Hide y-axis labels
            },
          },
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
            ticks: {
              display: false, // Hide x-axis labels
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
      },
    });
  }





  const ctx2 = document.getElementById('myChart2');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 2, 15, 16, 14, 1],
          borderWidth: 2,
          borderColor: 'rgba(5, 5, 235, 1)',
          backgroundColor: 'rgba(5, 5, 235, 0.2)',
          fill: true, // Fill the area under the line
          tension: 0.4, // Smooth lines
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: false, // Hide y-axis grid lines
            },
            ticks: {
              display: false, // Hide y-axis labels
            },
          },
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
            ticks: {
              display: false, // Hide x-axis labels
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
      },
    });
  }
  
  const ctx3 = document.getElementById('myChart3');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 2, 23, 16, 14, 1],
          borderWidth: 2,
          borderColor: 'rgba(255, 5, 20, 1)',
          backgroundColor: 'rgba(255, 5, 20, 0.2)',
          fill: true, // Fill the area under the line
          tension: 0.4, // Smooth lines
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: false, // Hide y-axis grid lines
            },
            ticks: {
              display: false, // Hide y-axis labels
            },
          },
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
            ticks: {
              display: false, // Hide x-axis labels
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
      },
    });
  }
  const ctx4 = document.getElementById('myChart4');
  if (ctx4) {
    new Chart(ctx4, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [0, 5, 25, 5, 1],
          borderWidth: 2,
          borderColor: '#000',
          backgroundColor: 'rgba(25, 25, 20, 0.2)',
          fill: true, // Fill the area under the line
          tension: 0.4, // Smooth lines
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: false, // Hide y-axis grid lines
            },
            ticks: {
              display: false, // Hide y-axis labels
            },
          },
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
            ticks: {
              display: false, // Hide x-axis labels
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
      },
    });
  }


});
</script>

<template>
  <br>
  <div class="flex flex-row justify-evenly">
    <div class="bg-white w-fit  items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

      <canvas id="myChart" class="w-24"></canvas>
      <div class="flex flex-col justify-center items-center ">
        <p>نسبة</p>
        <p class="font-semibold">50%</p>
      </div>
    </div>
    <div class="bg-white w-fit  items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

      <canvas id="myChart2" class="w-24"></canvas>
      <div class="flex flex-col justify-center items-center ">
        <p>نسبة</p>
        <p class="font-semibold">50%</p>
      </div>
    </div>
    <div class="bg-white w-fit  items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

      <canvas id="myChart3" class=" max-w-24 max-h-24"></canvas>
      <div class="flex flex-col justify-center items-center ">
        <p>نسبة</p>
        <p class="font-semibold">50%</p>
      </div>
    </div>
    <div class="bg-white w-fit  items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

      <canvas id="myChart4" class="w-24"></canvas>
      <div class="flex flex-col justify-center items-center ">
        <p>نسبة</p>
        <p class="font-semibold">50%</p>
      </div>
    </div>
  </div>
</template>
<style>



</style>