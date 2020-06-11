import React from 'react'
import axios from 'axios'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import { SignInContainer } from '../../components/adminLoginPage/adminLoginPage.styles'
import PassengerInfoComponent from '../../components/passengerInfo/passenger.component'
import ButtonsBarContainer ,{WarningContainer} from './passenger.styles'
import StripeCheckoutButton from '../../components/stripe/stripe.component'
import { toast,ToastContainer } from 'react-toastify'
class Passenger extends React.Component{
    constructor(props){
        super(props)
        this.state={
            image:null,
            passengers:0,
            value:'',
            passengersInfo:[],
            booked:false,
            visible:false,
            price:0
        }
    }
    
    onToken =async token => {
   try{ 
       console.log(token)
    await this.setState({booked:true,visible:true})
    toast.success('Payment Successful !', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        await axios.patch(`passenger/${this.props.match.params.id}`,{passengers:JSON.stringify(this.state.passengersInfo)});
    }
    catch(e)
    {
        toast.error('Payment Failed !', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            }); 
        await this.setState({booked:false})
            return
    }
  };
    changePassengerInfo=async(event,index)=>{
        event.preventDefault()
        event.persist()
        const {name,value}=event.target
        this.setState(prevState => {
           prevState.passengersInfo[index][name]=value
            return prevState;                              
          })
        await this.setState({[name]:value})
        console.log(this.state)
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
  onSubmit=async (event)=>{
  try{ event.persist()
    event.preventDefault()
    if(this.state.booked==false)
    {
        return
    }
    const data=new FormData()
    await axios.patch(`passenger/${this.props.match.params.id}`,{passengers:JSON.stringify(this.state.passengersInfo)});
    await this.setState({visible:false})
  }
      catch(e){
          console.log(e)
        toast.error('Server error !', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            }); 
      }
}
async componentDidMount (){
       const axiosRes=await axios.get(`passengers/${this.props.match.params.id}`)
        axiosRes.data.bookingInfo.passengers[0].date= axiosRes.data.bookingInfo.passengers[0].date.split('T')[0]
       const {bookingInfo} =axiosRes.data
       console.log(bookingInfo)
        await this.setState({price:bookingInfo.price,image:bookingInfo.image,passengersInfo:bookingInfo.passengers,passengers:bookingInfo.passengers.length,booked:bookingInfo.booked})
    }
   Example = () => <img src={`data:image/jpeg;base64,${this.state.image}`} />
    render(){
        return(<div className="container">
        <form onSubmit={this.onSubmit}>
            {<this.Example style={{width:'80%',margineLeft:'5%',marginRight:'5%'}}></this.Example>}
                Passengers :{this.state.passengers}
            <ButtonsBarContainer>
                </ButtonsBarContainer>
                
                {this.state.passengersInfo.map((info,key)=><PassengerInfoComponent index={key} key={key} handleChange={this.changePassengerInfo} state={this.state.passengersInfo[key]}/>)}
                {this.state.booked?null:<StripeCheckoutButton price={this.state.price} disabled={this.state.booked} onToken={this.onToken}></StripeCheckoutButton>}

               <WarningContainer>
                    *Please use the following test credit card for payments*
                    <br />
                    4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
                </WarningContainer>
                {this.state.visible?<input type="submit" />:null}
                <ToastContainer />
        </form>
    </div>)
    }
}

export default Passenger    
    