import React, { Component } from 'react';
import { Image,Container,Header,Segment,Divider,Grid,List,Menu,Table,Dropdown,Button,Modal,Input } from 'semantic-ui-react';
import { StickyContainer, Sticky } from 'react-sticky';
import HeaderMain from '../constantComponents/header'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../redux/actions/userActions';
import FooterConst from '../constantComponents/footer';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import $ from 'jquery';
import { Carousel } from 'react-responsive-carousel';


import side1 from '../../assets/carousel/right/love_02.jpg';
import side2 from '../../assets/carousel/right/love_011.jpg';


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

class Catalogue extends Component {
  constructor(props) {
  super(props);
  this.state = {
    userName:'',
    email:'',
    currentUserEmail:'',
    userId:'',
    fn:'',
    ln:'',
   };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  this.handleItemClick = this.handleItemClick.bind(this);
  this.isSelected = this.isSelected.bind(this);

}

 
handleItemClick(event,data) {
  this.setState({ activeItem: data.name });
}

handleChange(value) {
  console.log("changeEvent----------->",value)
//this.setState({selectedValue: value});

}

isSelected = (index) => {

  return this.state.selected.indexOf(index) !== -1;
};


componentWillMount() {
  
  
}





componentWillReceiveProps(next) {
  var userData = next.userData;
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
   <div>
     <Grid columns={2} relaxed  >
        
     <Grid.Row style={{marginTop:'8%',marginLeft:'41%'}}> 
            <h1 style={{fontSize:'72.611px',fontWeight:900,textAlign:'center'}}>The Shop</h1>
            </Grid.Row> 

            <Grid.Row style={{marginTop:'-22px',marginLeft:'34%'}} > 

<h5 style={{marginTop:'26px'}}>MEN</h5> <h5 style={{marginLeft:'2%'}}>WOMEN</h5> <h5 style={{marginLeft:'2%'}}>ACCESSORIES</h5> <h5 style={{marginLeft:'2%'}}>GADGETS</h5> <h5 style={{marginLeft:'2%'}}>GIFTS</h5> <h5 style={{marginLeft:'2%'}}>CATEGORIES GRID</h5>
            
            </Grid.Row> 
       

  
       </Grid>

    </div>  

</div>


       


       <FooterConst />
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

export default connect(mapStateToProps,mapDispatchToProps)(Catalogue);

