import React, { PureComponent } from "react";
import { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";


const SENSOR_DATA = gql`
  query($pacient: String! ) {
    getMeasures(patient: $pacient) {
      sensors {
        averagePressureS
        maxPressureS
        minPressureS
      }
    }
  }
`;

function getSensorNData(data, sensorNumber) {
  var arr = [];
  if (data!==undefined && sensorNumber!==undefined){
    data.getMeasures.forEach(read => {
      arr.push({Pressure: read.sensors[sensorNumber].averagePressureS});
    });
}
  return arr;
}

export default function Widget1(props) {
  //const [sensorNumber] = useState(0);
  const { loading, error, data } = useQuery(SENSOR_DATA, {
    variables: {
    pacient: ""+`${props.pacient}`},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  
  //const personne = this.props.WidgetData;
  console.log(props.sensorNumber)
  console.log(getSensorNData(data, props.sensorNumber))
  let parseData = getSensorNData(data, props.sensorNumber)
  return (
    <ResponsiveContainer aspect="2">
      <LineChart
        data={parseData}
        margin={{
          top: 0,
          right: 3,
          left: -30,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <ReferenceLine y={parseData[0].Pressure} label="Reference" stroke="#8884d8" strokeDasharray="5 5" ></ReferenceLine>
        <Line
          type="monotone"
          dataKey="Pressure"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
