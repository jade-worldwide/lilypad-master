import React from "react";
import { Table, Image, Subtitle } from 'bloomer';
import 'bulma/css/bulma.css';
import "./ResultsList.css";

export const ResultsList = props => (

    <Table>
      <tbody>
          <tr>
              <td className="list-image"><Image isSize="96x96" src={props.photos}/></td>
              <td>
              <Subtitle isSize={4}>{props.title}</Subtitle>
              <p>${props.price} - {props.numOfBeds} Bedrooms - {props.propertySize} Sq Ft</p>
              </td>
          </tr>

      </tbody>
    </Table>

);