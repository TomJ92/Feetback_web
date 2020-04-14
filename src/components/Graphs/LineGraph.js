//Libraries
import React, { Component } from 'react'
import Chart from "chart.js";
//import classes from "./LineGraph.module.css";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class LineGraph extends Component {
    chartRef = React.createRef();
    //if the component is displayed
    componentDidMount() {
        this.buildChart();
        console.log(this.props.data);
    }
    //if the value changed
    componentDidUpdate() {
        this.buildChart();
    }
    //create a chart using the data assigned
    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                
                datasets: [
                {
                    label: "Sales",
                    data: data,
                    fill: false,
                    borderColor: "#6610f2"
                },
                {
                    label: "National Average",
                    data: average,
                    fill: false,
                    borderColor: "#E0E0E0"
                }
                ]
            },
            options: {
                //Customize chart options

            }
        });
    }

    render() {
        return (
            <div >
            <canvas
            id="myChart"
            ref={this.chartRef}
            />
            </div>
            )
    }
}