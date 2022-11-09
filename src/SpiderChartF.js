import React, { useEffect } from "react";
import { RadarChart } from "./RadarChart";

export const SpiderChartF = ({ data }) => {
    useEffect(() => {
        RadarChart.draw("#container-1", data);
    }, []);

    return (
        <div>
            <div id={ "container-1" } />
        </div>
    );
};
