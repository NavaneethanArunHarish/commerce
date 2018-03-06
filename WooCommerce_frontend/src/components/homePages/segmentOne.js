import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class SegmentOne extends Component {
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
    var backgroundCss = {
      backgroundImage: "url('https://i.pinimg.com/originals/bb/05/e1/bb05e11b873b262791b4ad252a8ff442.jpg')",
      height:ht,
      width:wd,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',
      backgroundSize: 'cover',
    };

    var text={
      fontSize: '80px',
      fontWeight: 'bold',
      lineHeight: 'inherit',
      paddingTop: '128px',
      paddingLeft: '52px',

    };


    return (
      <div style={backgroundCss}>
        <div style={text}>
        <tr><td>Supersize</td></tr>
        <tr><td style={{ paddingTop:'50px' }}>Your Wardrobe</td></tr>
        <tr><td style={{ paddingTop:'50px',fontSize:'12px' }}>SS2017 READY-TO-WEAR COLLECTION</td></tr>
        </div>
      </div>
    );
  }
}

export default SegmentOne;
