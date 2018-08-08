import React, { Component } from "react";
import NewPropertyForm from "../../components/NewPropertyForm/NewPropertyForm";
import { PropertyList, /*Filters*/ } from "../../components/PropertyList";
import { Container, Button, Modal, ModalCard, ModalBackground, /*ModalCardFooter, ModalCardHeader,*/ Delete, ModalCardBody, Table } from 'bloomer';
import modal from "./modal-bg.svg";
import "./Manager.css";
// import { login } from '../../actions/authActions'
import API from "../../utils/API";

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom";


const modalBG = { backgroundImage: `url(${modal})` }

export class Manager extends Component {
  // Setting our component's initial state
  state = {
    modal: "",
    user: {
      property: [],
    },
    properties: [],
    applications: [],
    propertyNum: [],
    applicationNum: [],
    propertyId: '',
    applicationId: ''

  };

  modalOpen = () => {
    this.setState({ modal: "is-active" })
  }

  reload = () => {
    window.location.reload();
 }

  modalClose = () => {
    this.setState({
      modal: "",
      login: "",
    })

    this.reload();
  }

  componentDidMount() {
    this.loadUser();
    // this.loadProperties();
  }

  loadUser = () => {
    API.getUser(this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data, propertyNum: res.data.property.length })
        console.log("--Front End: " + res.data);
        // let userProp = (res.data.property)
        // console.log("userProp=>")
        // for (let peterPanda of userProp) {
        //   console.log("Property ID: ", peterPanda)
        //   API.getProperty(peterPanda)
        //     .then(res => {
        //       this.setState({ properties: this.state.properties.concat(res.data), applicationNum: res.data.application.length, applicationId: res.data.application })
        //     })
        // }
      }).catch(err => console.log(err));
  }

  render() {
    console.log("--Property ID: " + this.state.user.property)
    console.log(this.state.user)
    return (
      <div className="manager">
        <Container className="manager-container">
          <div className="columns">
            <div className="column">
              <h1 className="title">Hi {this.state.user.name}</h1>
              <h2 className="sub-title">You currently have {this.state.propertyNum} properties</h2>
              <h2 className="sub-title">Check out the new applications you received.</h2>
            </div>
            <div className="column user-dash-right">
              <Button
                isColor='primary'
                className=""
                onClick={this.modalOpen}><p>Create Listing</p></Button>

            </div>

          </div>

          <h1 className="title has-text-centered">My Properties</h1>
          <Table>
      <thead>
        <tr>
          <th className="address-column">Address</th>
          <th className="rented-column">Rented</th>
          <th className="app-column">Applications</th>
          <th className="delete-column"></th>
        </tr>
      </thead>

      <tbody>

            {this.state.user.property.map(property => (
              <PropertyList
                title={property.title}
                applicationNum={property.application.length}
                property={property}
                _id={property._id}

              />
            ))}
          
      </tbody>

    </Table>

          <div className="new-property-modal">
            <Modal className={this.state.modal}>

              <ModalBackground />
              <ModalCard style={modalBG} >

                <ModalCardBody>
                  <Delete onClick={this.modalClose} />

                  <div className='step-progress'>
                    <NewPropertyForm
                    close={this.modalClose}
                    />
                  </div>

                </ModalCardBody>


              </ModalCard>
            </Modal>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  authError: auth.authError
});

export default connect(mapStateToProps)(Manager)
