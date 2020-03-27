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
//QUERY TO UPDATE A PATIENT USER WITH IS ID AND THE FIELD TO CHANGE
  const UPDATE_PODIATRIST = gql`
  mutation($podiatrist: ID!, $change: UserUpdateInput!) {
    updateUser(user: $podiatrist, change: $change) {
      status
      message
    }
  }
`;

export default function Profile(props)
{
  const history = useHistory();
  let info = JSON.parse(localStorage.getItem("CURRENT_USER"));
  console.log(info);
  var email=info.email;
  var password=info.password;
  var confirmpassword=info.password;
  var name=info.name;
  var lastname=info.lastname;
  /*
  this.handleEmailChange= this.handleEmailChange.bind(this);
  this.handleSubmit= this.handleSubmit.bind(this);
  this.handlePasswordChange= this.handlePasswordChange.bind(this);
  this.handleFirstNameChange= this.handleFirstNameChange.bind(this);
  this.handleLastNameChange= this.handleLastNameChange.bind(this);
  this.handleConfirmPasswordChange= this.handleConfirmPasswordChange.bind(this);
  */

  const [exampleModal, setExampleModal] = useState(false);
  const [updatePodiatrist] = useMutation(UPDATE_PODIATRIST);
  function toggleModal() {
    setExampleModal(!exampleModal);
  }

  function changeEmail(podiatristID){
    if (info.id !==null || podiatristID==null){
      toggleModal()
    }
    try {
        updatePodiatrist({
        variables: {
          podiatrist: podiatristID,
          change: {email: email}
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
  };
  function changeName(podiatristID){};
  function changeLastName(podiatristID){};
  function changePassword(podiatristID){};
  
 /* const enabled =
          email.length > 0 &&
          password.length > 0 &&
          name.length > 0 &&
          lastname.length > 0 &&
          password == confirmpassword;  
  */
  function handleEmailChange(evt){
    email=evt.target.value;
    console.log("Email change");
    console.log(email);
  };
  
  function handlePasswordChange(evt){
    password=evt.target.value;
    console.log("Password change");
    console.log(password);
  };

  function handleFirstNameChange(evt){
    name= evt.target.value;
    console.log("First name change");
    console.log(name);
  };
  
  function handleLastNameChange(evt){
    lastname=evt.target.value;
    console.log("Last name change");
    console.log(lastname);
  };

  function handleConfirmPasswordChange(evt){
    confirmpassword = evt.target.value;
    console.log("Confirm password change");
    console.log(confirmpassword);
  };
  
  function handleSubmit(){
    const { email, name, lastname, password, confirmpassword } = this.state;
    console.log("Submmit change");
  };
    return (
      <>
        <UserHeader />
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
                          src={require("assets/img/theme/doctor.png")}
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
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">My account</h3>
                    </Col>                    
                  </Row>
                </CardHeader>
                
                <CardBody>
                  <Form /*onSubmit={this.handleSubmit}*/>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              type="email"
                              defaultValue = {info.email}
                              onChange={handleEmailChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                       <Button 
                        color="primary"
                        href="#pablo"
                        onClick={() => changeEmail(email, info.id)}
                        //disabled={!enabled}
                        size="sm">
                        Change email
                        </Button>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              defaultValue ={info.name}
                              type="text"
                              onChange={handleFirstNameChange}
                            />
                          </FormGroup>
                          <Button 
                        color="primary"
                        href="#pablo"
                        onClick={changeName}
                        onChaneg
                        //disabled={!enabled}
                        size="sm">
                        Change name
                        </Button>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              defaultValue={info.lastname}
                              type="text"  
                              onChange={handleLastNameChange}    
                            />
                          </FormGroup>
                          <Button 
                        color="primary"
                        href="#pablo"
                        onClick={changeLastName}
                        onChaneg
                        //disabled={!enabled}
                        size="sm">
                        Change last name
                        </Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              defaultValue={info.password}
                              type="password"
                              onChange={handlePasswordChange}
                            />
                          </FormGroup>
                          <Button 
                        color="primary"
                        href="#pablo"
                        onClick={changePassword}
                        onChaneg
                        //disabled={!enabled}
                        size="sm">
                        Change password
                        </Button>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              defaultValue={info.password}
                              type="password"
                              onChange={handleConfirmPasswordChange}
                            />
                          </FormGroup> 
                        </Col>
                       
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }