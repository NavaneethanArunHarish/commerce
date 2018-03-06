import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label,Form,Input,Accordion,Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import './userDashboard.css';
import { allCountry as countryOptions } from './countryCodesJson';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class EditShippingAddress extends Component {
  constructor(props) {
  super(props);
  this.state = {
    activeIndex : '',
    firstName:'',
    lastName:'',
    companyName:'',
    country:'',
    buidingDetails:'',
    streetDetails:'',
    town:'',
    stateCountry:'',
    postCode:'',
    phone:'',
    emailAddress:this.props.email,
    defaultFn:'',
    defaultLn:'',
    showLoader:true,
    shippingAddress:''
  }
  this.saveShippingAddress = this.saveShippingAddress.bind(this);
}


  componentWillMount() {
    this.props.userActions.getUserData(this.props.email);
    console.log('this.mail ',this.props.email);
  }

  componentWillReceiveProps(next) {
    var shippingData = next.userDataResponse;
    var shippingResponse = next.shippingResponse;
    if(shippingData != undefined){
      this.setState({shippingAddress:shippingData,showLoader:false});
      this.setState({
        firstName:shippingData.shippingAddress.firstName,
        lastName:shippingData.shippingAddress.lastName,
        companyName:shippingData.shippingAddress.companyName,
        country:shippingData.shippingAddress.country,
        buidingDetails:shippingData.shippingAddress.buidingDetails,
        streetDetails:shippingData.shippingAddress.streetDetails,
        town:shippingData.shippingAddress.town,
        stateCountry:shippingData.shippingAddress.stateCountry,
        postCode:shippingData.shippingAddress.postCode
      })
    }
    if(shippingResponse != undefined) {
      this.setState({shippingAddress:shippingResponse,showLoader:false});
      this.setState({
        firstName:shippingResponse.shippingAddress.firstName,
        lastName:shippingResponse.shippingAddress.lastName,
        companyName:shippingResponse.shippingAddress.companyName,
        country:shippingResponse.shippingAddress.country,
        buidingDetails:shippingResponse.shippingAddress.buidingDetails,
        streetDetails:shippingResponse.shippingAddress.streetDetails,
        town:shippingResponse.shippingAddress.town,
        stateCountry:shippingResponse.shippingAddress.stateCountry,
        postCode:shippingResponse.shippingAddress.postCode
      })
    }
  }

  saveShippingAddress(e) {
    e.preventDefault();
    var data = {
      _id:this.props.userId,
      shippingAddress: {
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        companyName:this.state.companyName,
        country:this.state.country,
        buidingDetails:this.state.buidingDetails,
        streetDetails:this.state.streetDetails,
        town:this.state.town,
        stateCountry:this.state.stateCountry,
        postCode:this.state.postCode
      }

    };
    this.props.userActions.saveShippingAddress(data);
    this.props.parentMethod();
}


  render() {
    return (
    <div style={{height:this.props.height}}>
    {this.state.showLoader ?
      <div>
      <Image src='https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif' fluid />
      </div>
      :
    <Grid   style={{marginTop:'50px'}}>
    <span className='address-segment-headers'>Shippping address</span>
      <Grid.Row columns={2} className='account-setup'>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>FIRST NAME*</p>
          <Input fluid  defaultValue={this.state.firstName} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ firstName:value })}/>
          </Grid.Column>
          <Grid.Column>
           <p style={{color:'black',fontWeight:'bold'}}>LAST NAME*</p>
           <Input fluid defaultValue={this.state.lastName} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ lastName:value })}/>
           </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>COMPANY NAME*</p>
          <Input fluid  defaultValue={this.state.companyName} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ companyName:value })}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>COUNTRY*</p>
          <Dropdown placeholder='Select Country' fluid defaultValue={this.state.country} search selection options={countryOptions} onChange={(e, { value }) => this.setState({ country:value })}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>STREET ADDRESS*</p>
          <Input placeholder='House number and street name' fluid style={{width:'100%'}} defaultValue={this.state.buidingDetails} onChange={(e, { value }) => this.setState({ buidingDetails:value })}/>
          <Input placeholder='Apartment, Suite,unit etc. (optional)' fluid defaultValue={this.state.streetDetails} style={{width:'100%',marginTop:"2%"}} onChange={(e, { value }) => this.setState({ streetDetails:value })}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>TOWN / CITY</p>
          <Input fluid defaultValue={this.state.town} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ town:value })}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>STATE / COUNTRY</p>
          <Input fluid defaultValue={this.state.stateCountry} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ stateCountry:value })}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>POSTCODE / ZIP</p>
          <Input fluid defaultValue={this.state.postCode} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ postCode:value })}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
       <div>
       <Button style={{marginTop:'20px'}} id="log-btn" type="submit" onClick={this.saveShippingAddress}>SAVE ADDRESS</Button>
       </div>
      </Grid.Row>
      <div style={{height:'100px',backgroundColor:'transparent'}}></div>
    </Grid>
  }
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDataResponse:state.user.userDataResponse,
    shippingResponse:state.user.shippingResponse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditShippingAddress);
