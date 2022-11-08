import React, { Component } from "react";
import * as d3 from "d3";
import { RadarChart } from "./RadarChart";

class SpiderChart extends Component {
  state = {
    loaded: true,
    HEIGHT: 500,
    maxValue: 0.6,
    levels: 6,
    colorscale: d3.scaleOrdinal(d3.schemeCategory10)
  };

  componentDidMount() {
    this.setState(
      {
        WIDTH: document.querySelector("#container-1").getBoundingClientRect()
          .width
      },
      () => {
        let canvas = this.setCanvas();
        RadarChart.draw("#container-1", this.props.data);
        this.setLegend(
          this.props.title,
          this.props.legendOptions,
          this.state.colorscale
        );
      }
    );
  }

  setCanvas(canvas) {
    // Add the visualization svg canvas to the container <div>
    let svg = d3
      .select("#container-1")
      .append("svg")
      .style("background-color", "#354560")
      .style("color", "#FFFFFF") //With this we've got the color of the axis too
      .attr("height", this.state.HEIGHT)
      .attr("width", this.state.WIDTH);

    return svg;
  }

  setLegend(title, legendOptions, colorscale) {
    let canvas = d3
      .select("#legend")
      .append("svg")
      //.style("background-color", "#354560")
      .attr("width", this.state.WIDTH)
      .attr("height", 100);

    //Create the title for the legend
    canvas
      .append("text")
      .style("background-color", "red")
      .attr("class", "title")
      .attr("transform", "translate(90,5)")
      .attr("x", 10)
      .attr("y", 22)
      .attr("font-size", "12pt")
      .attr("fill", "#000000")
      .text(title)
      //.style("text-anchor", "end")
      .style("font-family", "roboto")
      .style("font-weight", "bold");

    //Initiate Legend
    let legend = canvas
      .append("g")
      .attr("class", "legend")
      .attr("height", 100)
      .attr("width", 200)
      .attr("transform", "translate(90,20)");

    //Create colour squares
    legend
      .selectAll("rect")
      .data(legendOptions)
      .enter()
      .append("rect")
      .attr("x", 10)
      .attr("y", function (d, i) {
        return i * 20 + 20;
      })
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function (d, i) {
        return colorscale(i);
      });
    //Create text next to squares
    legend
      .selectAll("text")
      .data(legendOptions)
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", function (d, i) {
        return i * 20 + 30;
      })
      .attr("font-size", "11pt")
      .attr("fill", "#000000")
      .text(function (d) {
        return d;
      })
      .style("font-family", "roboto");
  }

  render() {
    return (
      <div>
        <div id="legend" />
        <div id={"container-1"} />
      </div>
    );
  }
}

module.exports.SpiderChart = SpiderChart;
