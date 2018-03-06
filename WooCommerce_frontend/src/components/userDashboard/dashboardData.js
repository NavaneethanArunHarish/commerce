import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

class DashboardData extends Component {
  constructor(props) {
  super(props);
}


  gotoLogin() {
    browserHistory.push('/login')
  }





  render() {
    return (
      <div>
      <Segment basic style={{marginTop:'10%'}}>
      <p style={{fontSize:'20px'}}>Hello <span style={{color:'grey'}}>{this.props.userName}</span> (not {this.props.userName}?
        <a href='http://localhost:8080/logout'><span style={{color:'orange'}}>Log out</span></a>
      )</p>
      <p style={{fontSize:'20px'}}>From your account dashboard you can view your recent orders, manage your shipping<br /> and billing addresses and
      edit your<br /> password and account details. </p>
      </Segment>
      </div>
    );
  }
}

export default DashboardData;
