import React, { Component } from 'react';
import { Image,Container,Header,Segment } from 'semantic-ui-react';
//import { StickyContainer, Sticky } from 'react-sticky';
//import HeaderMain from '../constantComponents/header'
//import { Image } from 'semantic-ui-react';
//import './login.css';




let i = 0;
class FooterConst extends Component {
  render() {
    return (
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

         {/* <div>
                   <div className="btn-hover-blue"><button id="fb-msg"><i style={{fontSize: '15px'}} className="fa fa-facebook-square"></i>   MESSAGE US</button>
                   </div>
                   <div className="btn-hover-blue"><button id="purch"><i style={{fontSize: '15px'}} className="fa fa-eercast"></i> PURCHASE $69</button>
                   </div>
                </div>*/}
    </Segment>
    );
  }
}




export default FooterConst;











