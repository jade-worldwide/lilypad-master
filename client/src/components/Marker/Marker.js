import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import "./Marker.css";
import Dispbox from '../MapPopUp/Display.js'


class Marker extends Component {

    render() {
        return (
            <div className="lily" onClick={this.props.onClick}>
                {/* Replace src={lilypad} with whatever icon that you want */}
                <img width="20px" alt="" src={this.props.markerImage} />
                {
                    this.props.isBoxVisible ? (
                        <Dispbox
                            text={this.props.text}
                            image={this.props.image}
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
