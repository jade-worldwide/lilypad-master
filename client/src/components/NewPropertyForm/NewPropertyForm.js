import React, { Component } from "react";
import { Field, Control, Input, Button, TextArea, Select, Label, Container } from 'bloomer';
import { connect } from 'react-redux';
import API from "../../utils/API";
import axios from "axios";
import Geocode from "react-geocode";
import 'bulma/css/bulma.css';
import "./NewPropertyForm.css";
import ImageUploader from 'react-images-upload';

// Cloudinary 
let imageUrl;
let CLOUDINARY_UPLOAD_PRESET = 'nre9efzy'
let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkuhmdf7w/upload'

// Geocode
Geocode.setApiKey("AIzaSyDV-7_RPvHNoZ2-f-pM7XLdMMfYnVAMn5M");
Geocode.enableDebug();

let price;
let propertySize;

class NewPropertyForm extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = { photos: [], pictures: [] };
    //     this.handleImageUpload = this.handleImageUpload.bind(this);
    // }

    state = {
        property: [],
        title: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        phoneNumber: "",
        propertySize: "",
        propertyType: "",
        numOfBeds: "",
        numOfBaths: "",
        price: "",
        pets: "",
        parking: "",
        laundry: "",
        heating: "",
        cooling: "",
        description: "",
        photos: [],
        pictures: []
    };

    handleFileChange = (event) => {
        this.setState({ file: event.target.value });
        console.log("file: " + this.state.file);
    }

    handleInputChange = event => {

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    };

    handleGeoCoding = event => {

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

        if (this.state.address && this.state.city) {

            let address = this.state.address
            let city = this.state.city;
            let forMarkers = `"${address}, ${city}"`

            Geocode.fromAddress(forMarkers).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log(`Lat: ${lat} | Lng: ${lng}`);

                    console.log(response.results[0].formatted_address)
                    this.setState({ latitude: lat, longitude: lng })
                },
                error => {
                    console.error(error);
                }
            );
        }

    }


    // Format phone number with (xxx) xxx-xxxx formats price and property size to have "," seperators
    formatPhoneNumber = event => {

        if (this.state.phoneNumber) {
            let { name, value } = event.target
            let numbers = value.replace(/\D/g, '')
            let char = { 0: '(', 3: ') ', 6: '-' };
            value = '';

            for (var i = 0; i < numbers.length; i++) {
                this.setState({ [name]: value += (char[i] || '') + numbers[i] })
            }
        }
    }

    formatThousands = event => {

        let { name, value } = event.target;
        let x;
        let x1;
        let x2;
        let number = value.replace(/,/g, "")
        value = "";
        number += '';
        x = number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';

        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx,
            '$1' +
            ',' +
            '$2');
        }
        this.setState({ [name]: value = x1 + x2 })

        // Unformat PropertySize & Price in before we push into database
        propertySize = this.state.propertySize.replace(/,/g, "")
        price = this.state.price.replace(/,/g, "")
    }

    handleImageUpload = picture => {
        const formData = new FormData();
        formData.append('file', picture[0]);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(res => {
            imageUrl = res.data.secure_url
            this.setState({ pictures: this.state.pictures.concat(imageUrl) })
            if (this.state.pictures.length >= 2) {
                let picture = this.state.pictures[0]
                this.setState({ photos: this.state.photos.concat(picture) })
                console.log("Photos =>", this.state.photos)
                this.setState({ pictures: [] })
            }
        })
    };

    consoleLogInput = event => {
        const { name, value } = event.target;
        console.log(`${name}: ${value}`)

    }

    handleFormSubmit = event => {

        event.preventDefault();
        const { user } = this.props;
        console.log(user)
        if (this.state.title && this.state.address && this.state.city && this.state.state &&
            this.state.phoneNumber && this.state.numOfBeds && this.state.propertySize &&
            this.state.propertyType && this.state.numOfBaths && this.state.price && this.state.pets &&
            this.state.parking && this.state.laundry && this.state.heating && this.state.cooling &&
            this.state.description && this.state.photos) {
            console.log("Submitting")
            API.saveProperty({
                title: this.state.title,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                phoneNumber: this.state.phoneNumber,
                propertySize: propertySize,
                propertyType: this.state.propertyType,
                numOfBeds: this.state.numOfBeds,
                numOfBaths: this.state.numOfBaths,
                price: price,
                pets: this.state.pets,
                parking: this.state.parking,
                laundry: this.state.laundry,
                heating: this.state.heating,
                cooling: this.state.cooling,
                description: this.state.description,
                photos: this.state.photos,
                user
            })
                .then(res => console.log("submitted"))
                .catch(err => console.log(err));
        } else {
            console.log("Not Submitting")
        }
    };


    render() {
        // const { user } = this.props;
        return (
            <Container>
                <h1 className="title has-text-centered">New Property</h1>
                <Field>
                    <Label>Title</Label>
                    <Control>
                        <Input
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            onBlur={this.consoleLogInput}
                            name="title"
                            type="Text"
                            placeholder='Title' />
                    </Control>
                </Field>
                <div className="columns">
                    <div className="column">
                        <Field>
                            <Label>Address</Label>
                            <Control>
                                <Input
                                    value={this.state.address}
                                    onChange={this.handleGeoCoding}
                                    onBlur={this.consoleLogInput}
                                    name="address"
                                    type="Text"
                                    placeholder='Address' />
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>City</Label>
                            <Control>
                                <Input
                                    value={this.state.city}
                                    onChange={this.handleGeoCoding}
                                    onBlur={this.consoleLogInput}
                                    name="city"
                                    type="Text"
                                    placeholder='City' />
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>State</Label>
                            <Control>
                                <Input
                                    value={this.state.state}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="state"
                                    type="Text"
                                    placeholder='State' />
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Phone Number</Label>
                            <Control>
                                <Input
                                    value={this.state.phoneNumber}
                                    onChange={this.handleInputChange}
                                    onKeyUp={this.formatPhoneNumber}
                                    onBlur={this.consoleLogInput}
                                    name="phoneNumber"
                                    type="Text"
                                    placeholder='Contact Number' />
                            </Control>
                        </Field>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <Field>
                            <Label>Monthly Rent</Label>
                            <Control>
                                <Input
                                    value={this.state.price}
                                    onChange={this.handleInputChange}
                                    onKeyUp={this.formatThousands}
                                    onBlur={this.consoleLogInput}
                                    name="price"
                                    type="Text"
                                    placeholder='Monthly Rent' />
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Bedrooms</Label>
                            <Control>
                                <Input
                                    value={this.state.numOfBeds}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="numOfBeds"
                                    type="Number"
                                    placeholder='Bedrooms' />
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Bathrooms</Label>
                            <Control>
                                <Input
                                    value={this.state.numOfBaths}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="numOfBaths"
                                    type="Number"
                                    placeholder='Bathrooms' />
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Square Feet</Label>
                            <Control>
                                <Input
                                    value={this.state.propertySize}
                                    onChange={this.handleInputChange}
                                    onKeyUp={this.formatThousands}
                                    onBlur={this.consoleLogInput}
                                    name="propertySize"
                                    type="Text"
                                    placeholder='Square Feet' />
                            </Control>
                        </Field>
                    </div>
                </div>

                <Field>
                    <Label>Description</Label>
                    <Control>
                        <TextArea
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            onBlur={this.consoleLogInput}
                            name="description"
                            placeholder='Description' />
                    </Control>
                </Field>

                <div className="columns">
                    <div className="column">
                        <Field>
                            <Label>Type</Label>
                            <Control>
                                <Select
                                    value={this.state.propertyType}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="propertyType"
                                >
                                    <option>Select</option>
                                    <option>Single Family</option>
                                    <option>Apartment</option>
                                    <option>Duplex</option>
                                </Select>
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Laundry</Label>
                            <Control>
                                <Select
                                    value={this.state.laundry}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="laundry"
                                >
                                    <option>Select</option>
                                    <option>In Unit</option>
                                    <option>On Premise</option>
                                    <option>None</option>
                                </Select>
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Heating</Label>
                            <Control>
                                <Select
                                    value={this.state.heating}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="heating"
                                >
                                    <option>Select</option>
                                    <option>Central</option>
                                    <option>Radiator</option>
                                    <option>Wall Heater</option>
                                </Select>
                            </Control>
                        </Field>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <Field>
                            <Label>Cooling</Label>
                            <Control>
                                <Select
                                    value={this.state.cooling}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="cooling"
                                >
                                    <option>Select</option>
                                    <option>Central</option>
                                    <option>Swamp</option>
                                    <option>Window Mounted</option>
                                    <option>None</option>
                                </Select>
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Pets</Label>
                            <Control>
                                <Select
                                    value={this.state.pets}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="pets"
                                >
                                    <option>Select</option>
                                    <option>Cat</option>
                                    <option>Dog</option>
                                    <option>Cat or Dog</option>
                                    <option>None</option>
                                </Select>
                            </Control>
                        </Field>
                    </div>
                    <div className="column">
                        <Field>
                            <Label>Parking</Label>
                            <Control>
                                <Select
                                    value={this.state.parking}
                                    onChange={this.handleInputChange}
                                    onBlur={this.consoleLogInput}
                                    name="parking"
                                >
                                    <option>Select</option>
                                    <option>Covered</option>
                                    <option>Space</option>
                                    <option>Street</option>
                                    <option>None</option>
                                </Select>
                            </Control>
                        </Field>
                    </div>
                </div>
                <div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.handleImageUpload}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                </div>
                <Button onClick={this.handleFormSubmit} isColor='primary' className=""><p>Submit</p></Button>
            </Container>
        );
    }
}
const mapStateToProps = ({ auth }) => ({
    user: auth.user
});


export default connect(mapStateToProps)(NewPropertyForm)