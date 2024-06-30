<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
    const ctx = document.getElementById('myChart5');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [23, 2, 15, 16, 14, 12],
            borderWidth: 2,
            borderColor: 'rgba(107, 168, 255, 1)',
            backgroundColor: 'rgba(107, 168, 255, 0.2)',
            fill: true, // Fill the area under the line
            tension: 0.4, // Smooth lines
          },
          {
            label: 'Dataset 2',
            data: [3, 2, 23, 5, 2, 23],
            borderWidth: 2,
            borderColor: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            fill: true, // Fill the area under the line
            tension: 0.4, // Smooth lines
          },
        ],
      },
      options: {
        responsive: true, // Make chart responsive
        maintainAspectRatio: true, // Full width chart
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true, // Hide y-axis grid lines
            },
            ticks: {
              display: true, // Hide y-axis labels
            },
          },
          x: {
            grid: {
              display: true, // Hide x-axis grid lines
            },
            ticks: {
              display: true, // Hide x-axis labels
            },
          },
        },
        plugins: {
          legend: {
            display: true, // Hide legend
          },
        },
      },
    });
}

const ctx2 = document.getElementById('myChart6');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 15, 15, 16, 14, 12],
            borderWidth: 2,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true, // Fill the area under the bars
            borderRadius: 5, // Smooth bars
            barPercentage: 0.5, // Adjust bar width
            categoryPercentage: 0.5, // Adjust bar width within each category
          },
        ],
      },
      options: {
        responsive: true, // Make chart responsive
        maintainAspectRatio: false, // Full width chart
        scales: {
          y: {
            beginAtZero: true,
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

  const ctx3 = document.getElementById('myChart7');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 15, 15, 16, 14, 12],
            borderWidth: 2,
            borderColor: 'rgba(255, 107, 107, 1)',
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            fill: true, // Fill the area under the bars
            borderRadius: 5, // Smooth bars
            barPercentage: 0.5, // Adjust bar width
            categoryPercentage: 0.5, // Adjust bar width within each category
          },
        ],
      },
      options: {
        responsive: true, // Make chart responsive
        maintainAspectRatio: false, // Full width chart
        scales: {
          y: {
            beginAtZero: true,
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
    <div class="flex flex-row gap-5 justify-evenly">
      
        <div class="bg-white relative w-fit flex-1 h-full   items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

            <canvas id="myChart5" class="!w-[750px]"></canvas>
            <div class="flex flex-col justify-center items-center ">
              
            </div>
        </div>
        <div class="flex flex-col h-full  w-96 gap-5 items-center">
            <div class="bg-white w-96 h-52   items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

                <canvas id="myChart6" class="max-w-64"></canvas>
                <div class="flex flex-col justify-center items-center ">
                    <p>نسبة</p>
                    <p class="font-semibold">50%</p>
                </div>
            </div>
            <div class="bg-white w-96  h-52    items-center flex flex-row gap-5 p-3 rounded-2xl jui-shadow">

                <canvas id="myChart7" class="max-w-64"></canvas>
                <div class="flex flex-col justify-center items-center ">
                    <p>نسبة</p>
                    <p class="font-semibold">50%</p>
                </div>
            </div>
        </div>

    </div>
</template>
