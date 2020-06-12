import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as logo from '../../assets/logo.png'
import './styles.css'
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = (props) => (
  <div style={{width:`100%`}}>
  <div _ngcontent-voh-c5="" id="header" className="wrapper header">
    <div _ngcontent-voh-c5="">
          <img _ngcontent-voh-c5="" alt="" src={logo}/>
    </div>
    <div _ngcontent-voh-c5="">
      <a _ngcontent-voh-c5="" className="main-phone" href="tel:(855) 861-8284">
          <p _ngcontent-voh-c5="" style={{color:'#9b9b9b',textAlign:'center'}}> USA/canada </p>
          <span _ngcontent-voh-c5="" className="main-phone-number" style={{color:'red',fontSize:'13px'}}> (855) 861-8284 </span>
      </a>
    </div>
    {window.screen.width<750?null:<div _ngcontent-voh-c5="" className="header-phones hidden-xs">
        {console.log(window.screen.width)}
        <div _ngcontent-voh-c5="">
          <span _ngcontent-voh-c5="" className="header-phones-region" style={{color:'#9b9b9b'}}> (UK) </span>
          <a _ngcontent-voh-c5="" className="header-phones-number" href="tel:0800-610-1575"> 0800-610-1575 </a>
        </div>
        <div _ngcontent-voh-c5="">
            <span _ngcontent-voh-c5="" className="header-phones-region"style={{color:'#9b9b9b'}}> (SG) </span>
            <a _ngcontent-voh-c5="" className="header-phones-number" href="tel:3159 0672"> 3159 0672 </a>
        </div>
        <div _ngcontent-voh-c5="">
            <span _ngcontent-voh-c5="" className="header-phones-region"style={{color:'#9b9b9b'}}> (AU) </span>
            <a _ngcontent-voh-c5="" className="header-phones-number" href="tel:1-800-049-505"> 1-800-049-505 </a>
        </div>
        <div _ngcontent-voh-c5=""><span _ngcontent-voh-c5="" className="header-phones-region"style={{color:'#9b9b9b'}}> (HK) </span>
            <a _ngcontent-voh-c5="" className="header-phones-number" href="tel:5808 6148"> 5808 6148 </a>
        </div>  
        <div _ngcontent-voh-c5="" className="ng-star-inserted"> (ext 25242) </div>
    </div>}
   {window.screen.width<750?null:<div _ngcontent-voh-c5="" className="hidden-sm text-center">
      <div _ngcontent-voh-c5="">Travel itinerary prepared by Austin Anderson</div>
      <a _ngcontent-voh-c5="" href="mailto:austin@skyluxtravel.com">austin@skyluxtravel.com</a>
    </div>}
    
  </div>
  {props.location.pathname.includes('/passenger')||props.location.pathname.includes('/admin')?null:<OptionsContainer style={{marginRight:'auto'}}>
      {/* <OptionLink to='/shop'></OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink> */}
      {props.username=='admin' ? (
        <OptionLink as='div' onClick={() =>console.log("Logging OUt")}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/admin' style={{backgroundColor: `#4CAF50`, /* Green */
          border: `none`,
          color: `white`,
          padding: `15px 32px`,
          textAlign: `right`,
          textDecoration: `none`,
          display: `inline-block`,
          fontSize: `16px`}}>SIGN IN</OptionLink>
      )}
    </OptionsContainer>}
   </div>
);
export default withRouter(Header);