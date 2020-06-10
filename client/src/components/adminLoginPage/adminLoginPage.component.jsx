import React from 'react'
import {SignInContainer,SignInTitle} from './adminLoginPage.styles'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
class AdminLoginPage extends React.Component{
        constructor(props){
            super(props)
            this.state={
                email:'',
                password:''
            }
        }
        handleChange=async (event)=>{
            event.persist()
            const {name,value}=event.target
            await this.setState({[name]:value})
        }
        localHandleSubmit=async(event)=>{
            this.props.handleSubmit(event,this.state.email,this.state.password)
        }
        render(){
            return(<SignInContainer style={{marginLeft:'30%',marginTop:'5%',marginRight:'20%'}}>
            <SignInTitle>Admin Access</SignInTitle>
            <span><b>Sign in with your email and password</b></span><form onSubmit={this.localHandleSubmit}>
                <FormInput 
                    required
                    handleChange={this.handleChange} 
                    label='EMAIL' 
                    name='email'   
                    value={this.state.email}/>
                <FormInput 
                    required
                    handleChange={this.handleChange} 
                    label='PASSWORD' 
                    name='password'   
                    value={this.state.password}/>
                <CustomButton type="submit">SIGN IN</CustomButton>
                </form></SignInContainer>)
        }
}
export default AdminLoginPage