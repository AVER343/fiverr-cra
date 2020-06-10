import React from 'react'
import { Link } from 'react-router-dom'
import * as logo from '../../assets/logo.png'
const Header =({username})=>{
    return(<div><img src={logo}/>
    {username=='admin'?"Sign OUT":"SignIn"}</div>)
}
export default Header