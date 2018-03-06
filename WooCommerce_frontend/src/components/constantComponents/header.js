import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment, Grid, Image, Label, List } from 'semantic-ui-react'
import { browserHistory } from 'react-router'
import './header.css'

class Header extends Component {
  constructor(props) {
    super(props);
  }


  gotoLogin() {
    browserHistory.push('/login')
  }

  gotoCustomize() {
    browserHistory.push('/customize')
  }

  gotoCatalogue() {
    browserHistory.push('/catalogue')
  }

  gotoLanding() {
    browserHistory.push('/')
  }

  gotoShoppingCard() {
    browserHistory.push('/shoppingCard')
  }





  render() {
    return (
      <div>
        <Menu attached='top' pointing secondary style={{ marginLeft: "40px" }}>
          <Icon bordered name='shopping cart' color='orange' inverted size='large'
            style={{ border: '1px solid transparent', borderRadius: '15px' }}
          />
          <Dropdown item icon='' text='Home' style={{ fontSize: '16px' }} onClick={this.gotoLanding}>

          </Dropdown>
          <Dropdown item icon='' text='Catalogue' style={{ fontSize: '16px' }} onClick={this.gotoCatalogue}>

          </Dropdown>
          <Dropdown item icon='' text='Customize' style={{ fontSize: '16px' }} onClick={this.gotoCustomize}>

          </Dropdown>
          <Dropdown item icon='' text='Portfolio' style={{ fontSize: '16px' }}>

          </Dropdown>
          <Dropdown item icon='' text='The Shop' style={{ fontSize: '16px' }}>
            <Dropdown.Menu style={{ marginTop: '-5px' }}>
              <Dropdown.Item onClick={this.gotoShoppingCard.bind(this)}>Shopping Card</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/*<Dropdown item icon='dropdown' simple text='THE PAGE BUILDER' style={{ fontSize: '16px' }}>
            <Dropdown.Menu style={{ marginTop: '-5px' }}>
              <Dropdown.Item>Customize </Dropdown.Item>
              <Dropdown.Item>Blog </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>*/}
          <div style={{ marginLeft: '25%', width: '30%' }}>
            <Icon style={{ marginTop: '10px', marginLeft: '10px', width: '50px' }} name='heart outline' size='large'> 0</Icon>
            <Icon style={{ marginTop: '10px', marginLeft: '10px', width: '50px' }} name='shopping cart' size='large'> 0</Icon>
            <Icon style={{ marginTop: '10px', marginLeft: '10px', width: '50px', cursor: 'pointer' }} name='user' onClick={this.gotoLogin} size='large' />
            <Icon style={{ marginTop: '10px', marginLeft: '10px', width: '50px' }} name='search' size='large' />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Header;
