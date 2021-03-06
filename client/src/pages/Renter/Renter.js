import React, { Component } from "react";
import  RenterApplication from "../../components/RenterApplication/RenterApplication";
import { Container, Button, Modal, ModalCard, Table, /*ModalCardTitle,*/ /*ModalBackground, ModalCardFooter, ModalCardHeader,*/ Delete, ModalCardBody } from "bloomer";
import { ResultsList } from "../../components/ResultsList";
import "./Renter.css";
import modal from "./modal-bg.svg";

import API from "../../utils/API";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const modalBG = { backgroundImage: `url(${modal})` }


class Renter extends Component {
  // Setting our component's initial state
  state = {
    modal: "",
    user: {},
    properties: [],
    propertyNum: [],
    propertyId: '',
    title: "Peter Panda"
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
  }

  loadUser = () => {
    API.getUser(this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data, propertyNum: res.data.propertylike.length, propertyId: res.data.propertylike })
        let userProp = (res.data.propertylike)
        for (let peterPanda of userProp) {
          console.log("Property ID: ", peterPanda)
          API.getProperty(peterPanda)
            .then(res =>
              this.setState({ properties: this.state.properties.concat(res.data) })
            )
        }
      })

      .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="renter">

        <Container>

          <div className="columns">
            <div className="column">
              <h1 className="title">Hi {this.state.user.name}!</h1>

            </div>
            <div className="column user-dash-right">
              <Button isColor='primary' className="" onClick={this.modalOpen}><p>Application</p></Button>
            </div>

          </div>

          <h1 className="title has-text-centered">Liked Properties</h1>
          <div>
            <Table className="results-table">
              <tbody className="results-tbody">
            {this.state.properties.map(properties => (
              <Link to={"/property/" + properties._id}>
                <ResultsList
                  title={properties.title}
                  price={properties.price.toLocaleString()}
                  numOfBeds={properties.numOfBeds}
                  propertySize={properties.propertySize.toLocaleString()}
                  photos={properties.photos[0]}
                />
              </Link>
            ))}
          </tbody>
          </Table>
          </div>

        </Container>


          <div className="application-modal">
            <Modal className={this.state.modal}>
              <ModalCard style={ modalBG } >

                  <ModalCardBody>
                      <Delete onClick={this.modalClose} />
                      <RenterApplication
                      close={this.modalClose}/>
                </ModalCardBody>


            </ModalCard>
            </Modal>
          </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  authError: auth.authError
});

export default connect(mapStateToProps)(Renter)
