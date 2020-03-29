/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import sendMail from "../../components/Mail.js"


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import DeletePatientsModal from "components/Modals/DeletePatientsModal.js";
//QUERY TO UPDATE A PATIENT USER WITH IS ID AND THE FIELD TO CHANGE
  const UPDATE_PATIENT = gql`
  mutation($patient: ID!, $change: UserUpdateInput!) {
    updateUser(user: $patient, change: $change) {
      status
      message
    }
  }
`;

export default function PatientsProfile (props){
  var info = props.location.state;
  const [exampleModal, setExampleModal] = useState(false);
  const [updatePatient] = useMutation(UPDATE_PATIENT);
  console.log(info);
  function toggleModal() {
    setExampleModal(!exampleModal);
  }
  //RETURN DATE IN THE DESIRED FORMAT
  function getCurrentDateTime(dateSeparateSymbol: string = '-') {
        const dateTime = new Date();
        let dateDay: string = formatWithTwoDigits(String(dateTime.getDate()));
        let month: string = formatWithTwoDigits(String(dateTime.getMonth() + 1));

        let hour : string = formatWithTwoDigits(String(dateTime.getHours()));
        let minutes : string = formatWithTwoDigits(String(dateTime.getMinutes()));
        let seconds : string = formatWithTwoDigits(String(dateTime.getSeconds()));

        return `${dateTime.getFullYear()}${dateSeparateSymbol}${month}${dateSeparateSymbol}${dateDay} ${hour}:${minutes}:${seconds}`;
    }

    function formatWithTwoDigits(value: number | string) {
        if (+value < 10) {
            return `0${value}`;
        }
        return String(value);
    }
    //UPDATE SENSORS POSITION ON THE FOOT
    function updateSensors()
    {

    }
  const date_today = getCurrentDateTime();
 function updateToday(patientId){
    if (info.id !==null || patientId==null){
      toggleModal()
    }
    try {
        updatePatient({
        variables: {
          patient: patientId,
          change: {lastMeetingDate: date_today}
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
            console.log("donde")
           window.location.reload();
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
  console.log(info)
  if(info == undefined || info.podiatrist == undefined || info.patientId == undefined)
    return (<> 
    
        <UserHeader title={"Error while loading info, go back to dashboard"} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            </Col>
            </Row>
            </Container>
    </>);
    let infoPodiatrist= JSON.parse(localStorage.getItem("CURRENT_USER"));
    let emailMessage = `Hello ${info.name} ${info.lastname}, your podiatrist ${infoPodiatrist.name} ${infoPodiatrist.lastname} that you last saw on ${info.lastMeetingDate? info.lastMeetingDate: "None"} think that you need to schedule a appointment with him. \n Have a good day, \n\n Feetback application.`

    return (
      <>
        <UserHeader title={`Welcome to ${info.name} ${info.lastname}  profile`} body={"Here you can register the last meeting for your patient and change the sensors' position on his foot.  "} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="patient_logo"
                          className="rounded-circle"
                          src={require("assets/img/theme/patient.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 mb-5">
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>
                      {info.name} {info.lastname}
                      <span className="font-weight-light"></span>
                    </h3>
                    <hr className="my-4" />
                    <p>
                      <b>Email :</b> <a href="">{info.email}</a>
                    </p>
                    <Button
                      color="default"
                      onClick={() => sendMail(info.email, infoPodiatrist.email, "Schedule a meeting soon!", emailMessage)}
                      size="sm"
                    >
                      Schedule a meeting
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Informations</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-datetime"
                            >
                              Last meeting took place on:
                            </label>
                            <Input
                              type="datetime"
                              name="input-datetime"
                              disabled
                              value={info.lastMeetingDate? info.lastMeetingDate: "None"}
                              id="exampleDatetime"
                              placeholder="datetime placeholder"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Button
                            className="mt-4"
                        color="primary"
                        onClick={() => updateToday(info.patientId)}
                            >
                              Update to today
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      <Col lg="10">
                      <p>Put on the foot mapping the sensors position</p>
                      <div>
                      <img
                          alt="foot_mapping"
                          src={require("assets/img/theme/foot.png")}
                          class="position-sticky w-50 p-3"
                        />
                      <img
                          alt="foot_mapping"
                          src={require("assets/img/theme/circle-1.png")}
                          class="position-relative"
                          width="40em"
                          height="40em"
                          />
                           <img
                          alt="foot_mapping"
                          src={require("assets/img/theme/circle-2.png")}
                          class="inner-image"
                          width="40em"
                          height="40em"
                          />
                           <img
                          alt="foot_mapping"
                          src={require("assets/img/theme/circle-3.png")}
                          class="inner-image"
                          width="40em"
                          height="40em"
                          />
                           <img
                          alt="foot_mapping"
                          src={require("assets/img/theme/circle-4.png")}
                          class="inner-image"
                          width="40em"
                          height="40em"
                          />
                           <img
                          alt="foot_mapping"
                          src={require("assets/img/theme/circle-5.png")}
                          class="inner-image"
                          width="40em"
                          height="40em"
                          />
                          </div>
                        <table cellpadding="10em">
                        <tbody>
                        <tr>
                        <td><Button
                            className="mt-4"
                        color="primary"
                        onClick={() => updateSensors(info.patientId)}
                            >
                              Save sensors location
                            </Button></td>
                            <td><Button
                            className="mt-4"
                        color="primary"
                        onClick={() => updateSensors(info.patientId)}
                            >
                              Change foot mapping image
                            </Button></td>
                        </tr>
                        </tbody>
                        </table>
                      </Col>
                      </Row>
                    </div>
                    {/* Address */}
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }


