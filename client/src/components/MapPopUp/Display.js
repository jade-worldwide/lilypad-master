import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Image } from 'bloomer';
import 'bulma/css/bulma.css';
import './Display.css';


class Dispbox extends Component {

    render() {

        return (
            <div className="card">
            <Link to={"/property/" + this.props.link}>
                <div className="card-image">
                    <Image isRatio="2:1" src={this.props.image[0]} />
                </div>
                <div className="card-info">
                    <p className="card-header-title">{this.props.text}</p>
                </div>
                </Link>
            </div>
        )
    }
};

export default Dispbox;
