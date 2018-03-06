import React, { Component } from 'react';
import { Image,Container,Header,Segment } from 'semantic-ui-react';
import SegmentOne from './homePages/segmentOne';
import SegmentTwo from './homePages/segmentTwo';
import HeaderMain from './constantComponents/header'
import { StickyContainer, Sticky } from 'react-sticky';
import './main.css';


let i = 0;
class HeaderConst extends Component {
  render() {
    return (
      <div style={{ ...this.props.style, height: '50px',
        overflow: 'visible',
        background: 'white',
        width:'100%',
        border:'none'}}>
        <HeaderMain />
      </div>
    );
  }
}


class Main extends Component {
  constructor(props) {
  super(props);
}

  render() {
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
         <SegmentOne/>
         <SegmentTwo/>
         <SegmentTwo/>
         <Segment>
         <Header as='h3' textAlign='center'>
         <div className="container">
         <div className="text-center center-block">
            <a href="https://www.facebook.com"><i id="social-fb" className="fa fa-facebook-square fa-2x social"></i></a>
             <a href="https://twitter.com"><i id="social-tw" className="fa fa-twitter-square fa-2x social"></i></a>
             <a href="https://plus.google.com"><i id="social-gp" className="fa fa-google-plus-square fa-2x social"></i></a>
             <a href="mailto:#"><i id="social-em" className="fa fa-envelope-square fa-2x social"></i></a>
        </div>
        <p>© <a href='www.google.com'>Get Bowtied</a> - Elite ThemeForest Author.</p>
       </div>
         </Header>
         </Segment>
        </StickyContainer>

        </div>
    );
  }
}

export default Main;
