import React, { Component } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from 'react-router-dom';




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
import { Redirect } from "react-router";

const PACIENTS_INFO = gql`
  query {
    getPacients(podiatrist: "1") {
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

  // const history = useHistory()
  // const handleButtonClick = (event) => {
  //   history.push(event.target.value)
  // }
  return (
    <>
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">List of patients</h3>
            <Form className="mt-4 mb-5 mb-xl-0 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </div>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Last meeting date</th>
            <th scope="col">Anomaly</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {pacients.length ? (
            pacients.map(pacient => (
              <tr>
                <th scope="row"><a href="" onClick={() => history.push("/admin/patient", { pacient: pacient.id })}> {pacient.name + " " + pacient.lastname}</a></th>
                <td>{pacient.email}</td>
                <td>{pacient.lastMeetingDate ? (pacient.lastMeetingDate) : ("None") }</td>
                <td>
                  <Anomaly val={false}> Last Measure anomaly to put here</Anomaly>
                </td>
                <td>
                  <Button
                  onClick={() => history.push("/admin/patientProfile", { patientId: pacient.id, podiatrist: "1", name: pacient.name, lastname: pacient.lastname, lastMeetingDate: pacient.lastMeetingDate, email: pacient.email})}
                  >
                    Go to profile
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
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
