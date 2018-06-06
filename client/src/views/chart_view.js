const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class Chart {
  constructor(view) {
    this.view = view;
  }

  bindEvents(){
    this.setupChartListener();
  }
  //Listening till the chart_data model publishes all data then populate the chart
  setupChartListener(){
    PubSub.subscribe('ChartData-all-data-ready', (evt) => {
      this.createChart(evt.detail)
    });
  }
  // Create the chart by accessing the X and Y axis data from the Chart_data model.
  createChart(data) {
    const chartContainer = document.querySelector('#chart-container');

    const title = document.createElement('h1');
    title.textContent = 'Price of Gold'
    const description = document.createElement('p')
    description.textContent = 'This is a long long description'

    chartContainer.appendChild(title);
    chartContainer.appendChild(description);

    const  displayContainer = document.createElement('div');
    chartContainer.appendChild(displayContainer)


    const myChart = Highcharts.chart(displayContainer, {
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: data.xAxis
      },
      title: {
        text: 'Gold Prices By Daily Price Movements'
      },
      plotOptions: {
        series: {
          allowPointSelect: true
        }
      },
      series: [{
        name: 'Prices',
        data: data.yAxis
      }]
    });


  };
}

module.exports = Chart;
