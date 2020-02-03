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

import Anomaly from"components/Anomaly/Anomaly.js";

class TabWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos : [
			{
				
				first_name : "Paul",
				family_name : "CHASSELOUP",
				mail : "paul.chasseloup@edu.ece.fr",
				meeting_date : "03/10/2019",
				anomaly : true
			},
			{
				first_name : "Tom",
				family_name : "JOUVET",
				mail : "tom.jouvet@edu.ece.fr",
				meeting_date : "03/07/2018",
				anomaly : false	
			},
			{
				first_name : "Valentine",
				family_name : "RICOUT",
				mail : "valentine.ricout@edu.ece.fr",
				meeting_date : "03/07/2017",
				anomaly : false					
			}
			]
    }
  }
/*
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        this.setState({
          todos: this.data
        });
      })
  }
  */

  render() {
    const { todos = [] } = this.state;
    return (
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
    <th scope="col">Name</th>
    <th scope="col">E-mail</th>
    <th scope="col">Last meeting date</th>
    <th scope="col">Anomaly</th>
    </tr>
    </thead>
    <tbody>
            {todos.length ? 
              todos.map(todo => (
                <tr>
                <th scope="row">{todo.first_name+" "+todo.family_name}</th>
                  <td>{todo.mail}</td>
                  <td>{todo.meeting_date}</td>
                  <td><Anomaly val={todo.anomaly}></Anomaly></td>
                </tr>
              ))
              : 
              (<tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>)
            }
            </tbody>
          </Table>
          </Card>
    );
  }
}

export default TabWidget;

{/*
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
    */
}