import "./Results.css";
import React, { Component } from "react";
import { ResultsList } from "../../components/ResultsList";
import { Button, Field, Label, Control, Select, Table } from 'bloomer';
import { GoogleMap } from "../../components/GoogleMap";
import { Slider } from 'antd';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/tooltip/style/index.css';


import { Link, withRouter } from "react-router-dom";
import _ from 'lodash';
import API from "../../utils/API";

const defaultForm = {
  city: '',
  state: '',
  minPrice: 0,
  maxPrice: 10000,
  minBeds: 0,
  maxBeds: 10,
  minBaths: 0,
  maxBaths: 10,
  pets: "Any"
}

class Results extends Component {
  // Setting our component's initial state

  constructor(props) {
    super(props)

    const urlParams = new window.URLSearchParams(props.location.search)
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
        this.setState({ properties: res.data })
      })

      .catch(err => console.log(err));
  }
  // When search query is updated, debounce
  handleFilters = event => {

    API.getProperties(this.state.form)
      .then(res => {
        console.log("Res Data =>", res.data)
        this.setState({ properties: res.data })
      })

      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { form } = this.state;
    const { name, value } = event.target;

    form[name] = value

    this.setState({ form });

    this.handleFilters();
  };

  onSliderValueChange = (value) => {
    const { form } = this.state;
    const minPrice = value[0];
    const maxPrice = value[1];
    form['maxPrice'] = maxPrice;
    form['minPrice'] = minPrice;

    this.setState({
      form
    });
    this.handleFilters();
  }

  onSliderBedValueChange = (value) => {
    const { form } = this.state;
    const minBeds = value[0];
    const maxBeds = value[1];
    form['maxBeds'] = maxBeds;
    form['minBeds'] = minBeds;

    this.setState({
      form
    });
    this.handleFilters();
  }

  onSliderBathValueChange = (value) => {
    const { form } = this.state;
    const minBaths = value[0];
    const maxBaths = value[1];
    form['maxBaths'] = maxBaths;
    form['minBaths'] = minBaths;

    this.setState({
      form
    });
    this.handleFilters();
  }

  render() {
    const { form } = this.state

    return (
      <div className="results">

        <div className="filters">
          <Field>
            <Label>Bedrooms</Label>
            <Control>
              <Slider
                onChange={this.onSliderBedValueChange}
                name="maxPrice"
                range value={[form.minBeds, form.maxBeds]} min={0} max={10} />
              <div className="slider-output">
                <p>Min: {form.minBeds}</p>
                <p className="max">Max: {form.maxBeds}</p>
              </div>
            </Control>
          </Field>
          <Field>
            <Label>Bathrooms</Label>
            <Control>
              <Slider
                onChange={this.onSliderBathValueChange}
                name="maxBaths"
                range defaultValue={[form.minBaths, form.maxBaths]} min={0} max={10} />
              <div className="slider-output">
                <p>Min: {form.minBaths}</p>
                <p className="max">Max: {form.maxBaths}</p>
              </div>
            </Control>
          </Field>
          <Field>
            <Label>Max Price</Label>
            <Control>
              <Slider
                onChange={this.onSliderValueChange}
                name="maxPrice"
                range value={[form.minPrice, form.maxPrice]} min={0} max={10000} />
              <div className="slider-output">
                <p>Min: {form.minPrice.toLocaleString()}</p>
                <p className="max">Max: {form.maxPrice.toLocaleString()}</p>
              </div>
            </Control>
          </Field>
          <Field>
            <Label>Pets</Label>
            <Control>
              <Select
                onChange={this.handleInputChange}
                value={form.pets}
                name="pets"
                type="text"
                >
                <option>Any</option>
                <option>Cat</option>
                <option>Dog</option>
                <option>Cat or Dog</option>
                <option>None</option>
              </Select>
            </Control>
          </Field>

        </div>
        <div className={this.state.show}>
          <div className="column results-column list-column">
            <div className="filter-header">
              <Button isColor='primary' className="show-filters" onClick={this.state.show === "columns results-columns" ? this.filtersShow : this.filtersHide}><p>Filters</p></Button>
            </div>
            <div className="result-list">

              <Table className="results-table">
                <tbody className="results-tbody">
              {this.state.properties.map(property => (

                    <Link  className="results-link" key={property._id} to={"/property/" + property._id}>
                      <ResultsList
                        title={property.title}
                        price={property.price.toLocaleString()}
                        numOfBeds={property.numOfBeds}
                        photos={property.photos[0]}
                        propertySize={property.propertySize.toLocaleString()}
                      />
                    </Link>

              ))}
            </tbody>
            </Table>
            </div>
          </div>
          <div className="column results-column">
            <GoogleMap
              properties={this.state.properties} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Results);
