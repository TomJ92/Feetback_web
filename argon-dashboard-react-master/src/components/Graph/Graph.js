import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

//proviens du site http://recharts.org/en-US/examples
const data = [
  {
    name: 'May', TempMatin: 5,
  },
  {
    name: 'Jun', TempMatin: 6,
  },
  {
    name: 'Jul', TempMatin: 7,
  },
  {
    name: 'Aug', TempMatin: 6,
  },
];


export default class Widget1 extends PureComponent {

  render() {

    //const personne = this.props.WidgetData;

    return (

        <ResponsiveContainer aspect="2">

              <LineChart
                data={data}
                margin={{
                  top: 0, right: 3, left: -30, bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="TempMatin" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
        </ResponsiveContainer>
    );
  }
}