import React, { Component } from "react";
import { Label, Input } from 'bloomer';
import 'bulma/css/bulma.css';
import "./PropertyList.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import API from "../../utils/API";
import { connect } from 'react-redux';

class Applied extends Component {
  // Setting our component's initial state
  state = {
    modal: "",
    user: {},
    properties: [],
    applications: [],
    propertyNum: [],
    applicationNum: [],
    propertyId: '',
    applicationId: ''

  };
  componentDidMount() {
    this.loadUser();
    // this.loadProperties();
  }

  loadUser = () => {
    const { user } = this.props;
    API.getUser(user._id)
      .then(res => {
        this.setState({ user: res.data, propertyNum: res.data.property.length, propertyId: res.data.property })
        let userProp = (res.data.property)
        for (let peterPanda of userProp) {
          console.log("Property ID: ", peterPanda)
          API.getProperty(peterPanda)
            .then(res => {
              this.setState({ properties: this.state.properties.concat(res.data), applicationNum: res.data.application.length, applicationId: res.data.application })
              let userApp = (res.data.application)
              for (let clydeFrog of userApp) {
                console.log("Application ID: ", clydeFrog)
                API.getApplication(clydeFrog)
                  .then(res =>
                    this.setState({ applications: this.state.applications.concat(res.data) })
                  )
              }
            })
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    // console.log("--application inside applied " + this.state.applications)
    // console.log("the user id yo " + this.state.user._id);
    return (
      <div className="property-list">
        {this.state.applications.map(application => (

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