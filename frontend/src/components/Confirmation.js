import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = ({ userReservation }) => {
  const { id, flight, givenName, seat, surname, email } = userReservation;
  return (
    <Wrapper>
      <Card>
        <Flight>
          <Span>Flight informations:</Span>
          <FNumber>
            <Bold>Flight number:</Bold> {flight}
          </FNumber>
          <FNumber>
            <Bold>Seat number:</Bold> {seat}
          </FNumber>
        </Flight>
        <User>
          <SpanLast>User informations:</SpanLast>
          <FNumber>
            <Bold>ID:</Bold> {id}
          </FNumber>
          <FNumber>
            <Bold>Name:</Bold> {givenName}
          </FNumber>
          <FNumber>
            <Bold>Family Name:</Bold> {surname}
          </FNumber>
          <FNumber>
            <Bold>Email:</Bold> {email}
          </FNumber>
        </User>
      </Card>
    </Wrapper>
  );
};

const SpanLast = styled.span`
  font-family: "Permanent Marker", cursive;
  font-size: 30px;
  color: white;
  padding-bottom: 10px;
  padding-top: 30px;
`;

const Span = styled.span`
  font-family: "Permanent Marker", cursive;
  font-size: 30px;
  color: white;
  padding-bottom: 10px;
`;

const Bold = styled.span`
  padding: 10px 10px 10px 0;
  font-family: "sans-serif";
  font-weight: bolder;
  color: black;
`;

const FNumber = styled.div`
  display: flex;
  align-items: baseline;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const Card = styled.div`
  width: 400px;
  height: 400px;
  border: 8px solid #aa001e;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: white;
`;
const Flight = styled.div`
  font-family: "sans-serif";
  display: flex;
  flex-direction: column;
  color: white;
`;

const User = styled.div`
  font-family: "sans-serif";
  display: flex;
  flex-direction: column;
`;

export default Confirmation;
