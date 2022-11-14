import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

let dataValues = [];
const cfg = {
    radius: 5,
    w: 400,
    h: 400,
    factor: 1,
    factorLegend: .85,
    levels: 10,
    maxValue: 0,
    radians: 2 * Math.PI,
    opacityArea: 0.5,
    ToRight: 5,
    TranslateX: 80,
    TranslateY: 30,
    ExtraWidthX: 400,
    ExtraWidthY: 100,
    color: d3.scaleOrdinal(d3.schemeCategory10),
};

export const RadarChart2 = ({ data, id, maxValue, allAxis }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        initChart();

        return () => { destroyChart(); };
    }, []);

    const destroyChart = () => {

    };

    const initChart = () => {
        cfg.maxValue = maxValue;

        const total = allAxis.length;
        const radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
        const Format = d3.format(".0%");

        const g = d3
            .select(id)
            .append("svg")
            .attr("width", 100 + "%")
            .attr("height", cfg.h + cfg.ExtraWidthY)
            .append("g")
            .attr("transform", `translate(${cfg.TranslateX},${cfg.TranslateY})`);

        let tooltip;

        //Circular segments
        for (let j = 0; j < cfg.levels - 1; j++) {
            const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);

            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", (d, i) => levelFactor * (1 - cfg.factor * Math.sin((i * cfg.radians) / total)))
                .attr("y1", (d, i) => levelFactor * (1 - cfg.factor * Math.cos((i * cfg.radians) / total)))
                .attr("x2", (d, i) => levelFactor * (1 - cfg.factor * Math.sin(((i + 1) * cfg.radians) / total)))
                .attr("y2", (d, i) => levelFactor * (1 - cfg.factor * Math.cos(((i + 1) * cfg.radians) / total)))
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", `translate(${(cfg.w / 2 - levelFactor)},${(cfg.h / 2 - levelFactor)})`);
        }

        //Text indicating at what % each level is
        for (let j = 0; j < cfg.levels; j++) {
            const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);

            g.selectAll(".levels")
                .data([ 1 ]) //dummy data
                .enter()
                .append("svg:text")
                .attr("x", d => levelFactor * (1 - cfg.factor * Math.sin(0)))
                .attr("y", d => levelFactor * (1 - cfg.factor * Math.cos(0)))
                .attr("class", "legend")
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .attr("transform", `translate( ${(cfg.w / 2 - levelFactor + cfg.ToRight)}, ${(cfg.h / 2 - levelFactor)})`)
                .attr("fill", "#737373")
                .text( Format((j+1)*(maxValue / data[0].totalCount) / cfg.levels) );
        }

        let series = 0;

        const axis = g
            .selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis
            .append("line")
            .attr("x1", cfg.w / 2)
            .attr("y1", cfg.h / 2)
            .attr("x2", (d, i) => (cfg.w / 2) * (1 - cfg.factor * Math.sin((i * cfg.radians) / total)))
            .attr("y2", (d, i) => (cfg.h / 2) * (1 - cfg.factor * Math.cos((i * cfg.radians) / total)))
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis
            .append("text")
            .attr("class", "legend")
            .text(d => d)
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", (d, i) => "translate(0, -10)")
            .attr("x", (d, i) => {
                return (
                    (cfg.w / 2)
                    * (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total))
                    - 60 * Math.sin((i * cfg.radians) / total)
                );
            })
            .attr("y", (d, i) => {
                return (
                    (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total))
                    - 20 * Math.cos((i * cfg.radians) / total)
                );
            });

        data.forEach((y, x) => {
            dataValues = [];

            g.selectAll(".nodes").data(y.data, (j, i) => {
                dataValues.push([
                    (cfg.w / 2)
                    * (1
                        - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue)
                        * cfg.factor
                        * Math.sin((i * cfg.radians) / total)
                    ),
                    (cfg.h / 2)
                    * (1
                        - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue)
                        * cfg.factor
                        * Math.cos((i * cfg.radians) / total)
                    ),
                ]);
            });

            dataValues.push(dataValues[0]);

            g.selectAll(".area")
                .data([ dataValues ])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie" + series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points", d => {
                    let str = "";

                    for (let pti = 0; pti < d.length; pti++) {
                        str = str + d[pti][0] + "," + d[pti][1] + " ";
                    }

                    return str;
                })
                .style("fill", (j, i) => cfg.color(series))
                .style("fill-opacity", cfg.opacityArea)
                .on("mouseover", (arr, inx, el) => {
                    const className = `polygon.${d3.select(el[0]).attr("class")}`;

                    g.selectAll("polygon").transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(className).transition(200)
                        .style("fill-opacity", 0.7);
                })
                .on("mouseout", () => {
                    g.selectAll("polygon").transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });

            series++;
        });

        series = 0;


        data.forEach((y, x) => {
            g.selectAll(".nodes")
                .data(y.data)
                .enter()
                .append("svg:circle")
                .attr("class", `radar-chart-serie${series}`)
                .attr("r", cfg.radius)
                .attr("alt", j => j.value || 0)// Math.max(j.value, 0)
                .attr("cx", (j, i) => {
                    dataValues.push([
                        (cfg.w / 2)
                        * (1
                            - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue)
                            * cfg.factor
                            * Math.sin((i * cfg.radians) / total)
                        ),
                        (cfg.h / 2)
                        * (1
                            - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue)
                            * cfg.factor
                            * Math.cos((i * cfg.radians) / total)
                        ),
                    ]);
                    return (
                        (cfg.w / 2)
                        * (1
                            - (Math.max(j.value, 0) / cfg.maxValue)
                            * cfg.factor
                            * Math.sin((i * cfg.radians) / total)
                        )
                    );
                })
                .attr("cy", (j, i) => {
                    return (
                        (cfg.h / 2)
                        * (1
                            - (Math.max(j.value, 0) / cfg.maxValue)
                            * cfg.factor
                            * Math.cos((i * cfg.radians) / total)
                        )
                    );
                })
                .attr("data-id", ({ axis }) => axis)
                .style("fill", cfg.color(series))
                .style("fill-opacity", 0.9)
                .on("mouseover", (d, inx, elements) => {
                    const element = d3.select(elements[inx]);
                    const newX = parseFloat(element.attr("cx")) - 10;
                    const newY = parseFloat(element.attr("cy")) - 5;

                    tooltip
                        .attr("x", newX)
                        .attr("y", newY)
                        .text(Format(d.value/data[0].totalCount))
                        .transition(200)
                        .style("opacity", 1);

                    const className = `polygon.${element.attr("class")}`;

                    g.selectAll("polygon").transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(className).transition(200)
                        .style("fill-opacity", 0.7);
                })
                .on("mouseout", () => {
                    tooltip.transition(200).style("opacity", 0);
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                })
                .append("svg:title")
                .text(j => {
                    return 'Point count: ' + j.value +'\n'+ 'Category: ' +y?.label+'\n'+ 'Category ' + y?.forTooltip;
                });

            series++;
        });


        //Tooltip
        tooltip = g
            .append("text")
            .style("opacity", 0)
            .style("font-family", "sans-serif")
            .style("font-size", "13px");
    };

    return (
        <div> test </div>
    );
};
