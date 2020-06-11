import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as logo from '../../assets/logo.png'
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = (props) => (
  <HeaderContainer>
    <LogoContainer to='/'>
     <img src={logo}/>
    </LogoContainer>
    <OptionsContainer>
      {/* <OptionLink to='/shop'></OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink> */}
      {props.username=='admin' ? (
        <OptionLink as='div' onClick={() =>console.log("Logging OUt")}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/admin'>SIGN IN</OptionLink>
      )}
    </OptionsContainer>
  </HeaderContainer>
);
export default withRouter(Header);