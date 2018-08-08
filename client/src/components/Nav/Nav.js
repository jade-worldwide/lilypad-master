import React, { Component, Fragment } from "react";
import { Navbar, NavbarBrand, NavbarItem, NavbarEnd, Modal, ModalCard, ModalCardTitle, ModalBackground, ModalCardFooter, ModalCardHeader, Delete, ModalCardBody } from 'bloomer';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import 'bulma/css/bulma.css';
import "./Nav.css";
import pad from "./pad.png";
import modal from "./modal.svg";
import login from "./login.svg";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { MemberType } from "./MemberType";
import { getAuthenticated, logout } from '../../actions/authActions'

// const padLogo = { image: `url(${pad})` }
const modalBG = { backgroundImage: `url(${modal})` }

const loginBG = { backgroundImage: `url(${login})` }

class Nav extends Component {

  componentWillMount() {
    this.props.getAuthenticated();
  }

  state = {
    modal: "",
    login: ""
  };

  modalOpen = () => {
    this.setState({ modal: "is-active" })
  }

  loginOpen = () => {
    this.setState({ login: "is-active" })
  }

  logout = () => {
    this.props.logout()
  }

  modalClose = () => {
    this.setState({
      modal: "",
      login: "",
    })
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <Navbar className="navbar">
        <NavbarBrand>
          <NavbarItem className="nav-logo-item">
            <img alt="" src={pad} />
          </NavbarItem>
          <NavbarItem>
            <Link to={"/"}><p className="nav-title">Lilypad Rentals</p></Link>
          </NavbarItem>
        </NavbarBrand>
        <NavbarEnd>
          {!user ? (
            <Fragment>
              <NavbarItem href="#" onClick={this.loginOpen}>
                <p>Log in</p>
              </NavbarItem>
              <NavbarItem href="#" onClick={this.modalOpen}>
                <p>Sign Up</p>
              </NavbarItem>
            </Fragment>
          ) :
            <span>
              {user.role === 'Renter' ? (<span>
                <NavbarItem>
                  <Link to={"/renter/" + user._id}><p>Renter</p></Link>
                </NavbarItem>
              </span>
              ) : (<span>
                <Fragment>
                  <NavbarItem>
                    <Link to={"/manager/" + user._id}><p>Manager Dashboard</p></Link>
                  </NavbarItem>
                </Fragment>
              </span>)}

              <NavbarItem href="#" onClick={this.logout}>
                <p>Log out</p>
              </NavbarItem>
            </span>
          }
        </NavbarEnd>

        <div className="signup-modal">
          <Modal className={this.state.modal}>

            <ModalBackground />
            <ModalCard style={modalBG} >

              <ModalCardBody>
                <Delete onClick={this.modalClose} />

                <div className='step-progress'>
                  <SignUpModal />
                </div>

              </ModalCardBody>


            </ModalCard>
          </Modal>
        </div>

        {!user ? (
          <div className="login-modal">
            <Modal className={this.state.login}>
              <ModalBackground />
              <ModalCard className="login-card has-text-centered" style={loginBG}>

                <ModalCardHeader>
                  <ModalCardTitle><h1 className="title">Login</h1></ModalCardTitle>
                  <Delete className="login-delete" onClick={this.modalClose} />
                </ModalCardHeader>
                <LoginModal
                close={this.modalClose}/>
                <ModalCardFooter hasTextAlign="centered">

                </ModalCardFooter>
              </ModalCard>
            </Modal>
          </div>
        ) : null}
      </Navbar>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

const mapDispatchToProps = dispatch => ({
  getAuthenticated: bindActionCreators(getAuthenticated, dispatch),
  logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
