import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

class TemplateComponent extends Component {
  constructor(props) {
  super(props);
}

  render() {
    return (
      <div>
      <Grid>
        <Grid.Column>
          <Image
            fluid
            label={{ as: 'div', color: 'orange', content: 'We are on Progress', icon: 'announcement', ribbon: true }}
            src='http://www.youniteonline.com/wp-content/uploads/2017/09/coming-soon.png'
          />
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default TemplateComponent;
