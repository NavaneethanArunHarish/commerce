import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label,Form,Input,Accordion,Button,Transition } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import './userDashboard.css';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class AccountDetails extends Component {
  constructor(props) {
  super(props);
  this.state = {
    activeIndex : '',
    fn:'',
    ln:'',
    showLoader:true,
    visible:false,
    currentUserEmail:'',
    userFirstName:'',
    userLastName:'',
    wholeUserObj:''
  }
  this.saveUserData =  this.saveUserData.bind(this);
}

componentWillMount() {
  console.log('this.props.email in accountDetails will mount ',this.props.email);
  this.setState({currentUserEmail:this.props.email});
  this.props.userActions.getUserData(this.props.email);
}

componentWillReceiveProps(next) {
  var userData = next.userData;
  this.setState({visible:false});
  if(userData != null && userData != undefined){
    var fn = userData.firstName;
    var ln = userData.lastName;
    if(userData.profile !=null && userData.firstName == null){
      console.log('in if of will');
      var name = userData.profile.name;
      var nameArr =name.split(/\s+/);
      var first_name = nameArr.slice(0, -1).join(" ");
      var last_name = nameArr.pop();
      var fn = first_name;
      var ln = last_name;
    }else{
      console.log('in else of will');
    }
    this.setState({
      fn:fn,
      ln:ln,
      showLoader:false,
      visible:false,
      userFirstName:fn,
      userLastName:ln,
      wholeUserObj:userData
    });
  }
}

saveUserData() {
  var first_name  = this.state.userFirstName;
  var last_name = this.state.userLastName;
  this.setState({visible:true});
  console.log('billing fn ', this.state.wholeUserObj.billingAddress.firstName);
  console.log('shipping fn ', this.state.wholeUserObj.shippingAddress.firstName);
  if(this.state.wholeUserObj.billingAddress.firstName == null && this.state.wholeUserObj.shippingAddress.lastName == null){
    var userObj = {
      _id:this.props.userId,
      firstName: first_name,
      lastName:last_name,
      billingAddress:{
        firstName: first_name,
        lastName:last_name
      },
      shippingAddress:{
        firstName: first_name,
        lastName:last_name
      }
    };
  }else{
    var userObj = {
      _id:this.props.userId,
      firstName: first_name,
      lastName:last_name
    };
  }
  console.log('use obj ',userObj);
  this.props.userActions.updateUser(userObj);
}

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }


  render() {
    return (
    <div style={{height:this.props.height}}>
    <Transition  animation='fly right' visible={this.state.visible} duration='2000'>
    <div style={{textAlign:'center',color:'orange'}}>
     <Image centered size='small' src='http://icons.iconarchive.com/icons/matiasam/ios7-style/256/Clear-Tick-icon.png' />
     <h2>Your Profile has been Updated</h2>
     </div>
    </Transition>
    {this.state.showLoader ?
      <div>
      <Image src='https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif' fluid />
      </div>
    :
    <Grid   style={{marginTop:'50px'}}>
      <Grid.Row columns={2} className='account-setup'>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>FIRST NAME*</p>
          <Input fluid defaultValue={this.state.userFirstName} onChange={(e, { value }) => this.setState({ userFirstName:value })} style={{width:'100%'}}/>
          </Grid.Column>
          <Grid.Column>
           <p style={{color:'black',fontWeight:'bold'}}>LAST NAME*</p>
           <Input fluid defaultValue={this.state.userLastName} onChange={(e, { value }) => this.setState({ userLastName:value })}  style={{width:'100%'}}/>
           </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black',fontWeight:'bold'}}>EMAIL ADDRESS*</p>
          <Input fluid defaultValue={this.props.email} style={{width:'100%'}}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
      <Accordion style={{width:'100%'}}>
        <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          <span style={{color:'black',fontWeight:'bold'}}>PASSWORD CHANGE</span>
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <Grid.Column>
          <div style={{marginTop:'15px'}}>
          <p style={{color:'black',fontWeight:'bold',opacity:'0.7'}}>CURRENT PASSWORD (LEAVE BLANK TO LEAVE UNCHANGED)</p>
          <Input fluid style={{width:'100%'}}/>
          </div>
          <div style={{marginTop:'15px'}}>
          <p style={{color:'black',fontWeight:'bold',opacity:'0.7'}}>NEW PASSWORD (LEAVE BLANK TO LEAVE UNCHANGED)</p>
          <Input fluid style={{width:'100%'}}/>
          </div>
          <div style={{marginTop:'15px'}}>
          <p style={{color:'black',fontWeight:'bold',opacity:'0.7'}}>CONFIRM NEW PASSWORD</p>
          <Input fluid style={{width:'100%'}}/>
          </div>
          </Grid.Column>
        </Accordion.Content>
       </Accordion>
       <div>
       <Button style={{marginTop:'20px'}} id="log-btn" type="submit" onClick={this.saveUserData}>SAVE CHANGES</Button>
       </div>
      </Grid.Row>
    </Grid>
  }
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData:state.user.userDataResponse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountDetails);
