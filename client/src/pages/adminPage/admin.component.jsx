import React from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import { SignInContainer } from '../../components/adminLoginPage/adminLoginPage.styles'
import PassengerInfoComponent from '../../components/passengerInfo/passenger.component'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonsBarContainer from './admin.styles'
import { Link } from 'react-router-dom'
class AdminPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            submit:false,
            image:null,
            passengers:0,
            passengersInfo:[],
            id:null,
            price:''
        }
    }
    fileChangedHandler = (event) => {
      event.persist()
      event.preventDefault()
      const file= event.target.files[0]
      this.setState({image:file})
      }      
    changePassengerInfo=async(event,index)=>{
            event.preventDefault()
            event.persist()
            const {name,value}=event.target
            this.setState(prevState => {
                let newObj= prevState.passengersInfo[index]
                newObj[name]=value           
                return {...prevState,newObj};                              
              })
            await this.setState({[name]:value})
      }
      handleChange=async (event)=>{
            event.preventDefault()
            event.persist()
            await this.setState({passengersInfo:this.state.passengersInfo.concat({})})
           await this.setState({passengers:this.state.passengers+1})
      }
      deleteChange=async(event)=>{
        event.preventDefault()
        event.persist()
        if(this.state.passengers<=0)
        {
            return 
        }
        await this.setState({passengersInfo:this.state.passengersInfo.splice(0,this.state.passengersInfo.length-1)})
        await this.setState({passengers:this.state.passengers-1})
      }
      onSubmit=async(event)=>{
        try{
          event.persist()
          event.preventDefault()
          const {image,passengersInfo,price}=this.state
          if(image==null)
          {
            toast.error('No image Attached', {
                          position: "bottom-center",
                          autoClose: 3000,
                          hideProgressBar:true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          });
                          return
          }
          if(passengersInfo.length<1)
          {
            toast.error('No Passenger found !', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              });
              return
          }
          const data = new FormData()
          data.append('files', image)
          data.append('passengers',JSON.stringify(passengersInfo))
          data.append('price',price)
          const posted=await axios.post("admin/passenger", data,{ headers:{'Authorization':`Bearer ${this.props.token}`,"Content-Type": "multipart/form-data"}})
         if(posted.status==200){ this.setState({id:posted.data.id,submit:true})}
         toast.success('Data Successfully saved !', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
        
      }
      catch(e){
          toast.error(`Something went wrong !`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            return 
      }
      }
    render(){
        return(<div className='container'>
            <form onSubmit={this.onSubmit}>
                <FormInput type='file' imageFieldName={'image'} onChange={this.fileChangedHandler} ></FormInput>
                    Passengers :{this.state.passengers}
               <ButtonsBarContainer>
               <CustomButton onClick={this.handleChange} value={this.state.passengers}  name={this.state.passengers}>+Passenger</CustomButton>
                <CustomButton onClick={this.deleteChange} value={this.state.passengers}  name={this.state.passengers}>-Passenger</CustomButton>
               </ButtonsBarContainer>
               {console.log(this.state)}
                {this.state.passengersInfo.map((info,key)=><PassengerInfoComponent index={key} key={key} handleChange={this.changePassengerInfo} state={this.state.passengersInfo[key]}/>)}
                <FormInput type='number' onChange={(event)=>{event.persist();event.preventDefault();this.setState({price:event.target.value})}} name={'price'} required value={this.state.price} label={'price'}/>
             <div style={{marginLeft:"35%" ,marginTop:`1%`}}><CustomButton type="submit">SUBMIT</CustomButton></div>
             
             {this.state.submit? <div>
             <Alert variant="success">
                <Alert.Heading>URL to be sent is:</Alert.Heading>
                <p>
                </p>
                <hr />
                <p className="mb-0">
                https://skyluxbookings.herokuapp.com/passenger/{this.state.id?this.state.id:null}
                <br/>
                <Link to={`https://skyluxbookings.herokuapp.com/passengers/${this.state.id}`}><button>URL</button></Link>
                </p>
              </Alert>
             </div>:null}
            </form>
            <ToastContainer />
            </div> )
    }
}
export default AdminPage
