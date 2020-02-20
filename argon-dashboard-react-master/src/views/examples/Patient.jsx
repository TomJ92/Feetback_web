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

class Patient extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
      this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
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
                  
                  <Graph></Graph>

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
                  
                  <Graph></Graph>

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

                  <Graph></Graph>

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

                  <Graph></Graph>

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

                  <Graph></Graph>

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
    </Card>
    </Col>
    </Row>
    </Container>
    </>
    );
  }
}

export default Patient;
