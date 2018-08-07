import React from "react";
import { Hero, HeroBody, Container, Title } from 'bloomer';
import 'bulma/css/bulma.css';
import "./MainHero.css";
import background from './background.svg';

const bgImage = { backgroundImage: `url(${background})` }

export const MainHero = props => (

  <Hero isSize='medium' isFullHeight style={bgImage} className="main-hero">

    <HeroBody>

      <Container className="hero-container">
        <Title>Let the perfect home find you!</Title>
        {props.children}
      </Container>
    </HeroBody>

  </Hero>

);
