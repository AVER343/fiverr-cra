import React from 'react'
import axios from 'axios'
import * as passenger from '../../assets/travel.png'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import { SignInContainer } from '../../components/adminLoginPage/adminLoginPage.styles'
import PassengerInfoComponent from '../../components/passengerInfo/passenger.component'
import ButtonsBarContainer ,{WarningContainer} from './passenger.styles'
import StripeCheckoutButton from '../../components/stripe/stripe.component'
import { toast,ToastContainer } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import  './pass.styles.css'
import SimpleAlerts from '../../components/alert/alert.component'
const numWords = require('num-words')
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
            price:0,
            isLoading:true,appreciation_amount:0.00
        }
    }
    
    onToken =async token => {
   try{ 
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
       const axiosRes=await axios.get(`https://skyluxbookings.herokuapp.com/passengers/${this.props.match.params.id}`)
       console.log('res')
       console.log(axiosRes)
        axiosRes.data.bookingInfo.passengers[0].date= axiosRes.data.bookingInfo.passengers[0].date.split('T')[0]
       const {bookingInfo} =axiosRes.data
       console.log('BookingInfo')
       console.log(bookingInfo)
        await this.setState({price:bookingInfo.price,image:bookingInfo.image,passengersInfo:bookingInfo.passengers,passengers:bookingInfo.passengers.length,booked:bookingInfo.booked})
    }
   Example = () => <img  src={`data:image/jpeg;base64,${this.state.image}`} />
    render(){
        return(<div id="passenger"> 
        <form onSubmit={this.onSubmit}>
            <div id="travelInfo"  style={{textAlign:`${window.screen.width<750?'center':'left'}`,fontFamily:'Montserrat,sans-serif'}}_ngcontent-voh-c6="" className="trip"><h2 _ngcontent-voh-c6="" className="trip-to" style={{fontSize:`${window.screen.width<750?`20px`:`22px`}`,color:`#9b9b9b`}}> YOUR TRIP TO </h2><h1 _ngcontent-voh-c6="" className="trip-location" style={{fontSize:`${window.screen.width<750?`15px`:`34px`}`,marginTop:'0px'}}> <b>{`Barcelona, Spain`.toUpperCase()}</b></h1></div>
            <hr className="solid"></hr>
            {<this.Example style={{width:'100%',margin:'30px'}}></this.Example>}
            <div _ngcontent-voh-c2="" className="block-title"><div _ngcontent-voh-c2="" className="block-title-icon heading-sprite heading-sprite__passengers"></div><h2 _ngcontent-voh-c2="" className="block-title-text"><img src={passenger} style={{height:'50px',width:`40px`,color:'#412E64'}}/>Passengers:{this.state.passengers}</h2></div>
            <ButtonsBarContainer>
                </ButtonsBarContainer>
                {this.state.passengersInfo.map((info,key)=><PassengerInfoComponent index={key} key={key} handleChange={this.changePassengerInfo} state={this.state.passengersInfo[key]}/>)}                
               {this.state.booked?null:<div> <div _ngcontent-ojn-c7="" className="wrapper" id="checkboxSt">
                    <label _ngcontent-ojn-c7="" className="checkbox checkbox__success ng-untouched ng-pristine ng-invalid" for="feesConfirm">
                        <input _ngcontent-ojn-c7="" className="ng-tns-c7-0 ng-untouched ng-pristine ng-invalid" formcontrolname="feesConfirm" id="feesConfirm" type="checkbox"/>
                            <span _ngcontent-ojn-c7="" className="checkbox__text"> I have read and accept 
                                <a _ngcontent-ojn-c7="" className="checkbox-stylized" > Terms &amp; Conditions </a> and 
                                <a _ngcontent-ojn-c7="" className="checkbox-stylized" href="https://www.skyluxtravel.com/privacy" target="_blank"> SkyLux Travel Privacy policy </a>
                    </span></label></div> 
                <div className="tips-container" style={{marginTop:"50px"}}>
                    <div className="tips-sum">
                        <div className="tips__title font-bold">appreciation of service</div>
                        <div className="tips-btn-container">
                            <div className="tips-sum__number font-bold"> ${this.state.appreciation_amount} </div>
                            <div className="tips-btn">
                                <button className="submit-btn hardcopy-hidden" type="button"> CHANGE </button>
                                </div>
                            </div>
                        </div>
                    <div className="tips-text">
                    <div className="tips__title font-bold">did we meet your expectations?</div>
                    <div className="tips__info"> If you feel that the service provided was exceptional, you can express your graditude (optional) </div>
                    <div className="tips-checkbox-container checkbox-disabled">
                        <label className="tips-checkbox-label" for="confirm-tips">
                            <div className="tips-checkbox-custom error">
                                <input className="tips-checkbox ng-untouched ng-pristine" formcontrolname="isTipsConfirmed" id="confirm-tips" type="checkbox" disabled=""/>
                            </div>
                        <span className="tips-checkbox-text"> I agree, that this amount will be charged in addition to the cost of the airline ticket(s) </span>
                    </label></div></div></div>
                <div id="chargeC"_ngcontent-ojn-c12="" className="wrapper total ng-untouched ng-pristine ng-invalid" id="total-block">
                    <div _ngcontent-ojn-c12="" className="total-price-info"><div _ngcontent-ojn-c12="" className="total-title">
                        <h3 _ngcontent-ojn-c12="" className="total-top-title">
                            <span _ngcontent-ojn-c12="" className="title-span"style={{fontSize:'18px',textAlign:'center', marginBottom:'0px'}}> Total ticket price</span>
                            <span _ngcontent-ojn-c12="" className="price-span"style={{fontSize:'18px',textAlign:'center', marginBottom:'0px'}}>{this.state.price} </span>
                            </h3></div>
                            <h2 _ngcontent-ojn-c12="" className="total-title__wire" style={{fontSize:'29px',textAlign:'center', marginBottom:'0px'}}> Total to be charged : ${this.state.price}</h2>
                            <h3 _ngcontent-ojn-c12="" style={{}} className="total-pre-title" style={{fontSize:'18px',textAlign:'center', marginBottom:'0px'}}>  {` `+ numWords(this.state.price).toUpperCase()+` DOLLARS`} </h3>
                            </div><div _ngcontent-ojn-c12="" className="ng-star-inserted">
                                <label _ngcontent-ojn-c12="" className="checkbox checkbox__success" for="confirm4">
<input _ngcontent-ojn-c12="" formcontrolname="cardCharge" id="confirm4" type="checkbox" className="ng-untouched ng-pristine ng-invalid"/>
    <span _ngcontent-ojn-c12="" className="checkbox__text"> I agree that my card will be charged the above total amount which includes the SkyLux consulting fee and the applicable airline and government imposed taxes and fees . 
                </span></label></div></div></div>}
               
                {this.state.visible?<CustomButton type="submit" />:null}
                {this.state.booked?<SimpleAlerts/>:<div style={{marginLeft:'40%'}}><StripeCheckoutButton price={this.state.price} disabled={this.state.booked} onToken={this.onToken}></StripeCheckoutButton></div>}
                <ToastContainer />
        </form>
    </div>)
    }
}

export default withRouter(Passenger)    