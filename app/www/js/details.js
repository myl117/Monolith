var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
var yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0.1,
      borderColor: "#14a44d",
      data: yValues
    }]
  },
  options: {
    layout: {
      padding: {
        left: -10,
        right: 0,
        top: 2,
        bottom: 0
      }
    },
    responsive: true,
    legend: { display: false },
    elements: {
      point: {
        radius: 1
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }]
    }
  }
});
