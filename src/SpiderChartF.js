import React, { useEffect } from "react";
import { RadarChart, RadarChart2 } from "./RadarChart";

export const SpiderChartF = ({ data }) => {
    useEffect(() => {
        // RadarChart.draw("#container-1", data);
    }, []);

    return (
        <div>
            <div id={ "container-1" } />
            <RadarChart2
                data={ data }
                id={ "#container-1" }
            />
        </div>
    );
};
