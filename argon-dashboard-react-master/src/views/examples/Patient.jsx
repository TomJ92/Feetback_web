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

import Header from "components/Headers/Header.jsx";
import Graph from "components/Graph/Graph.js";
import MeasuresWidget from "components/TabWidget/MeasuresWidget";

export default function Patient (props){
    const history = useHistory();
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
    <Row className="mt-5">
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

