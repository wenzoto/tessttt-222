import React from "react";
import { RadarChart2 } from "./RadarChart2";

export const SpiderChartF2 = ({ data }) => {

    const twoDimension = ({ items, count }) => {

        let fieldRegistry = {};
        let chartData = [];
        let labels = [];
        let matFunc = "count" //$scope.gadget.contentSettings.function;
        let labelGetter;
        let maxValue = 0;

        items.forEach((obj) => {
                obj?.items?.forEach((item) => {

                    fieldRegistry[item.name] = {
                        ...fieldRegistry[item.name],
                        [obj.id]: item['count']
                    }

                    maxValue = maxValue > item['count']
                        ? maxValue
                        : item['count'];
                })
        });

        items.forEach((obj) => {
            if (obj.items.length) {
                let chartDataObj = {
                        'id': obj.id,
                        'label': labelGetter?.getValue(labels, obj.id, 'legend') || obj.name || "No value", ///obj.name,
                        'data': [],
                        'color': '#fff',//color && color.value || npsColorService.getColor(obj.type),
                        'forTooltip': matFunc + ': ' + obj[matFunc],
                        'totalCount': count
                    };

                for (let item in fieldRegistry) {

                    chartDataObj.data.push({
                        'axis': item,
                        value: !fieldRegistry[item][obj.id] ? 0 : fieldRegistry[item][obj.id]
                    })

                }

                chartData.push(chartDataObj)
            }
        });

        return {
            data: chartData,
            maxValue,
            allAxis: chartData[0].data.map(({axis}) => axis)
        }


    }

    return (
        <div>
            <div id={ "container-1" } />
            <RadarChart2
                { ...twoDimension(data) }
                id={ "#container-1" }
            />
        </div>
    );
};
