import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import "./Marker.css";
import Dispbox from '../MapPopUp/Display.js'

class Marker extends Component {

    render() {
        return (
            <div className="lily" onClick={this.props.onClick}>
                {/* Replace src={lilypad} with whatever icon that you want */}
                <img width="20px" alt="" src={this.props.image} /> 
                {
                    this.props.isBoxVisible ? (
                        <Dispbox 
                            text={this.props.text}
                            photo={this.props.photos}
                            className="card"
                            link={this.props.link}
                        ></Dispbox>
                    ) : ''
                }
            </div>
        );
    }
};
export default Marker;