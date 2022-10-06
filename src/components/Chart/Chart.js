import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Chart({values}) {
    const datas = Object.entries(values)
    // console.log(datas);
    const labels = datas.map(data=>data[0])
    const vals = datas.map(data=>data[1].Metric.Value)
    // console.table(vals);

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend:{display: false}
        },
        scales:{
            x:{
                grid: {
                    display: false
                }
            },
            y:{
                grid: {
                display: false
            }
        }
        }
      };
  const data={
    labels: labels,
    datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132,0)',
        data: vals,
    }]
  }
  
    return (
    <Bar data={data} options={options}/>
  )
}
