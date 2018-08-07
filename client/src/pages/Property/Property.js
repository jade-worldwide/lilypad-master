import React, { Component } from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import LightBox from "../../components/LightBox";
import API from "../../utils/API";
import {sendApplication, productTaste} from '../../actions/propertyActions';
import { Container, Title, /*Image,*/ Box, Button, Subtitle } from 'bloomer';
// import house from './house.jpg';
import "./Property.css";

class Property extends Component {
  // Setting our component's initial state
  state = {
    property: {},
    liked: null,
    shared: "copy-url",
  };

   // When the component mounts, load all properties and save them to this.state.properties
   componentDidMount() {
    API.getProperty(this.props.match.params.id)
      .then(res => this.setState({ property: res.data }))
      .catch(err => console.log(err));
  }



  toggleLikeProperty = () => {

    const { productTaste, auth: { user: { _id } } } = this.props;
    const { property: { _id: propertyId }, liked } = this.state;
    this.setState({liked: !liked});
    productTaste({userId: _id, propertyId, likeStatus:  !liked});
  }
  

  onSendApplication() {
    const { onSendApplication, auth: { user: { email } } } = this.props;
    const {property: { _id }} = this.state;
    onSendApplication({userEmail: email, propertyId: _id});
  }


  render() {
    const mainImage = { backgroundImage: `url(${this.state.property.photos})` }
    return (
      <div className="Property">
        <div className="main-image" style={ mainImage }>
          <Container className="property-container image-buttons">
            <div className="buttons-left">
              <LightBox />
            </div>
            <div className="buttons-right">
              <Button isColor='white'><p><i className="far fa-share-square"></i>  Share</p></Button>
              <Button isColor='white' className="like-button" onClick={this.toggleLikeProperty}><p>
                <i className={this.state.liked ? 'fas fa-heart is-liked' : 'far fa-heart'}></i> Liked</p></Button>
            </div>
          </Container>
        </div>
        <Container className="property-container">
          <div className="property-header">
            <div className="title-info">
              <Title className="property-title">{this.state.property.title}</Title>
              <div className="property-overview">
                <span className="property-attribute"><p><i className="fas fa-dollar-sign"></i> {this.state.property.price} Month</p></span>
                <span className="property-attribute"><p><i className="fas fa-bed"></i> {this.state.property.numOfBeds} Bedrooms</p></span>
                <span className="property-attribute"><p><i className="fas fa-bath"></i> {this.state.property.numOfBaths} Bathroom</p></span>
              </div>
            </div>
            <div className="apply-button">
              <Button isColor='primary' onClick={() => this.onSendApplication()}><p>Send Application</p></Button>
            </div>
          </div>

          <Box className="description-box">
            <Subtitle isSize={5} className="description-subtitle">About this property</Subtitle>
            <p>
              {this.state.property.description}
              {/* Sunny and bright, 2 bedroom 1 bath Apartment in a great Berkeley 6-plex - Enjoy this cozy 2 Bedroom, 1 Bath Unit in Great 6-plex in Berkeley. Apartment is fully carpeted and newly painted. Kitchen has linoleum flooring, counter top and wood cabinets. Bathroom has linoleum flooring, vanity. This complex is centrally located in Berkeley just a short walk to Ashby BART, Sports Basement and San Pablo Park!! */}
            </p>
          </Box>
          <Subtitle isSize={5} className="description-subtitle">Features</Subtitle>
          <div className="property-features">
            <div className="columns is-multiline">
              <div className="column is-3 property-feature">
                <div className="feature-icon">
                  <i className="fas fa-home"></i>
                </div>
                <div className="feature-text">
                  <Subtitle isSize={6} className="description-subtitle">Type</Subtitle>
                  <p>Single Family</p>
                </div>
              </div>
              <div className="column is-3 property-feature">
                <div className="feature-icon">
                  <i className="fas fa-tshirt"></i>
                </div>
                <div className="feature-text">
                  <Subtitle isSize={6} className="description-subtitle">Laundry</Subtitle>
                  <p>
                    {this.state.property.laundry}
                    {/* In unit */}
                  </p>
                </div>
              </div>
              <div className="column is-3 property-feature">
                <div className="feature-icon">
                  <i className="fas fa-thermometer-half"></i>
                </div>
                <div className="feature-text">
                  <Subtitle isSize={6} className="description-subtitle">Heating</Subtitle>
                  <p>
                    {this.state.property.heating}
                    {/* Central */}
                  </p>
                </div>
              </div>
              <div className="column is-3 property-feature">
                <div className="feature-icon">
                  <i className="fas fa-snowflake"></i>
                </div>
                <div className="feature-text">
                  <Subtitle isSize={6} className="description-subtitle">Cooling</Subtitle>
                  <p>
                    {this.state.property.cooling}
                    {/* Central */}
                  </p>
                </div>
              </div>
              <div className="column is-3 property-feature">
                <div className="feature-icon">
                  <i className="fas fa-paw"></i>
                </div>
                <div className="feature-text">
                  <Subtitle isSize={6} className="description-subtitle">Pets</Subtitle>
                  <p>
                    {this.state.property.pets}
                    {/* Cats, Small dogs */}
                    </p>
                </div>
              </div>
              <div className="column is-3 property-feature">
                <div className="feature-icon">
                  <i className="fas fa-car"></i>
                </div>
                <div className="feature-text">
                  <Subtitle isSize={6} className="description-subtitle">Parking</Subtitle>
                  <p>
                    {this.state.property.parking}
                    {/* Covered */}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({auth, property}) => ({
  auth,
  property
})

const mapDispatchToProps = (dispatch) => ({
  onSendApplication:  bindActionCreators(sendApplication, dispatch),
  productTaste: bindActionCreators(productTaste, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Property);