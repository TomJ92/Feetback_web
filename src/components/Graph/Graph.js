//Librairies
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

//gql request to get every measures of a patient with the id of the patient
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
//Obtain sensors data, put them in an array and return them
function getSensorNData(data, sensorNumber) {
  var arr = [];
  //if there is data and a sensor number
  if (data!==undefined && sensorNumber!==undefined){
    //get every measures
    data.getMeasures.forEach(read => {
      arr.push({Pressure: read.sensors[sensorNumber].averagePressureS});
    });
  }
  return arr;
}
//class
export default function Widget1(props) {
  //const [sensorNumber] = useState(0);
  // get the measures with the id patient passed in props
  const { loading, error, data } = useQuery(SENSOR_DATA, {
    variables: {
      pacient: ""+`${props.pacient}`},
    });
  //Loading and error displayed
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    
    
  //const personne = this.props.WidgetData;
  console.log(props.sensorNumber)
  console.log(getSensorNData(data, props.sensorNumber))
  //get sensor data for a defined sensor number
  let parseData = getSensorNData(data, props.sensorNumber)
  return (
    //display data with the array containing every measures for a sensor, indicate a referenceLine with the first measure
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
