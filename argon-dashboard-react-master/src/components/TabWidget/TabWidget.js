import React, { Component } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { useQuery } from "@apollo/react-hooks";
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
      }
    }
  }
`;


export default function TabWidget() {
  let info = JSON.parse(localStorage.getItem("CURRENT_USER"));
  console.log(info)
  const { loading, error, data } = useQuery(PACIENTS_INFO, {
    variables: {
      podiatrist: ""+`${info.id}`},
  });
  const history = useHistory();

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


  // const history = useHistory()
  // const handleButtonClick = (event) => {
  //   history.push(event.target.value)
  // }

  function createDicDatatables(data) {
    var allPacients = []
     if(data.length){
      data.map(pacient=> {
        var temp = {}
        temp["name"] = <><a href="" onClick={() => history.push("/admin/patient", { pacient: pacient.id })}> {pacient.name + " " + pacient.lastname}</a></>
        temp["email"] = pacient.email
        temp["lastMeetingDate"] = pacient.lastMeetingDate ? (pacient.lastMeetingDate) : ("None") 
        temp["anomaly"] = <Anomaly val={false}> Last Measure anomaly to put here</Anomaly>
        temp["options"] = <><Button onClick={() => history.push("/admin/patientProfile", { patientId: pacient.id, podiatrist: "1", name: pacient.name, lastname: pacient.lastname, lastMeetingDate: pacient.lastMeetingDate, email: pacient.email})}>Go to profile</Button> <DeletePatientsModal patientId={pacient.id}></DeletePatientsModal></>
        
       allPacients.push(temp)
     })
    }
    information.rows = allPacients
    return information
      
  }
  console.log(createDicDatatables(pacients))

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

          </Col>
        </Row>
      </CardHeader>

      <MDBDataTable className="m-4"
      striped
      bordered
      hover
      data={createDicDatatables(pacients)}
    />

      
    </Card>
    </>
  );
}
