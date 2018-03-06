import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label,Form,Input,Accordion,Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import './userDashboard.css';
import { allCountry as countryOptions } from './countryCodesJson';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class EditBillingAddress extends Component {
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
    showLoader:true
  }
  this.saveBillingAddress = this.saveBillingAddress.bind(this);
}

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  componentWillMount() {
    this.props.userActions.getUserData(this.props.email);
    console.log('this.mail ',this.props.email);
  }

  componentWillReceiveProps(next) {
    console.log('address----------->probs',next.userDataResponse);
    var billingData = next.userDataResponse;
    var billingResponse = next.billingResponse;
    if(billingData != undefined){
      this.setState({billingAddress:billingData,showLoader:false});
      this.setState({
        firstName:billingData.billingAddress.firstName,
        lastName:billingData.billingAddress.lastName,
        companyName:billingData.billingAddress.companyName,
        country:billingData.billingAddress.country,
        buidingDetails:billingData.billingAddress.buidingDetails,
        streetDetails:billingData.billingAddress.streetDetails,
        town:billingData.billingAddress.town,
        stateCountry:billingData.billingAddress.stateCountry,
        postCode:billingData.billingAddress.postCode,
        phone:billingData.billingAddress.phone,
        email:billingData.billingAddress.emailAddress
      })
    }
    if(billingResponse != undefined) {
      this.setState({billingAddress:billingResponse,showLoader:false});
      this.setState({
        firstName:billingResponse.billingAddress.firstName,
        lastName:billingResponse.billingAddress.lastName,
        companyName:billingResponse.billingAddress.companyName,
        country:billingResponse.billingAddress.country,
        buidingDetails:billingResponse.billingAddress.buidingDetails,
        streetDetails:billingResponse.billingAddress.streetDetails,
        town:billingResponse.billingAddress.town,
        stateCountry:billingResponse.billingAddress.stateCountry,
        postCode:billingResponse.billingAddress.postCode,
        phone:billingResponse.billingAddress.phone,
        email:billingResponse.billingAddress.emailAddress
      })
    }
  }

  saveBillingAddress(e) {
    e.preventDefault();
    var data = {
      _id:this.props.userId,
      billingAddress: {
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        companyName:this.state.companyName,
        country:this.state.country,
        buidingDetails:this.state.buidingDetails,
        streetDetails:this.state.streetDetails,
        town:this.state.town,
        stateCountry:this.state.stateCountry,
        postCode:this.state.postCode,
        phone:this.state.phone,
        email:this.state.emailAddress
      }

    };
    this.props.userActions.saveBillingAddress(data);
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
    <span className='address-segment-headers'>Billing address</span>
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
      <Grid.Row columns={2} className='account-setup'>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>PHONE*</p>
          <Input fluid defaultValue={this.state.phone} style={{width:'100%'}} onChange={(e, { value }) => this.setState({ phone:value })}/>
          </Grid.Column>
          <Grid.Column>
           <p style={{color:'black',fontWeight:'bold'}}>EMAIL ADDRESS*</p>
           <Input fluid defaultValue={this.props.email}  style={{width:'100%'}} onChange={(e, { value }) => this.setState({ emailAddress:value })}/>
           </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
       <div>
       <Button style={{marginTop:'20px'}} id="log-btn" type="submit" onClick={this.saveBillingAddress}>SAVE ADDRESS</Button>
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
  console.log("user1---------->",state.user)
  console.log("user2---------->",state.user.userDataResponse)
  return {
    userDataResponse:state.user.userDataResponse,
    billingResponse:state.user.billingResponse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditBillingAddress);
