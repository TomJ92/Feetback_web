import React, { Component } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';




// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import Anomaly from "components/Anomaly/Anomaly.js";
import PatientsModal from "components/Modals/PatientsModal.js"
import DeletePatientsModal from "components/Modals/DeletePatientsModal.js"
import { Redirect } from "react-router";
import { useState } from "react";

const PACIENTS_INFO = gql`
query($podiatrist: ID!){
  getPacients(podiatrist: $podiatrist) {
    status
    message
    pacients {
      id
      name
      lastname
      email
      lastMeetingDate
      currentPodiatrist
      anomaly
      anomaly_threshold
    }
  }
}
`;
//QUERY TO UPDATE A PATIENT USER WITH IS ID AND THE FIELD TO CHANGE
const UPDATE_PATIENT = gql`
mutation($patient: ID!, $change: UserUpdateInput!) {
  updateUser(user: $patient, change: $change) {
    status
    message
  }
}
`;
const SENSOR_DATA = gql`
  mutation($pacient: String! ) {
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
export default function TabWidget() {
  let info = JSON.parse(localStorage.getItem("CURRENT_USER"));
  console.log(info);
  const [exampleModal, setExampleModal] = useState(false);
  function toggleModal() {
    setExampleModal(!exampleModal);
  };
  const { loading, error, data } = useQuery(PACIENTS_INFO, {
    variables: {
      podiatrist: ""+`${info.id}`},
    });
  const history = useHistory();
  const [updatePatient] = useMutation(UPDATE_PATIENT);
  const [getMeasures_data] = useMutation(SENSOR_DATA);

  if (loading) return <p>Loading...</p>;
  if (error || data.status==false) return <p>Error :(</p>;


    const { pacients = [] } = {pacients: data.getPacients.pacients};
    const information = {
      columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'E-mail',
        field: 'email',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Last meeting date',
        field: 'lastMeetingDate',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Anomaly',
        field: 'anomaly',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Options',
        field: 'options',
        sort: 'asc',
        width: 200
      }
      ],
      rows: pacients
    };
    function compare( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }
    function getSensorsData(patientId)
    {
    };
    function changeAnomaly(patientId, anomaly_state)
    {
      if (patientId==null){
        toggleModal()
      }
      if(typeof anomaly_state == "boolean"){
        try {
          updatePatient({
            variables: {
              patient: patientId,
              change: {anomaly: anomaly_state}
            }
          }).then(
          data => {
            if (
              data == undefined ||
              data.data == undefined ||
              data.data.updateUser == undefined ||
              !data.data.updateUser.status
              ) {


              console.log(data.data.updateUser.message);


          } else {
            console.log("donde");
          }
        },
        error => {
          console.log("error ", error);
        }
        );
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    function square(nombre) {
      return nombre * nombre;
    }
    function anomaly_check(){
      pacients.map(pacient => {
        console.log("anomaly_check patient")
        console.log(pacient);
        console.log(pacient.id);
        let count_anomaly = 0;
        if (pacient.id==null){
        toggleModal()
      }
        try {
          getMeasures_data({
            variables: {
              pacient: pacient.id,
            }
          }).then(
          data => {
            if (
              data == undefined ||
              data.data == undefined ||
              data.data.getMeasures == undefined
              ) {

              console.log("data message getSensorsData")
              console.log(data.data.getMeasures);
              //return "ok1";


          } else {
            console.log("donde_measures_data");
            console.log(data.data.getMeasures);
            var measures_patient = data.data.getMeasures;
            console.log("avant tri");
            console.log(measures_patient);
            measures_patient.sort(compare);
            console.log("après tri");
            console.log(measures_patient);
            if(measures_patient.length>0)
            {
              const number_measure_patient = measures_patient.length-1;
              console.log("number");
              console.log(number_measure_patient);
              let sensor_1_first_measure=measures_patient[0].sensors[0].averagePressureS;
              console.log("capteur_1");
              console.log(sensor_1_first_measure);
              let sensor_2_first_measure=measures_patient[0].sensors[1].averagePressureS;
              let sensor_3_first_measure=measures_patient[0].sensors[2].averagePressureS;
              let sensor_4_first_measure=measures_patient[0].sensors[3].averagePressureS;
              let sensor_5_first_measure=measures_patient[0].sensors[4].averagePressureS;
              console.log("capteurs");
              console.log(sensor_1_first_measure);
              console.log(sensor_2_first_measure);
              console.log(sensor_3_first_measure);
              console.log(sensor_4_first_measure);
              console.log(sensor_5_first_measure);

              ///Get the values of the sensors pressure of the last measure

              let sensor_1_last_measure=measures_patient[number_measure_patient].sensors[0].averagePressureS;
              let sensor_2_last_measure=measures_patient[number_measure_patient].sensors[1].averagePressureS;
              let sensor_3_last_measure=measures_patient[number_measure_patient].sensors[2].averagePressureS;
              let sensor_4_last_measure=measures_patient[number_measure_patient].sensors[3].averagePressureS;
              let sensor_5_last_measure=measures_patient[number_measure_patient].sensors[4].averagePressureS;
              console.log("capteurs_fin");
              console.log(sensor_1_last_measure);
              console.log(sensor_2_last_measure);
              console.log(sensor_3_last_measure);
              console.log(sensor_4_last_measure);
              console.log(sensor_5_last_measure);

              ///Perform the following formula for each sensor to know the percentage difference : Math.sqrt(square((first measure - last measure)/first measure)*100))

              

              //For each sensor, create a boolean that is true if the formula is equal or larger than the anomaly threshold



              let sensor_1_anomaly = Math.sqrt(square(((sensor_1_first_measure - sensor_1_last_measure)/sensor_1_first_measure)*100))  >= pacient.anomaly_threshold;
              let sensor_2_anomaly = Math.sqrt(square(((sensor_2_first_measure - sensor_2_last_measure)/sensor_2_first_measure)*100))  >= pacient.anomaly_threshold;
              let sensor_3_anomaly = Math.sqrt(square(((sensor_3_first_measure - sensor_3_last_measure)/sensor_3_first_measure)*100))  >= pacient.anomaly_threshold;
              let sensor_4_anomaly = Math.sqrt(square(((sensor_4_first_measure - sensor_4_last_measure)/sensor_4_first_measure)*100))  >= pacient.anomaly_threshold;
              let sensor_5_anomaly = Math.sqrt(square(((sensor_5_first_measure - sensor_5_last_measure)/sensor_5_first_measure)*100))  >= pacient.anomaly_threshold;


              console.log("anomalies");
              console.log(sensor_1_anomaly);
              console.log(sensor_2_anomaly);
              console.log(sensor_3_anomaly);
              console.log(sensor_4_anomaly);
              console.log(sensor_5_anomaly);
              //Create a counter and increment it for each sensor anomaly

              if(sensor_1_anomaly)
              {
                count_anomaly++;
                console.log("incrémentation 1");
              }
              if(sensor_2_anomaly)
              {
                count_anomaly++;
                console.log("incrémentation 2");
              }
              if(sensor_3_anomaly)
              {
                count_anomaly++;
                console.log("incrémentation 3");
              }
              if(sensor_4_anomaly)
              {
                count_anomaly++;
                console.log("incrémentation 4");
              }
              if(sensor_5_anomaly)
              {
                count_anomaly++;
                console.log("incrémentation 5");
              }

              //If the counter is two or more : we have an overall anomaly so we need to update the user anomaly field to true

              if(count_anomaly>=2)
              {
                changeAnomaly(pacient.id, true);
                console.log("ANOMALIE!");
              }
              //In the other case, the user anomaly field is false
              else
              {
                changeAnomaly(pacient.id, false);
                console.log("PAS D'ANOMALIE!");
              }
            }
          }
        },
        error => {
          console.log("ERROR DATA getSensorsData")
          console.log("error ", error);
          //return "ok3";
        }
        );
        } catch (error) {
          console.log("OTHER ERROR DATA getSensorsData")
          console.log(error.message);
          //return "ok4";
        }
            });
    };

    function PatientProfile(pacient)
    {

      localStorage.removeItem("CURRENT_PATIENT");
      localStorage.setItem("CURRENT_PATIENT", JSON.stringify(pacient));
      history.push("/admin/patientProfile", { patientId: pacient.id, podiatrist: "1", name: pacient.name, lastname: pacient.lastname, lastMeetingDate: pacient.lastMeetingDate, email: pacient.email, anomaly_threshold: pacient.anomaly_threshold})
    };
    function PatientRecord(pacient)
    {
      history.push("/admin/patient", { pacient: pacient.id });
      localStorage.removeItem("CURRENT_PATIENT");
      localStorage.setItem("CURRENT_PATIENT", JSON.stringify(pacient));
    };

  // const history = useHistory()
  // const handleButtonClick = (event) => {
  //   history.push(event.target.value)
  // }

  function createDicDatatables(data) {
    var allPacients = []
    if(data.length){
      data.map(pacient=> {
        var temp = {}
        temp["name"] = <><a href="" onClick={() => PatientRecord(pacient)}> {pacient.name + " " + pacient.lastname}</a></>
        temp["email"] = pacient.email
        temp["lastMeetingDate"] = pacient.lastMeetingDate ? (pacient.lastMeetingDate) : ("None")
        temp["anomaly"] = <Anomaly val={pacient.anomaly}> Last Measure anomaly to put here</Anomaly>
        temp["options"] = <><Button onClick={() => PatientProfile(pacient)}>Go to profile</Button> <DeletePatientsModal patientId={pacient.id}></DeletePatientsModal></>

        allPacients.push(temp)
      })
    }
    information.rows = allPacients
    return information

  }
  console.log(createDicDatatables(pacients));

  return (
  <>
  <Card className="shadow">
  <CardHeader className="border-0">
  <Row className="align-items-center">
  <div className="col">
  <h3 className="mb-0">List of patients</h3>
  </div>
  <Col>
  <PatientsModal></PatientsModal>
  <Button color="primary" type="button" onClick={() => anomaly_check()}>
        Check for anomalies
      </Button>

  </Col>
  </Row>
  </CardHeader>

  <Table className="align-items-center table-flush" responsive>
  <thead className="thead-light">
  <tr>
  <th scope="col">Name</th>
  <th scope="col">E-mail</th>
  <th scope="col">Last meeting date</th>
  <th scope="col">Anomaly</th>
  <th scope="col">Anomaly threshold </th>
  <th scope="col">Patient's profile</th>
  </tr>
  </thead>
  <tbody>
  {pacients.length ? (
    pacients.map(pacient => (
    <tr>
    <th scope="row"><a href="" onClick={() => PatientRecord(pacient)}> {pacient.name + " " + pacient.lastname}</a></th>
    <td>{pacient.email}</td>
    <td>{pacient.lastMeetingDate ? (pacient.lastMeetingDate) : ("None") }</td>
    <td>
    <Anomaly val={pacient.anomaly}></Anomaly>
    </td>
    <td> {pacient.anomaly_threshold}%</td>
    <td>
    <Button
    onClick={() => PatientProfile(pacient)}
    >
    Go to profile
    </Button>
    </td>
    <td>
    <DeletePatientsModal patientId={pacient.id}></DeletePatientsModal>
    </td>

    </tr>
    ))
    ) : (
    <tr>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    </tr>
    )}
    </tbody>
    </Table>
    </Card>
    </>
    );
  }
