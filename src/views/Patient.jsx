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
  //TEST VIEW
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
      <Col className="mb-5 mb-xl-0" xl="12">
      <Card className="shadow">
      <CardHeader className="border-0">
      <Row className="align-items-center">
      <div className="col">
      <h3 className="mb-0">List of patients</h3>
      <Form className="mt-4 mb-5 mb-xl-0 d-md-none">
      <InputGroup className="input-group-rounded input-group-merge">
      <Input
      aria-label="Search"
      className="form-control-rounded form-control-prepended"
      placeholder="Search a patient"
      type="search"
      />
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
      <th scope="col">Full Name</th>
      <th scope="col">E-mail</th>
      <th scope="col">Last meeting date</th>
      <th scope="col">Anomaly</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <th scope="row">Paul CHASSELOUP</th>
      <td>paul.chasseloup@edu.ece.com</td>
      <td>11/04/2019</td>
      <td><div class="alert alert-danger" role="alert">
      <strong>Anomaly detected !</strong></div></td>
      </tr>

      <tr>
      <th scope="row">Tom JOUVET</th>
      <td>tom.jouvet@edu.ece.fr</td>
      <td>03/07/2018</td>
      <td><div class="alert alert-success" role="alert">
      <strong>Nothing to report !</strong>
      </div></td>
      </tr>

      <tr>
      <th scope="row">Valentine RICOUT</th>
      <td>valentine.ricout@edu.ece.fr</td>
      <td>03/07/2017</td>
      <td><div class="alert alert-success" role="alert">
      <strong>Nothing to report !</strong>
      </div></td>
      </tr>

      <tr>
      <th scope="row">William TERRIEN</th>
      <td>william.terrien@edu.ece.fr</td>
      <td>02/11/2019</td>
      <td><div class="alert alert-success" role="alert">
      <strong>Nothing to report !</strong>
      </div></td>
      </tr>

      <tr>
      <th scope="row">Emma PALFI</th>
      <td>emma.palfi@edu.ece.fr</td>
      <td>07/10/2015</td>
      <td><div class="alert alert-success" role="alert">
      <strong>Nothing to report !</strong>
      </div></td>
      </tr>

      <tr>
      <th scope="row">Baptiste CAUVIN</th>
      <td>baptiste.cauvin@edu.ece.fr</td>
      <td>03/12/2019</td>
      <td><div class="alert alert-success" role="alert">
      <strong>Nothing to report !</strong>
      </div></td>
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
