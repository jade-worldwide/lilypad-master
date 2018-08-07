import React, { Component } from "react";
import { Table, Image, Subtitle, Button, Modal, ModalCard, ModalBackground, ModalCardBody, Delete, Container, Label, Input } from 'bloomer';
import 'bulma/css/bulma.css';
import "./PropertyList.css";
import modal from "./modal-bg.svg";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import Applied from "./Applied";
import 'react-accessible-accordion/dist/fancy-example.css';
import { Link } from "react-router-dom";
const modalBG = { backgroundImage: `url(${modal})` }

export class PropertyList extends Component {
  // Setting our component's initial state
  
  constructor(props) {
    super(props)
  this.state = {
    modal: "",
  };

}

  modalOpen = () => {
    this.setState({ modal: "is-active" })
  }



  modalClose = () => {
    this.setState({
      modal: ""
     })
  }


  render() {
    return (
      <div className="property-list">
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
        <tr>
          <td>
          <Link to={"/property/" + this.props._id}><p>{this.props.title}</p></Link>
          </td>
          <td className="rented-column">
            <div class="field">
              <input id="switchExample" type="checkbox" name="switchExample" className="switch" />
            </div>
          </td>
          <td>
          <Button isColor='primary' className="is-small" onClick={this.modalOpen}><p>View {this.props.applicationNum}</p></Button>
          </td>
          <td>
            <Button className="is-small delete-button"><p><i className="far fa-trash-alt"></i></p></Button>

          </td>
        </tr>

      </tbody>
    </Table>

        <div className="application-modal">
          <Modal className={this.state.modal}>

            <ModalBackground />
            <ModalCard style={ modalBG } >

                <ModalCardBody>
                    <Delete onClick={this.modalClose} />

                      <Container>

                        <Accordion>
                          <Applied />
                          <Applied />
                          <Applied />
                        </Accordion>

                      </Container>

              </ModalCardBody>


          </ModalCard>
          </Modal>
        </div>
      </div>


    );
  }
}
