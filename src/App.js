import React from "react";
import data001 from "./test.json";
import { SpiderChartF2 } from "./test/SpiderChartF2";

export default function App() {
  return (
      <>
        <SpiderChartF2 data={ data001 }/>
      </>
  );
}
