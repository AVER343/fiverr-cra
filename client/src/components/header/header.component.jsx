import React from 'react'
import { Link } from 'react-router-dom'
import * as logo from '../../assets/logo.png'
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ username }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
     <img src={logo}/>
    </LogoContainer>
    <OptionsContainer>
      {/* <OptionLink to='/shop'></OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink> */}
      {username=='admin' ? (
        <OptionLink as='div' onClick={() =>console.log("Logging OUt")}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/admin'>SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
  </HeaderContainer>
);
export default Header;