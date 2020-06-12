import React from 'react'
import FormInput from '../form-input/form-input.component'
import MyComponent from '../dropdown/dropdown.compo'
const PassengerInfoComponent= (props)=>{
    const handleChange=async(event)=>{
        event.preventDefault()
        event.persist()
        props.handleChange(event,props.index)
    }
    return(
     <div className='conatiner' style={{margin:'20px'}} style={{ border:`3px solid gray`}}>
        <div style={{fontSize:'30px'}}>Passenger : {props.index + 1 }</div>
    <div className="row">
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" className="validate" required={true} label={'firstname'} value={props.state.firstname||''}  name={'firstname'} onChange={handleChange}/>
          <label htmlFor="icon_prefix">First Name</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" className="validate" label={'middleName'} value={props.state.middlename||''}  name={'middlename'} onChange={handleChange}/>
          <label htmlFor="icon_prefix">Middle Name</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" className="validate" required={true} label={'lastname'} value={props.state.lastname||''}  name={'lastname'} onChange={handleChange}/>
          <label htmlFor="icon_prefix">Last Name</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">email</i>
          <input id="email" type="email" className="validate" required={true} label={'email'} value={props.state.email||''}  name={'email'} onChange={handleChange}/>
          <label htmlFor="email">Email</label>
          <span className="helper-text" data-error="• Email address should look something like this - name@somesite.com." data-success="right">Helper text</span>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">calendar_today</i>
          <input id="icon_prefix" min="1928-01-01" max="2018-12-31" type="date" className="validate" required label={'date'} value={props.state.date||new Date()}  name={'date'} onChange={handleChange}/>
          <label htmlFor="icon_prefix">Date</label>
          <span className="helper-text" data-error="invalid date" data-success=""></span>
        </div>
       <div>     
       </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">phone</i>
          <input id="icon_telephone" type="tel" className="validate" label={'Phone'} required value={props.state.telephone||''}  name={'telephone'} onChange={handleChange}/>
          <label htmlFor="icon_telephone">Telephone</label>
        </div>
      </div>
      <div className="input-field col s12">
          <i className="material-icons prefix">info</i>
          <input id="icon_telephone" type="tel" className="validate" required label={'Gender'} required value={props.state.gender||''}  name={'gender'} onChange={handleChange}/>
          <label htmlFor="icon_telephone">Gender</label>
          <span className="helper-text" data-error="'Male' or 'Female'" data-success=""></span>
      </div>
      </div>
         <FormInput required label={'Firstname'} value={props.state.firstname||''}  name={'firstname'} onChange={handleChange}></FormInput>
         <FormInput required label={'Middlename'} required={false} value={props.state.middlename||''}  name={'middlename'} onChange={handleChange}></FormInput>
         <FormInput  required label={'Lastname'} value={props.state.lastname||''}  name={'lastname'} onChange={handleChange}></FormInput>
         <input id="email" type="email" className="validate" name="email" placeholder={'Email'} value={props.state.email||''}  onChange={handleChange}/>
          <label htmlFor="email">Email</label>
          <span className="helper-text" data-error="Invalid Email" data-success=""></span>
    </div>)
}
export default PassengerInfoComponent

