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
import ReactImageMagnify from 'react-image-magnify';
import ReactImageZoom from 'react-image-zoom';

import * as CustomizeSelect from '../constantComponents/customizeSelect';
import * as PalluDetails from '../constantComponents/palluDetails';

import './customize.css';

import image1 from '../../assets/carousel/test1.jpg';
import image2 from '../../assets/carousel/test2.jpg';
import image3 from '../../assets/carousel/test3.jpg';
import side1 from '../../assets/carousel/right/love_02.jpg';
import side2 from '../../assets/carousel/right/love_011.jpg';
import testin1 from '../../assets/carousel/border/testin1.jpg'
import testin2 from '../../assets/carousel/border/testin2.jpg'

import border1 from '../../assets/carousel/border/border1.jpg'

import style1 from '../../assets/carousel/butta/style1.jpg';

import dot1 from '../../assets/carousel/butta/dot3.png';
import peacock from '../../assets/carousel/butta/peacock-buttas-gold.png';


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

class Customize extends Component {
  constructor(props) {
  super(props);
  this.state = {
    //width: '0',
    //height: '0',
    userName:'',
    //activeItem: 'ACCOUNT DETAILS',
    email:'',
    currentUserEmail:'',
    userId:'',
    fn:'',
    ln:'',
    customizeBg:'white',
    modalOpen1: false,
    modalOpen2: false,
    showDescriptionPallu: false,
    buttaImage: '',
    buttaSize:10,
    buttaSpace:20,
    multiImage :[],
    palluDetails:{},
    selected: [],
    selectedPallu:{}
   };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  this.handleItemClick = this.handleItemClick.bind(this);
  this.handleOpen1 = this.handleOpen1.bind(this);
  this.handleClose1 = this.handleClose1.bind(this);
  this.handleOpen2 = this.handleOpen2.bind(this);
  this.handleClose2 = this.handleClose2.bind(this);
  this.showDescriptionPallu = this.showDescriptionPallu.bind(this);
  this.incSize = this.incSize.bind(this);
  this.decSize = this.decSize.bind(this);
  this.incSpace = this.incSpace.bind(this);
  this.decSpace = this.decSpace.bind(this);
  this.selectedPallu=this.selectedPallu.bind(this);
  this.isSelected = this.isSelected.bind(this);

}

 
handleItemClick(event,data) {
  this.setState({ activeItem: data.name });
}

handleChange(value) {
  console.log("changeEvent----------->",value)
//this.setState({selectedValue: value});
this.setState({customizeBg: value});
this.setState({buttaImage: value});
}

isSelected = (index) => {

  return this.state.selected.indexOf(index) !== -1;
};

handleOpen1(){ 
  this.setState({ modalOpen1: true})
}
 
handleClose1(){
    this.setState({ modalOpen1: false,showDescriptionPallu:false })
  }

  handleOpen2(){ 
    this.setState({ modalOpen2: true })
  }
   
  handleClose2(){
      this.setState({ modalOpen2: false })
    }

  

showDescriptionPallu(){
      this.setState({ showDescriptionPallu: true })
  }   
    

componentWillMount() {
  
  
}

incSize(){
  this.setState({ buttaSize:this.state.buttaSize+1 })
}

decSize(){
  this.setState({ buttaSize:this.state.buttaSize-1 })
}

incSpace(){
  this.setState({ buttaSpace:this.state.buttaSpace+1 })
}

decSpace(){
  this.setState({ buttaSpace:this.state.buttaSpace-1 })
}

selectedPallu(){
 
  this.setState({ selectedPallu:this.state.palluDetails })
  this.handleClose1();
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
  console.log("butta-----url----->",this.state.buttaImage)
  var imageArr =[];
if(this.state.buttaImage!==''){
  console.log("butta-----url----->data")
   
  for (var i=0; i < 300; i++) {
    imageArr.push({image:this.state.buttaImage, background:this.state.customizeBg, width:this.state.buttaSize,space:this.state.buttaSpace});
   }   
console.log("imageArr--------->",imageArr)
}
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
{/*     
<div style={{width:'30%'}}>
<ReactImageZoom {...{width:400,height:250,zoomWidth:200,zoomHeight:100,img:image2,offset:{vertical:-8,horizontal:-80},zoomStyle:{opacity: 0.5,border: '1px solid black'}}} />
</div>  
*/}


{/* 
<div style={{width:'30%'}}>
<ReactImageMagnify {...{
    smallImage: {
        alt: 'Testing texts',
        isFluidWidth: true,
        src: image3,
    },
    largeImage: {
        alt: '',
        src: image3,
        width: 800,
        height: 800
    },

    enlargedImageContainerStyle:{ marginTop:'10%',marginLeft:'-75%',width:'300px',height:'242px',background:this.state.customizeBg,border: 'groove'},

}} />
</div>
*/}
     
     <Grid columns={2} relaxed >

          <Grid.Column width='12' style={{background:this.state.customizeBg,border: 'none',marginLeft:"64px",marginTop:'3%',height:'106px'}}>
           <div style={{background:this.state.customizeBg}} width='102%'>
                <div>
    
       {/*<Image src={testin1}  />*/} 


        <ReactImageMagnify {...{  
              smallImage: {
                   alt: 'Testing texts',
                   isFluidWidth: true,
                   src: testin1,
                 },
               largeImage: {
                   alt: '',
                   src: border1,
                   width: 800,
                   height: 800
               },

            enlargedImagePosition:'over',
            enlargedImageContainerStyle:{ marginTop:'0%',marginLeft:'0%',background:this.state.customizeBg},

              }} />

              
                    
                </div>
            </div>

            </Grid.Column>

            <Divider vertical>Or</Divider>
              
            <Grid.Column width='3' style={{}}>
            
          <div>
             <Dropdown style={{width:'65%',marginTop:'20%',display:'inline-block'}} placeholder='Select Body Color' fluid selection
                options={CustomizeSelect.BgColor}
                onChange={(e, { value }) => this.setState({ customizeBg:value })}
            
               />
             <span style={{background:this.state.customizeBg, marginLeft: '4%',padding: '1%', paddingRight:'7%'}}></span>
          </div> 

            </Grid.Column>
 
       </Grid> 

    <Grid columns={3} relaxed >
          
        <Grid.Column width='9' id='right' style={{background:this.state.customizeBg,overflowX:'hidden',overflowY:'hidden', border: 'none',marginTop: '-28px',marginLeft:"64px",height:'465px'}} >
       
        

           <div width='103%' style={{background:this.state.customizeBg}}>


              

             
        {/*   {imageArr.map(function(object, i){
               return  <Image src={object.image} style={{width:object.width+'%',padding:object.space+'px',float:'left',background:object.background}}  key={i} />;

              })} */}


 {imageArr.map(function(object, i){
  return <div style={{float:'left',padding:object.space,width:object.width+'%',padding:object.space+'px',cursor: 'crosshair'}}>

   <ReactImageZoom {...{width:50,scale:5,img:object.image,offset:{vertical:0,horizontal:10}}} />
  
  </div>
  })} 


             

            </div>
                  

        </Grid.Column>
          
        <Divider vertical>Or</Divider>

        <Grid.Column width='3' id='left' style={{background:this.state.customizeBg,overflow:'hidden',border: 'none',marginTop: '-28px',height:'465px',paddingLeft: '1px'}}>
        
        <div width='120%' style={{background:this.state.customizeBg}}>
                <div style={{height:'435px'}}>
                 

          <ReactImageMagnify {...{  
              smallImage: {
                   alt: 'Testing texts',
                   isFluidWidth: true,
                   src: this.state.selectedPallu.image,
                 },
               largeImage: {
                   alt: '',
                   src: this.state.selectedPallu.image,
                   width: 800,
                   height: 800
               },

            enlargedImagePosition:'over',
            enlargedImageContainerStyle:{ marginTop:'0%',marginLeft:'0%',width:'300px',height:'242px',background:this.state.customizeBg},

              }} />



                </div>
                          
        </div>
        
        </Grid.Column>

        

        <Grid.Column width='3' style={{border: 'none',height:'465px'}}>
      
         
      <div>
      <Dropdown style={{marginTop:'-4%',width:'60%',display:'inline-block'}} placeholder='Select Butta Style' fluid selection
            options={CustomizeSelect.buttaStyle}
            onChange={(e, { value }) => this.setState({ buttaImage:value })}

            />

         <Button.Group style={{marginTop:'2%'}}>
          <span><h5 style={{fontSize:'1.2rem',opacity:'0.6',marginTop:'15%'}}>Size:</h5></span>
            <Button icon='minus' onClick={this.decSize} />
           
            <Button icon='plus' onClick={this.incSize} />

            <span  style={{marginLeft:'3%'}}><h5 style={{fontSize:'1.2rem',opacity:'0.6',marginTop:'13%'}}>Space:</h5></span>
            <Button icon='minus' onClick={this.decSpace} />
        
            <Button icon='plus' onClick={this.incSpace} />
        </Button.Group>   

      </div> 


<div>

 <Modal trigger={<Button style={{marginTop: '2%'}} onClick={this.handleOpen1} >Select Pallu</Button>}
  open={this.state.modalOpen1}
  onClose={this.handleClose1}
 >
  <Modal.Header>Select Pallu!</Modal.Header>
    <Modal.Content image scrolling >
    <Grid rows={3} relaxed  style={{width:'75%'}} > 

    

{PalluDetails.palluDetails.map((listValue, index) =>

     
    <Image size='small'style={{marginLeft:'8%',marginTop:'2%',cursor: 'pointer'}} 
         src={listValue.image}
         wrapped
         selected={this.isSelected(index)} key={index} onClick={(e) => this.setState({ palluDetails:listValue}) }

         /> 
     
        )}              
  

    </Grid>  


    <Divider style={{marginLeft:'26%',top:'auto',bottom:'14%'}} vertical>|</Divider>
    
   {(this.state.palluDetails!=='') &&
        
      <Grid.Column  style={{border: 'none',marginLeft:'8%',width:'20%'}}>

       <Grid.Row> 
       <h4>Name:</h4> {this.state.palluDetails.name} 
       </Grid.Row>
      <Grid.Row> 
       <h4> Description:</h4> {this.state.palluDetails.description} 
       </Grid.Row> 
       <Grid.Row> 
       <h4> Price:</h4>  {this.state.palluDetails.price}  
       </Grid.Row>    
     
     </Grid.Column> 
   }

               
</Modal.Content>  

    <Modal.Actions>
    <Button onClick={this.handleClose1}>
      Cancel
    </Button>
    <Button primary onClick={this.selectedPallu} >
      Select  
    </Button>
  </Modal.Actions>

</Modal>

</div>



<div>

 <Modal trigger={<Button style={{marginTop: '2%'}} onClick={this.handleOpen2}>Select Border</Button>}
  open={this.state.modalOpen2}
  onClose={this.handleClose2}
 >
  <Modal.Header>Select Border!</Modal.Header>
    <Modal.Content image scrolling >
    <Grid rows={3} relaxed  style={{width:'75%'}} >  

    <Grid.Row>   
    <Image size='small'style={{marginLeft:'8%'}} 
         src={image3}
         wrapped /> 
     
      <Image  size='small' style={{marginLeft:'8%'}}
         src={image2}
         wrapped />  

     <Image  size='small' style={{marginLeft:'8%'}}
         src={image2}
         wrapped />  
               
    </Grid.Row> 

    </Grid>  


    <Divider style={{marginLeft:'26%',top:'auto',bottom:'14%'}} vertical>|</Divider>
  
    <Grid.Column  style={{border: 'none',marginLeft:'8%',width:'20%'}}>
     
       <Grid.Row> 
       <h4>Name:</h4> sample 
       </Grid.Row>
      <Grid.Row> 
       <h4> Description:</h4> some sample text 
       </Grid.Row> 
       <Grid.Row> 
       <h4> Price:</h4> 200.00 
       </Grid.Row>    
     
     </Grid.Column> 

               
</Modal.Content>  

    <Modal.Actions>
    <Button onClick={this.handleClose2}>
      Cancel
    </Button>
    <Button primary onClick={this.handleClose2}>
      Select
    </Button>
  </Modal.Actions>

</Modal>

</div>



      
    <Table celled style={{marginTop:'14%'}} >
        <Table.Header>
           <Table.Row>
             <Table.HeaderCell>My Saree</Table.HeaderCell>
             <Table.HeaderCell>Price</Table.HeaderCell>
           </Table.Row>
        </Table.Header>

        <Table.Body>
           <Table.Row>
             <Table.Cell>Base Price</Table.Cell>
             <Table.Cell>5,000.00</Table.Cell>
           </Table.Row>

           <Table.Row>
             <Table.Cell>Kairi Butta - Medium</Table.Cell>
             <Table.Cell> 750.00</Table.Cell>
           </Table.Row>

           <Table.Row>
             <Table.Cell>Cocunut Border</Table.Cell>
             <Table.Cell>750.00</Table.Cell>
           </Table.Row>

           <Table.Row>
             <Table.Cell>TwinPeacock Pallu</Table.Cell>
             <Table.Cell>2,000.00</Table.Cell>
           </Table.Row>
           
        </Table.Body>

        <Table.Footer>
           <Table.Row>
             <Table.HeaderCell>Total</Table.HeaderCell>
             <Table.HeaderCell>8,500.00</Table.HeaderCell>
           </Table.Row>
        </Table.Footer>

      </Table>   

      <Button style={{marginTop: '2%',color:'blue'}}>Checkout</Button>
        </Grid.Column>

        
      </Grid>
      
    <Grid columns={2} relaxed >

          <Grid.Column width='12' style={{background:this.state.customizeBg,overflow:'hidden',border: 'none',marginLeft:"64px",marginTop: '-45px'}}>
          <div style={{background:this.state.customizeBg}} width='102%'>
                <div>
                    <Image src={testin2}/>
                </div>
            </div>
            </Grid.Column>

            <Divider vertical>Or</Divider>
              
            <Grid.Column width='3' style={{}}>
            </Grid.Column>
 
       </Grid>
       
       <Grid columns={1} relaxed >
       
       
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

export default connect(mapStateToProps,mapDispatchToProps)(Customize);



//border width: 1219px, height: 65px
//center width: 914px; height:'465px' 
//right  width: 304px  ; height:'465px'

/*background-color: #00bf16;
background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre-big.png");*/
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */