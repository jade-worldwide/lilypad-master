import React, { Component } from "react";
import { ModalCardBody, Button, Field, Control, Input, Label, Select } from 'bloomer';
import { FormErrors } from './FormErrors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { signup } from '../../actions/authActions'

class SignUpModal extends Component {
  // Setting our component's initial state
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phonenumber: "",
      password: "",
      role: '',
      formErrors: { name: "", email: "", phonenumber: "", password: "" },
      nameValid: false,
      emailValid: false,
      phonenumberValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    },
      () => { this.validateField(name, value) });
    console.log("Input Changed");
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let phonenumberValid = this.state.phonenumber;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.match(/^./);
        fieldValidationErrors.name = nameValid ? '' : ' cannot be empty';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phonenumber':
        phonenumberValid = value.length >= 10;
        fieldValidationErrors.phonenumber = phonenumberValid ? '' : ' phonenumber is too short';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      nameValid: nameValid,
      phonenumberValid: phonenumberValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.name && this.state.emailValid && this.state.phonenumber && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, email, phonenumer, password, role } = this.state
    if (email) {
      this.props.signup({ name, email, phonenumer, password, role })
    }
  };

  render() {
    return (
      <div className="sign-up-modal columns">
        <div className="column">
        </div>

        <div className="column">
          <h1 className="title user-title">Almost Home!</h1>
          <FormErrors formErrors={this.state.formErrors} />

          <h1 style={{ color: "red" }}>
            {/* {this.props.user ? this.props.user : ''} */}
          </h1>
          <Field>
            <Control>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                type="email"
                placeholder='Email Address'
                isSize="medium" />
              <p className={`help is-danger ${this.errorClass(this.state.formErrors.email)}`} > </p>
            </Control>
          </Field>
          <Field>
            <Control>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                type="Text"
                placeholder='Name'
                isSize="medium" />
            </Control>
          </Field>
          <Field>
            <Control>
              <Input
                value={this.state.phonenumber}
                onChange={this.handleInputChange}
                name="phonenumber"
                type="number"
                placeholder='Phone Number'
                isSize="medium" />
            </Control>
          </Field>
          <Field>
            <Control>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                type="Text"
                placeholder='Password'
                isSize="medium" />
            </Control>
          </Field>
          <Field>
            <Label>What is your Member Type</Label>
            <Control>
              <Select
                value={this.state.role}
                onChange={this.handleInputChange}
                name="role" >
                <option>Select One</option>
                <option>Renter</option>
                <option>Property Manager</option>
              </Select>
            </Control>
          </Field>
          <Button
            disabled={!this.state.formValid}
            onClick={this.handleFormSubmit}
            isColor='primary'
            className="sign-up-button is-medium">
            <p>Sign Up</p>
          </Button>

        </div>


      </div>

    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});


const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(signup, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal)