import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import LineGraph from "components/Graphs/LineGraph.js"


const EXCHANGE_RATES = gql`
query {
  getMeasures(patient: "1") {
    sensors {
      averagePressureS
      maxPressureS
      minPressureS
    }
  }
}
`;

export function ExchangeRates(){
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <LineGraph data={data} average={[13,32]} ></LineGraph>;
}