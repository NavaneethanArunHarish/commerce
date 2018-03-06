import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label,List } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import EditBillingAddress from './editBillingAddress';
import EditShippingAddress from './editShippingAddress';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddressComponent extends Component {
  constructor(props) {
  super(props);
  this.state =  {
     showDefault:true,
     editBillingAddress:false,
     editShippingAddress:false,
     isBillingAddressEmpty:true,
     showAddress:false,
     showAddress2:false,
     showLoader:false,
     billingAddress: {
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
      email:''
    },

    shippingAddress: {
    firstName:'',
    lastName:'',
    companyName:'',
    country:'',
    address1:'',
    address2:'',
    town:'',
    stateCountry:'',
    postCode:'',
    email:''
    }

  }
  this.editBillingAddress = this.editBillingAddress.bind(this);
  this.editShippingAddress = this.editShippingAddress.bind(this);
  this.showDefaultAddress = this.showDefaultAddress.bind(this);
}

componentWillMount() {
  this.props.userActions.getUserData(this.props.email);
  this.setState({showLoader:true});
}

componentWillReceiveProps(next) {
  var userData = next.userDataResponse;
  if(next.userDataResponse != undefined && next.userDataResponse != null){
    this.setState({
      shippingAddress:next.userDataResponse.shippingAddress,
      billingAddress:next.userDataResponse.billingAddress,
      showLoader:false
    });
    if(userData.billingAddress.country != '' && userData.billingAddress.country != null && userData.billingAddress.country != undefined) {
      this.setState({showAddress:true});
      this.setState({
        shippingAddress:next.userDataResponse.shippingAddress,
        billingAddress:next.userDataResponse.billingAddress,
        showLoader:false
      });
    }
    if(userData.shippingAddress.country != '' && userData.shippingAddress.country != null && userData.shippingAddress.country != undefined) {
      this.setState({showAddress2:true});
      this.setState({
        shippingAddress:next.userDataResponse.shippingAddress,
        billingAddress:next.userDataResponse.billingAddress,
        showLoader:false
      });
    }
  }

}


editBillingAddress() {
  this.setState({
    showDefault:false,
    editBillingAddress:true,
    editShippingAddress:false
  });
  this.props.showEdit;
}

editShippingAddress() {
  this.setState({
    showDefault:false,
    editBillingAddress:false,
    editShippingAddress:true
  });
  this.props.showEdit;
}

showDefaultAddress(addressData) {
  this.setState({
    showDefault:true,
    editBillingAddress:false,
    editShippingAddress:false
  });
  this.props.userActions.getUserData(this.props.email);
  this.setState({showLoader:true});
}

  render() {
    var ht = this.props.height+"px";
    return (
      <div>
      {this.state.showLoader ?
        <div>
        <Image src='https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif' fluid />
        </div>
        :
      <div style={{height:ht}}>
      {this.state.showDefault && !this.state.editBillingAddress && !this.state.editShippingAddress ?
        <div>
      <Segment basic style={{marginTop:'10%'}}>
      <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
            <p className='add-address-header'>The following addresses will be used on the checkout page by default.</p>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{marginTop:'10%'}}>
           <Grid.Column>
           <Segment basic>
               <span className='address-segment-headers'>Billing address</span>
               <a style={{cursor: 'pointer'}} className='address-segment-headers-edit' onClick={this.editBillingAddress}>Edit</a>
             </Segment>
             {this.state.showAddress ?
               <List style={{marginLeft:'2%'}}>
                  <List.Item>
                    {this.state.billingAddress.companyName}
                  </List.Item>
                  <List.Item>
                    {this.state.billingAddress.firstName} {this.state.billingAddress.lastName}
                  </List.Item>
                  <List.Item>
                    {this.state.billingAddress.buidingDetails}
                  </List.Item>
                  <List.Item>
                    {this.state.billingAddress.streetDetails}
                  </List.Item>
                  <List.Item>
                    {this.state.billingAddress.town} - {this.state.billingAddress.postCode}
                  </List.Item>
                  <List.Item>
                    {this.state.billingAddress.stateCountry}
                  </List.Item>
                  <List.Item>
                    {this.state.billingAddress.country}
                  </List.Item>
                </List>
               :
               <span className='add-address-header-body'>You have not set up this type of address yet.</span>
             }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{marginTop:'5%'}}>
           <Grid.Column>
           <Segment basic>
               <span className='address-segment-headers'>Shipping address</span>
               <a style={{cursor: 'pointer'}} className='address-segment-headers-edit2' onClick={this.editShippingAddress}>Edit</a>
             </Segment>
             {this.state.showAddress ?
               <List style={{marginLeft:'2%'}}>
                  <List.Item>
                    {this.state.shippingAddress.companyName}
                  </List.Item>
                  <List.Item>
                    {this.state.shippingAddress.firstName} {this.state.shippingAddress.lastName}
                  </List.Item>
                  <List.Item>
                    {this.state.shippingAddress.buidingDetails}
                  </List.Item>
                  <List.Item>
                    {this.state.shippingAddress.streetDetails}
                  </List.Item>
                  <List.Item>
                    {this.state.shippingAddress.town} - {this.state.shippingAddress.postCode}
                  </List.Item>
                  <List.Item>
                    {this.state.shippingAddress.stateCountry}
                  </List.Item>
                  <List.Item>
                    {this.state.shippingAddress.country}
                  </List.Item>
                </List>
               :
               <span className='add-address-header-body'>You have not set up this type of address yet.</span>
             }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
        </div>
        :
        <div></div>
      }
      {!this.state.showDefault && this.state.editBillingAddress && !this.state.editShippingAddress ?
        <EditBillingAddress height={ht} email={this.props.email} userId={this.props.userId} parentMethod={this.showDefaultAddress}/>
        :
        <div></div>
      }
      {!this.state.showDefault && !this.state.editBillingAddress && this.state.editShippingAddress ?
        <EditShippingAddress height={ht} email={this.props.email} userId={this.props.userId} parentMethod={this.showDefaultAddress} />
        :
        <div></div>
      }
      </div>
    }
    </div>
    );
  }
}

//export default AddressComponent;

function mapStateToProps(state) {
return {
    userDataResponse:state.user.userDataResponse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddressComponent);
