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
  ResponsiveContainer
} from "recharts";
import {Table} from "reactstrap";


const SENSOR_DATA = gql`
  query($pacient: String! ) {
    getMeasures(patient: $pacient) {
      sensors {
        averagePressureS
        maxPressureS
        minPressureS
      },
      date,
      duration
    }
  }
`;
export default function MeasuresWidget(props) {
  //const [sensorNumber] = useState(0);
  const { loading, error, data } = useQuery(SENSOR_DATA, {
    variables: {
    pacient: ""+`${props.pacient}`},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
 const { measures = [] } = {measures: data.getMeasures};
console.log("hello")
 console.log(data);

  return (
    <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
             <th scope="col">Date</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Average pressure 1</th>
              <th scope="col">Minimum pressure 1</th>
              <th scope="col">Maximum pressure 1</th>
              <th scope="col">Average pressure 2</th>
              <th scope="col">Minimum pressure 2</th>
              <th scope="col">Maximum pressure 2</th>
              <th scope="col">Average pressure 3</th>
              <th scope="col">Minimum pressure 3</th>
              <th scope="col">Maximum pressure 3</th>
              <th scope="col">Average pressure 4</th>
              <th scope="col">Minimum pressure 4</th>
              <th scope="col">Maximum pressure 4</th>
              <th scope="col">Average pressure 5</th>
              <th scope="col">Minimum pressure 5</th>
              <th scope="col">Maximum pressure 5</th>
          </tr>
        </thead>
        <tbody>
          {measures.length ? (
            measures.map(measure => (
              <tr>
                <th scope="row">{measure.date}</th>
                <td>{measure.duration ? (measure.duration) : ("None specified") }</td>
                <td>{measure.sensors[0].averagePressureS}</td>
                <td>{measure.sensors[0].minPressureS}</td>
                <td>{measure.sensors[0].maxPressureS}</td>
                <td>{measure.sensors[1].averagePressureS}</td>
                <td>{measure.sensors[1].minPressureS}</td>
                <td>{measure.sensors[1].maxPressureS}</td>
                <td>{measure.sensors[2].averagePressureS}</td>
                <td>{measure.sensors[2].minPressureS}</td>
                <td>{measure.sensors[2].maxPressureS}</td>
                <td>{measure.sensors[3].averagePressureS}</td>
                <td>{measure.sensors[3].minPressureS}</td>
                <td>{measure.sensors[3].maxPressureS}</td>
                <td>{measure.sensors[4].averagePressureS}</td>
                <td>{measure.sensors[4].minPressureS}</td>
                <td>{measure.sensors[4].maxPressureS}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>NO DATA</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </Table>
  );
}

/*    <Table className="align-items-center table-flush" responsive>
    <thead className="thead-light">
    <tr>
    <th scope="col">Date</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Average pressure 1</th>
    <th scope="col">Minimum pressure 1</th>
    <th scope="col">Maximum pressure 1</th>
    <th scope="col">Average pressure 2</th>
    <th scope="col">Minimum pressure 2</th>
    <th scope="col">Maximum pressure 2</th>
    <th scope="col">Average pressure 3</th>
    <th scope="col">Minimum pressure 3</th>
    <th scope="col">Maximum pressure 3</th>
    <th scope="col">Average pressure 4</th>
    <th scope="col">Minimum pressure 4</th>
    <th scope="col">Maximum pressure 4</th>
    <th scope="col">Average pressure 5</th>
    <th scope="col">Minimum pressure 5</th>
    <th scope="col">Maximum pressure 5</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <th scope="row">11/01/2020</th>
    <td>10</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    </tr>
    <tr>
    <th scope="row">11/01/2020</th>
    <td>10</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    </tr>
    <tr>
    <th scope="row">11/01/2020</th>
    <td>10</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    </tr>
    <tr>
    <th scope="row">11/01/2020</th>
    <td>10</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    <td>12</td>
    </tr>
    </tbody>
    </Table>
    */