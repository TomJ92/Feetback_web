import React, { Component } from 'react';
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

class Anomaly extends Component {

  constructor(props) {
    super(props);

    this.state = {
  }
}
  render() {
    if(this.props.val == false)
    {
      return(<div class="alert alert-success" role="alert">
    <strong>No anomaly to report !</strong>
    </div>);
    }
    else
    {
      return(<div class="alert alert-danger" role="alert">
    <strong>Anomaly detected !</strong></div>);
    }
}
}

export default Anomaly;