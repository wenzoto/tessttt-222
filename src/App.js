import React from "react";
import { SpiderChartF } from "./SpiderChartF";
import data001 from "./test.json";
import { SpiderChartF2 } from "./test/SpiderChartF2";

let data = [
  [
    { axis: "Minutos por partido", value: 23.4 },
    { axis: "Puntos por partido", value: 12.34 },
    { axis: "T2P%", value: 45.32 },
    { axis: "T3P%", value: 33.45 },
    { axis: "TL%", value: 78.34 },
    { axis: "eTC%", value: 56.34 },
    { axis: "TS%", value: 65.34 }
  ],
  [
    { axis: "Minutos por partido", value: 21.4 },
    { axis: "Puntos por partido", value: 8.21 },
    { axis: "T2P%", value: 42.92 },
    { axis: "T3P%", value: 38.35 },
    { axis: "TL%", value: 72.34 },
    { axis: "eTC%", value: 52.34 },
    { axis: "TS%", value: 60.34 }
  ]
];

export default function App() {
  return (
      <>
        <SpiderChartF2 data={ data001 }/>
        {/*<SpiderChartF data={ data }/>*/}
    {/*<SpiderChart*/}
    {/*  language="es"*/}
    {/*  data={data}*/}
    {/*  title="COMPARATIVA JUGADORA - RESTO DE LA LIGA"*/}
    {/*  legendOptions={["Jugadora", "Liga"]}*/}
    {/*/>*/}
      </>
  );
}
