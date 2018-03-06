import React, { Component } from 'react';
import { Card, Icon, Image,Grid, Segment,Reveal } from 'semantic-ui-react';
import image1 from '../../assets/images/love_02.jpg';
import image2 from '../../assets/images/love_011.jpg';

var headerText={
  fontSize: '28px',
  fontWeight: 'bold',
  fontFamily: 'NeueEinstellung'
};
var headerSubText={
  fontSize: '18px',
  fontWeight: 'bold',
  color:'#999999',
  fontFamily: 'Radnika, sans-serif'
};

var  testArray = ["1","2","3","4","5","6"];

class SegmentTwo extends Component {
  constructor(props) {
  super(props);
  this.state = { width: '0', height: '0' };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
    var ht = this.state.height+'px';
    var wd = this.state.width+'px';
    return (
      <div>
      <div style={{textAlign: 'center',marginTop:'100px'}}>
          <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column width={16} style={headerText}>
              Shop These Looks
            </Grid.Column>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} style={headerSubText}>
              You probably don’t have anything to wear anyway
            </Grid.Column>
            </Grid.Row>
          </Grid>
       </div>
       <div>
        <Grid>
        <Grid.Row columns={3} style={{paddingLeft:'100px'}}>
        {testArray.map((data,i) => (
        <Grid.Column style={{marginTop:'20px'}}>
        <Reveal animated='fade' instant>
        <Reveal.Content visible style={{backgroundColor:'white'}}>
          <Image src={image1} size='medium'/>
          <div style={{height:'30%',width:'100%'}}>
          <p>Love Leather Skirt</p>
          <p>$175</p>
          </div>
        </Reveal.Content>
        </Reveal>
        <Reveal animated='fade' instant style={{width:'75%'}}>
        <Reveal.Content hidden>
        <Image src={image2} size='medium'/>
        <div style={{height:'30%'}}>
        <p>Love Leather Skirt</p>
        <p style={{color:'orange'}}>ADD TO CART</p></div>
        </Reveal.Content>
        </Reveal>
        </Grid.Column>
         ))}
        </Grid.Row>
        </Grid>
        </div>
     </div>
    );
  }
}

export default SegmentTwo;
