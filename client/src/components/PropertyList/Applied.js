import React, { Component } from "react";
import { Label} from 'bloomer';
import 'bulma/css/bulma.css';
import "./PropertyList.css";
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { connect } from 'react-redux';

class Applied extends Component {

  render() {

    return (
      <div className="property-list">
        {this.props.applications.map(application => (

          <AccordionItem>
            <AccordionItemTitle>
              <h3>{application.firstName} {application.lastName}</h3>
            </AccordionItemTitle>
            <AccordionItemBody>

              <div className="columns">

                <div className="column">
                  <div>
                    <Label>First Name</Label>
                    <p>{application.firstName}</p>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <p>{application.emailAddress}</p>
                  </div>
                </div>

                <div className="column">
                  <div>
                    <Label>Last Name</Label>
                    <p>{application.lastName}</p>
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <p>{application.phoneNumber}</p>
                  </div>

                </div>

              </div>

              <div>
                <Label>Current Address</Label>
                <p>{application.currentAddress}</p>
              </div>
              <div className="columns">
                <div className="column">

                  <div>
                    <Label>Reference Name</Label>
                    <p>{application.referenceName1}</p>
                  </div>

                  <div>
                    <Label>Reference Name</Label>
                    <p>{application.referenceName2}</p>
                  </div>

                </div>

                <div className="column">
                  <div>
                    <Label>Reference Phone Number</Label>
                    <p>{application.referencePhoneNumber1}</p>
                  </div>

                  <div>
                    <Label>Reference Phone Number</Label>
                    <p>{application.referencePhoneNumber2}</p>
                  </div>

                </div>
              </div>

              <div className="columns">
                <div className="column">

                  <div>
                    <Label>Place of Employment</Label>
                    <p>{application.currentEmployment}</p>
                  </div>
                </div>

                <div className="column">

                  <div>
                    <Label>Workplace Phone Number</Label>
                    <p>{application.employmentPhoneNumber}</p>
                  </div>

                </div>

                <div className="column">
                  <Label>Annual Salary</Label>
                  <p>{application.income}</p>
                  <div>

                  </div>

                </div>

              </div>

              <div className="columns">
                <div className="column">

                  <Label>Pets</Label>
                  <p>{application.pets}</p>
                </div>

                <div className="column">

                  <Label>Social Security Number</Label>

                  <p>{application.socialNumber}</p>
                </div>

                <div className="column">

                  <Label>Driver License</Label>
                  <p>{application.driverNumber}</p>
                </div>

              </div>

              <div>
                <Label>Additional Notes</Label>
                <p>{application.additionalNotes}</p>
              </div>
            </AccordionItemBody>
          </AccordionItem>
        ))}

      </div>


    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  authError: auth.authError
});

export default connect(mapStateToProps)(Applied)