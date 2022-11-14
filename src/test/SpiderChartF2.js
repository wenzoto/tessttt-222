import React from "react";
import { RadarChart2 } from "./RadarChart2";

export const SpiderChartF2 = ({ data }) => {

    const twoDimension = (data) => {

        let fieldRegistry = {};
        let chartData = [];
        let labels = [];
        let matFunc ="count" //$scope.gadget.contentSettings.function;
        let labelGetter;
        let maxValue = 0;
        let allAxis = [];



        data.items.forEach(function(obj) {
            if (obj.items && obj.items.length) {
                obj.items.forEach(function(item) {
                    if (!fieldRegistry[item.id]) {
                        fieldRegistry[item.name] = {}
                    }

                    fieldRegistry[item.name][obj.id] = item['count']
                    maxValue = maxValue > item['count'] ? maxValue : item['count'];
                    allAxis = [item.name, ...allAxis]
                })
            }
        });

        allAxis = [...new Set(allAxis)]
console.log('---------data---------', data)
        data.items.forEach(function(obj) {
            // var color = self.colors.find(obj.id);
            if (obj.items.length) {
                var chartDataObj =
                    {
                        'id': obj.id,
                        'label': labelGetter?.getValue(labels, obj.id, 'legend') || obj.name || "No value", ///obj.name,
                        'data': [],
                        'color': '#fff',//color && color.value || npsColorService.getColor(obj.type),
                        'forTooltip': matFunc + ': ' + obj[matFunc],
                        'totalCount': data.count
                    };

                for (var item in fieldRegistry) {
                    if (!fieldRegistry[item][obj.id]) {
                        chartDataObj.data.push({'axis': item, value: 0})
                    } else {
                        chartDataObj.data.push({'axis': item, value: fieldRegistry[item][obj.id]})
                    }
                }
                chartData.push(chartDataObj)
            }
        });

        return {
            data: chartData,
            maxValue,
            allAxis
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
