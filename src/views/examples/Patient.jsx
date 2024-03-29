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
  // node.js library that concatenates classes (strings)
  import classnames from "classnames";
  // javascipt plugin for creating charts
  import Chart from "chart.js";
  import { useState } from 'react';
  import { useHistory } from 'react-router-dom';

  // react plugin used to create charts
  import { Line, Bar } from "react-chartjs-2";
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

  // core components
  import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
  } from "variables/charts.jsx";

  import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
  } from "reactstrap";
  import Anomaly from "components/Anomaly/Anomaly.js";
  import Header from "components/Headers/Header.jsx";
  import Graph from "components/Graph/Graph.js";
  import MainGraph from "components/Graph/MainGraph.js"
  import MeasuresWidget from "components/TabWidget/MeasuresWidget";
  import sendMail from "../../components/Mail.js";
  import Anomaly_sensor from "components/Anomaly/Anomaly_sensor.js";
  //Patient view page for data of the patient overtime
  export default function Patient (props){
    const history = useHistory();
    //get the current patient informations
    var info = JSON.parse(localStorage.getItem("CURRENT_PATIENT"));
    const [value, setValue] = useState(-1);
    const [show5Graphs, setShow5Graphs] = useState(false);
    console.log("The value is")
    console.log(value)
    let infoPodiatrist= JSON.parse(localStorage.getItem("CURRENT_USER"));
    //go to profile function
    function onData()
    {

      history.push("/admin/patientProfile", { patientId: info.id, podiatrist: info.currentPodiatrist, name: info.name, lastname: info.lastname, lastMeetingDate: info.lastMeetingDate, email: info.email, anomaly_threshold: info.anomaly_threshold})
    };
    //email message to pass on
    let emailMessage = `Hello ${info.name} ${info.lastname}, your podiatrist ${infoPodiatrist.name} ${infoPodiatrist.lastname} that you last saw on ${info.lastMeetingDate? info.lastMeetingDate: "None"} think that you need to schedule a appointment with him. \n Have a good day, \n\n Feetback application.`

    if(props.location.state==null)
      return(
        <>
        <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <Row className="mt-5">
      <Col className="mb-5 mb-xl-0" xl="6"></Col>
      <p>Wrong access, return to the patients list</p> 
      </Row>
      </Container>

      </>);
      return (
      <>
      <Header />
    {/* Page content */}
    <Container className="mt--7" fluid>
    <Row className ="text-right">
    <Col></Col>
    <Col> <span class="h1 mb-0 text-white text-right">{info.name} {info.lastname}</span></Col>
    <Col><Button
    onClick={() => onData()}
    size ="xl"
    >
    Go to patient's profile
    </Button></Col>
    <Col className="text-right">
    <Button
    onClick={() => setShow5Graphs(!show5Graphs)}
    >
    {(show5Graphs)? "Show main graph": "Show 5 sensors graphs" }
    </Button>
    </Col>
    <Col><Button
    onClick={() => sendMail(info.email, infoPodiatrist.email, "Schedule a meeting soon!", emailMessage)}
    >
    Schedule a meeting
    </Button></Col>
    </Row>
    <Row></Row> 
    <Row className="mt-5">

    {(show5Graphs)?  
      <>
      <Col className="mb-5 mb-xl-0" xl="6">
      <Card className="bg-gradient-default shadow">

      <CardHeader className="bg-transparent">

      <Row className="align-items-center">
      <div className="col">
      <h6 className="text-uppercase text-light ls-1 mb-1">
      Sensor 1
      </h6>
      <h2 className="text-white mb-0">Pressure values</h2>
      </div>
      <div className="col">
      </div>
      </Row>

      </CardHeader>

      <CardBody>
    {/* Chart */}

    <Graph sensorNumber={0} pacient={ props.location.state.pacient} ></Graph>

    </CardBody>

    </Card>

    </Col>
    <Col className="mb-5 mb-xl-0" xl="6">
    <Card className="bg-gradient-default shadow">
    <CardHeader className="bg-transparent">
    <Row className="align-items-center">
    <div className="col">
    <h6 className="text-uppercase text-light ls-1 mb-1">
    Sensor 2
    </h6>
    <h2 className="text-white mb-0">Pressure values</h2>
    </div>

    </Row>
    </CardHeader>
    <CardBody>
  {/* Chart */}

  <Graph sensorNumber={1} pacient={ props.location.state.pacient} ></Graph>

  </CardBody>
  </Card>
  </Col>

  <Col className="mb-5 mb-xl-0" xl="6">
  <Card className="bg-gradient-default shadow">
  <CardHeader className="bg-transparent">
  <Row className="align-items-center">

  <div className="col">
  <h6 className="text-uppercase text-light ls-1 mb-1">
  Sensor 3
  </h6>
  <h2 className="text-white mb-0">Pressure values</h2>
  </div>

  </Row>

  </CardHeader>

  <CardBody>
  {/* Chart */}

  <Graph sensorNumber={2} pacient={ props.location.state.pacient} ></Graph>

  </CardBody>

  </Card>
  </Col>  


  <Col className="mb-5 mb-xl-0" xl="6">
  <Card className="bg-gradient-default shadow">
  <CardHeader className="bg-transparent">
  <Row className="align-items-center">
  <div className="col">
  <h6 className="text-uppercase text-light ls-1 mb-1">
  Sensor 4
  </h6>
  <h2 className="text-white mb-0">Pressure values</h2>
  </div>                    
  </Row>
  </CardHeader>
  <CardBody>
  {/* Chart */}

  <Graph sensorNumber={3} pacient={ props.location.state.pacient} ></Graph>

  </CardBody>
  </Card>
  </Col>


  <Col className="mb-5 mb-xl-0" xl="6">
  <Card className="bg-gradient-default shadow">
  <CardHeader className="bg-transparent">
  <Row className="align-items-center">
  <div className="col">
  <h6 className="text-uppercase text-light ls-1 mb-1">
  Sensor 5
  </h6>
  <h2 className="text-white mb-0">Pressure values</h2>
  </div>
  </Row>
  </CardHeader>
  <CardBody>
  {/* Chart */}

  <Graph sensorNumber={4} pacient={ props.location.state.pacient}></Graph>

  </CardBody>
  </Card>
  </Col>
  </> 
  :
  <>
  <Col className="mb-5 mb-xl-0" xl="12">
  <Card className="bg-gradient-default shadow">
  <CardHeader className="bg-transparent">
  <Row className="align-items-center">
  <div className="col">
  <h6 className="text-uppercase text-light ls-1 mb-1">{
    (value== -1) ? 
    `All sensors `
    : `Sensor ${value +1}`
  }                      </h6>
  <h2 className="text-white mb-0">Pressure values</h2>
  </div>
  <UncontrolledDropdown nav>
  <DropdownToggle className="pr-0" nav>

  <Button className="mb-0 text-sm font-weight-bold">
  Visualize 
  </Button>
  </DropdownToggle>
  <DropdownMenu className="dropdown-menu-arrow" right>
  <DropdownItem className="noti-title" header tag="div">
  <h6 className="text-overflow m-0">Show</h6>
  </DropdownItem>
  <DropdownItem to="/admin/user-profile" onClick={()=> {
    setValue(0)
  }} >
  <span 
  >Sensor 1</span>
  </DropdownItem>
  <DropdownItem to="/admin/user-profile" onClick={()=> {
    setValue(1)
  }} >
  <span 
  >Sensor 2</span>
  </DropdownItem>
  <DropdownItem to="/admin/user-profile"onClick={()=> {
    setValue(2)
  }} >
  <span 
  >Sensor 3</span>
  </DropdownItem>
  <DropdownItem to="/admin/user-profile" onClick={()=> {
    setValue(3)
  }}>
  <span
  >Sensor 4</span>
  </DropdownItem>
  <DropdownItem to="/admin/user-profile"onClick={()=> {
    setValue(4)
  }} >
  <span 
  >Sensor 5</span>
  </DropdownItem>
  <DropdownItem to="/admin/user-profile" >
  <DropdownItem to="/admin/user-profile" onClick={()=> {
    setValue(-1)
  }}>
  <span 
  >All sensors</span>
  </DropdownItem>
  </DropdownItem>
  </DropdownMenu>
  </UncontrolledDropdown>

  </Row>
  </CardHeader>
  <CardBody>
  {/* Chart */}

  <MainGraph sensorNumber={value} pacient={ props.location.state.pacient} ></MainGraph>

  </CardBody>
  </Card>
  </Col>
  </>
  }

  <Col><Card className="card-profile shadow">
    <CardBody className="pt-0 pt-md-4">
    <h3>
    {info.name} {info.lastname}
    <span className="font-weight-light"></span>
    </h3>
    <div className="text-center">
    <hr className="my-4" />
    <h3>
    Anomaly
    </h3>
    <h4>
    Overall anomaly
    </h4>
    <Anomaly val={info.anomaly}></Anomaly>
    <h4>
    Anomaly per sensor
    </h4>
    <Anomaly_sensor val={info.sensor_1_anomaly_state} number="1"></Anomaly_sensor>
    <Anomaly_sensor val={info.sensor_2_anomaly_state} number="2"></Anomaly_sensor>
    <Anomaly_sensor val={info.sensor_3_anomaly_state} number="3"></Anomaly_sensor>
    <Anomaly_sensor val={info.sensor_4_anomaly_state} number="4"></Anomaly_sensor>
    <Anomaly_sensor val={info.sensor_5_anomaly_state} number="5"></Anomaly_sensor>
    </div>
    </CardBody>
    </Card></Col>

  <Col className="mb-5 mb-xl-0" xl="12">
  <Card className="shadow">
  <CardHeader className="border-0">
  <Row className="align-items-center">
  <div className="col">
  <h3 className="mb-0">List of measures</h3>
  </div>
  </Row>
  </CardHeader>
  <CardBody>
  <MeasuresWidget pacient = {props.location.state.pacient}> </MeasuresWidget>
  </CardBody>
  </Card>
  </Col>
  </Row>
  </Container>
  </>
  );
  }

