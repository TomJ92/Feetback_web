//Librairies
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
//New class
class Anomaly_sensor extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }
  render() {
    //If value transmitted is false : user.anomaly = false
    if(this.props.val == false)
    {
      //Indicate there is no anomaly on sensor n with green label, n= sensor number send
      return(<div class="alert alert-success" role="alert">
        <strong>No anomaly on sensor {this.props.number}</strong>
        </div>);
    }
    //Else
    else
    {
      //Indicate anomaly with red label with the number of the sensor
      return(<div class="alert alert-danger" role="alert">
        <strong>Anomaly on sensor {this.props.number}!</strong></div>);
    }
  }
}

export default Anomaly_sensor;