import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import AdminLoginPage from './components/adminLoginPage/adminLoginPage.component';
import AdminPage from './pages/adminPage/admin.component';
import Passenger from './pages/passenger/passenger.component';
import StickyFooter from './components/footer/footer';

class App extends React.Component{
  constructor(){
    super()
    this.state={
        username:'',token:''
    }
}
handleSubmit=async(event,email,password)=>{
  event.preventDefault()
  event.persist()
 try{
   const axiosRes=await  axios.post('/admin/login',{
                                    data:{email,password},
                                    headers:{"Access-Control-Allow-Origin": "*"}
                                  })
  const {user,token}=axiosRes.data
 await this.setState({username:user.username,token})
}
catch(e){
  console.log("Sign in failed !")
}
}
  render(){
    return (
      <div>    
         <Header/>  
        <Switch>
          <Route path='/' exact component={Homepage}/>
          <Route path='/admin' render={()=>this.state.username=='admin'?<AdminPage token={this.state.token}/>:<AdminLoginPage username  handleSubmit={this.handleSubmit}/>}/> 
          <Route path='/passenger/:id' render={()=><div className="container"><Passenger/></div>}/>
          <Route render={()=><div>404-Error</div>} />
        </Switch>
        <StickyFooter/>
      </div>)
  }
}
export default App;
