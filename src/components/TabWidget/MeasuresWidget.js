  import React, { PureComponent } from "react";
  import { useState } from 'react';
  import { useQuery } from "@apollo/react-hooks";
  import { MDBDataTable } from "mdbreact";
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

  //gql query to get the measures of a patient with its id
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
    //assigned query to user with props.pacient is the patient id
    const { loading, error, data } = useQuery(SENSOR_DATA, {
      variables: {
      pacient: ""+`${props.pacient}`},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    //get every measures
   const { measures = [] } = {measures: data.getMeasures};
  console.log("hello")
   console.log(data);
   //defined the labels for the table of measures
       const information = {
        columns: [
        {
          label: "Date",
          field: "date",
          sort: "asc",
          width: 270
        },
        {
          label: "Duration",
          field: "duration",
          sort: "asc",
          width: 150
        },
        {
          label: "Average pressure 1",
          field: "sensor_1_average",
          sort: "asc",
          width: 200
        },
        {
          label: "Minimum pressure 1",
          field: "sensor_1_min",
          sort: "asc",
          width: 200
        },
        {
          label: "Maximum pressure 1",
          field :"sensor_1_max",
          sort: "asc",
          width : 200
        },
        {
          label: "Average pressure 2",
          field: "sensor_2_average",
          sort: "asc",
          width: 200
        },
        {
          label: "Minimum pressure 2",
          field: "sensor_2_min",
          sort: "asc",
          width: 200
        },
        {
          label: "Maximum pressure 2",
          field :"sensor_2_max",
          sort: "asc",
          width : 200
        },
        {
          label: "Average pressure 3",
          field: "sensor_3_average",
          sort: "asc",
          width: 200
        },
        {
          label: "Minimum pressure 3",
          field: "sensor_3_min",
          sort: "asc",
          width: 200
        },
        {
          label: "Maximum pressure 3",
          field :"sensor_3_max",
          sort: "asc",
          width : 200
        },
        {
          label: "Average pressure 4",
          field: "sensor_4_average",
          sort: "asc",
          width: 200
        },
        {
          label: "Minimum pressure 4",
          field: "sensor_4_min",
          sort: "asc",
          width: 200
        },
        {
          label: "Maximum pressure 4",
          field :"sensor_4_max",
          sort: "asc",
          width : 200
        },
        {
          label: "Average pressure 5",
          field: "sensor_5_average",
          sort: "asc",
          width: 200
        },
        {
          label: "Minimum pressure 5",
          field: "sensor_5_min",
          sort: "asc",
          width: 200
        },
        {
          label: "Maximum pressure 5",
          field :"sensor_5_max",
          sort: "asc",
          width : 200
        }
        ],
        rows: measures
      };
      //add measure to the table
      function createDicDatatables(data) {
      var allMeasures = []
      if(data.length){
        //for each measure add information to the table at the right position : date, duration, max pressure, min pressure and average pressure
        data.map(measure=> {
          var temp = {}
          temp["date"] = measure.date
          temp["duration"] = measure.duration ? (measure.duration) : ("None specified")
          temp["sensor_1_average"] = measure.sensors[0].averagePressureS
          temp["sensor_1_min"] = measure.sensors[0].minPressureS
          temp["sensor_1_max"]= measure.sensors[0].maxPressureS
          temp["sensor_2_average"] = measure.sensors[1].averagePressureS
          temp["sensor_2_min"] = measure.sensors[1].minPressureS
          temp["sensor_2_max"]= measure.sensors[1].maxPressureS
          temp["sensor_3_average"] = measure.sensors[2].averagePressureS
          temp["sensor_3_min"] = measure.sensors[2].minPressureS
          temp["sensor_3_max"]= measure.sensors[2].maxPressureS
          temp["sensor_4_average"] = measure.sensors[3].averagePressureS
          temp["sensor_4_min"] = measure.sensors[3].minPressureS
          temp["sensor_4_max"]= measure.sensors[3].maxPressureS
          temp["sensor_5_average"] = measure.sensors[4].averagePressureS
          temp["sensor_5_min"] = measure.sensors[4].minPressureS
          temp["sensor_5_max"]= measure.sensors[4].maxPressureS

          allMeasures.push(temp)
        })
      }
      information.rows = allMeasures
      return information

    };
    return (
      <MDBDataTable responsive
            className="m-4"
            striped
            bordered
            hover
            data={createDicDatatables(measures)}
          />
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