import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);
  console.log(flights);
  useEffect(() => {
    fetch("/flights")
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        setFlights(Object.keys(data));
      });
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      <Dropdown onChange={(element) => handleFlightSelect(element)}>
        <option value="FlightNumber">Please select a flight</option>
        {flights.map((flightNumber) => (
          <option>{flightNumber}</option>
        ))}
      </Dropdown>
    </Wrapper>
  );
};
const Dropdown = styled.select`
  margin-left: 20px;
  padding: 5px;
`;

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
