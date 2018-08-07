import React, { Component } from "react";
import { Field, Label, Control, Input, Button, Checkbox, Select } from 'bloomer';
import 'bulma/css/bulma.css';
import "./ResultsList.css";
import { Link, withRouter } from "react-router-dom";
import _ from 'lodash';
import API from "../../utils/API";

const defaultForm = {
  city: '',
  state: '',
  minPrice: 0,
  maxPrice: 100000000,
  minSqFeet: 0,
  maxSqFeet: 100000000,
  minBeds: 0,
  maxBeds: 10,
  pets: "Any"
}

export class Filters extends Component {
  // Setting our component's initial state

  constructor(props) {
    super(props)

    const urlParams = new window.URLSearchParams(window.location.search)
    const form = {}

    Object.keys(defaultForm).forEach(key => {
      form[key] = urlParams.get(key) || defaultForm[key]
      this.handleFilters = _.debounce(this.handleFilters, 100);
    })

    this.state = {
      form,
      properties: [],
      show: "columns results-columns",
    }
  }

  filtersShow = () => {
    this.setState({ show: "columns results-columns filters-margin" })
  }

  filtersHide = () => {
    this.setState({ show: "columns results-columns" })
  }


  // When the component mounts, load all properties and save them to this.state.properties
  componentDidMount() {
    this.fetchProperties();
  }

  fetchProperties = () => {
    API.getProperties(this.state.form)
      .then(res => {
        console.log("Res Data =>", res.data)
        this.setState({ properties: res.data})
      })

      .catch(err => console.log(err));
  }
  // When search query is updated, debounce
  handleFilters = event => {

    API.getProperties(this.state.form)
      .then(res => {
        console.log("Res Data =>", res.data)
        this.setState({ properties: res.data})
      })

      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { form } = this.state;
    const { name, value } = event.target;

    form[name] = value

    console.log('handleinput', form);
    this.setState({ form });

    this.handleFilters();
  };

  render() {
    const { form } = this.state
return (
    <div className="filters">
      <Field>
        <Label>Maximum Bedrooms</Label>
        <Control>
            <Input 
            onChange={this.handleInputChange}
            value={form.maxBeds}
            name="maxBeds"
            type="number" placeholder="1"/>
        </Control>
      </Field>
      <Field>
        <Label>Minimum Bedrooms</Label>
        <Control>
            <Input 
            
            type="number" placeholder="1"/>
        </Control>
      </Field>
      <Field>
        <Label>Max Price</Label>
        <Control>
            <Input 
            onChange={this.handleInputChange}
            value={form.maxPrice}
            name="maxPrice"
            type="number" placeholder="2500"/>
        </Control>
      </Field>
      <Field>
                <Control>
                  <Select
                    onChange={this.handleInputChange}
                    value={form.pets}
                    name="pets"
                    type="text"
                    isSize="medium" >
                    <option>Any</option>
                    <option>Cat</option>
                    <option>Dog</option>
                    <option>Cat or Dog</option>
                    <option>None</option>
                  </Select>
                </Control>
              </Field>



        <Button isColor='primary' className="apply-filters"><p>Apply</p></Button>
    </div>
    )

  }
}
