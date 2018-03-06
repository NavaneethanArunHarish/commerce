import React, { Component } from 'react';
import { Image,Container,Header,Segment,Divider,Grid,List,Menu } from 'semantic-ui-react';
import { StickyContainer, Sticky } from 'react-sticky';
import HeaderMain from '../constantComponents/header'
//import { Image } from 'semantic-ui-react';
import './userDashboard.css';
import DashboardData from './dashboardData';
import TemplateComponent from './template';
import AccountDetails from './accountDetails';
import AddressComponent from './addressComponent';
import queryString from 'query-string';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymentComponent from './paymentComponent';
import CryptoJS from 'crypto-js';


let i = 0;
class HeaderConst extends Component {
  render() {
    return (
      <div style={{ ...this.props.style, height: '50px',
        overflow: 'visible',
        background: 'white',
        zIndex:1,
        border:'none'}}>
        <HeaderMain />
      </div>
    );
  }
}

class userDashboard extends Component {
  constructor(props) {
  super(props);
  this.state = {
    width: '0',
    height: '0',
    userName:'',
    activeItem: 'ACCOUNT DETAILS',
    email:'',
    currentUserEmail:'',
    userId:'',
    fn:'',
    ln:''
  };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  this.handleItemClick = this.handleItemClick.bind(this);

}
handleItemClick(event,data) {
  this.setState({ activeItem: data.name });
}

componentWillMount() {
  //console.log('component props ',this.props);

  if(this.props.location.state != undefined) {
    var userEmail = this.props.location.state.userName;
    var nameAlone = userEmail.split("@")[0];
    var userId =  this.props.location.state.userId;
    this.setState({userName:nameAlone,email:userEmail,userId:userId,currentUserEmail:userEmail});
    //this.props.userActions.getUserData(userEmail);
    console.log('this is normal Login with ',userEmail);
  }else{
    var parsed = queryString.parse(this.props.location.search);
    var data = parsed.emailid;
    var userEmailSocial = data.replace(/\"/g, "");
    var nameAlone = userEmailSocial.split("@")[0];
    this.setState({userName:nameAlone,email:userEmailSocial,currentUserEmail:userEmailSocial});
    this.props.userActions.getUserData(userEmailSocial);
    console.log('this is social Login with ',userEmailSocial);
  }
}

componentWillReceiveProps(next) {
  var userData = next.userData;
  if(userData != null && userData != undefined ){
  if(userData.profile !=undefined){
    var name = userData.profile.name;
    var nameArr =name.split(/\s+/);
    var first_name = nameArr.slice(0, -1).join(" ");
    var last_name = nameArr.pop();
    this.setState({fn:first_name,ln:last_name,userId:userData._id});
    if(userData.firstName === null && userData.lastName === null){
      console.log('auto profile update from social media')
      var userObj = {
        _id:userData._id,
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
      this.props.userActions.updateUser(userObj);
     }else{
     console.log('user is already heaving updated data so no need of auto updation')
    }
  }
}
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}



  render() {
  var ht = this.state.height+"px";
    return (
   <div style={{ border:'none' }}>
        <StickyContainer style={{background: 'transparent',border:'none'}}>
          <Sticky style={{ border:'none' }}>
            {
              ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                return <HeaderConst style={style} />
              }
            }
          </Sticky>
     <div className="backgroundCss">
    <Grid columns={3} relaxed >
        <Grid.Column width='4' style={{height:ht}}>
          <Segment basic style={{marginTop:'50%',marginLeft:'20%'}}>
          <List>
            <Menu pointing secondary vertical>
              <List.Item style={{marginTop:'5px'}}>
                <List.Header>
                <Menu.Item style={{color:'orange'}} color='orange' value='DASHBOARD' name='DASHBOARD' active={this.state.activeItem === 'DASHBOARD'} onClick={this.handleItemClick} />
                </List.Header>
              </List.Item>
              <List.Item style={{marginTop:'5px'}}>
              <List.Header>
              <Menu.Item style={{color:'orange'}} color='orange' name='ORDERS' active={this.state.activeItem === 'ORDERS'} onClick={this.handleItemClick} />
              </List.Header>
              </List.Item>
              <List.Item style={{marginTop:'5px'}}>
              <List.Header>
              <Menu.Item style={{color:'orange'}} color='orange' name='DOWNLOADS' active={this.state.activeItem === 'DOWNLOADS'} onClick={this.handleItemClick} />
              </List.Header>
              </List.Item>
              <List.Item style={{marginTop:'5px'}}>
              <List.Header>
              <Menu.Item style={{color:'orange'}} color='orange' name='ADDRESSES' active={this.state.activeItem === 'ADDRESSES'} onClick={this.handleItemClick} />
              </List.Header>
              </List.Item>
              <List.Item style={{marginTop:'5px'}}>
              <List.Header>
              <Menu.Item style={{color:'orange'}} color='orange' name='PAYMENT METHODS' active={this.state.activeItem === 'PAYMENT METHODS'} onClick={this.handleItemClick} />
              </List.Header>
              </List.Item>
              <List.Item style={{marginTop:'5px'}}>
              <List.Header>
              <Menu.Item style={{color:'orange'}} color='orange' name='ACCOUNT DETAILS' active={this.state.activeItem === 'ACCOUNT DETAILS'} onClick={this.handleItemClick} />
              </List.Header>
              </List.Item>
              <List.Item style={{marginTop:'5px'}}>
              <List.Header>
              <a href='http://localhost:8080/logout'>
              <Menu.Item style={{color:'orange'}} color='orange' name='LOGOUT' active={this.state.activeItem === 'LOGOUT'} />
              </a>
              </List.Header>
              </List.Item>
              </Menu>
            </List>
          </Segment>
        </Grid.Column>
        <Divider vertical>Or</Divider>

        <Grid.Column width='10' style={{height:ht,overflowY:'scroll'}} className='custom-Row'>
        <h2 style={{fontSize:'80px',marginTop:'5px',marginLeft:"40px"}}>My Account</h2>
         {this.state.activeItem === 'DASHBOARD' ? <DashboardData userName={this.state.userName}/> : ""}
         {this.state.activeItem === 'ORDERS' ? <TemplateComponent/> : ""}
         {this.state.activeItem === 'DOWNLOADS' ? <TemplateComponent/> : ""}
         {this.state.activeItem === 'ADDRESSES' ?
         <AddressComponent
         height={this.state.height} email={this.state.currentUserEmail}
         fn={this.state.fn} ln={this.state.ln} userId={this.state.userId}/> : ""}
         {this.state.activeItem === 'PAYMENT METHODS' ?
         <PaymentComponent height={this.state.height}
         email={this.state.currentUserEmail} userId={this.state.userId} /> : ""}
         {this.state.activeItem === 'ACCOUNT DETAILS' ?
         <AccountDetails height={this.state.height}
         email={this.state.currentUserEmail} fn={this.state.fn} ln={this.state.ln}
         userId={this.state.userId}/> : ""}
        </Grid.Column>

      </Grid>
   </div>


       <Segment>
         <Header as='h3' textAlign='center'>
         <div className="container">
         <div className="text-center center-block">
             <a href="https://www.facebook.com"><i id="social-fb" className="fa fa-facebook-square fa-2x social"></i></a>
             <a href="https://twitter.com"><i id="social-tw" className="fa fa-twitter-square fa-2x social"></i></a>
             <a href="https://plus.google.com"><i id="social-gp" className="fa fa-google-plus-square fa-2x social"></i></a>
             <a href="mailto:#"><i id="social-em" className="fa fa-envelope-square fa-2x social"></i></a>
        </div>
        <p>© <a href='www.google.com'>Free Sarees from</a> - WooCommerce Author.</p>
       </div>
         </Header>
         </Segment>
        </StickyContainer>
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

export default connect(mapStateToProps,mapDispatchToProps)(userDashboard);
