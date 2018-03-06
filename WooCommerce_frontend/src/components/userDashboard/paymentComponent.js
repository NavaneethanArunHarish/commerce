import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label,Form,Input,Accordion,Button,List,Table } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import './userDashboard.css';
import PaymentDetails from './paymentDetails';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SavedPayment from './savedPayment';

class PaymentComponent extends Component {
  constructor(props) {
  super(props);
  this.state = {
    showDefault:true,
    paymentDetails:false,
    activeIndex : '',
    editCreditCard:false,
    editDebitCard:false,
     isBillingAddressEmpty:true,
     showCard:false,
     showCard2:false,
     showLoader:true,
     selected: [],
     selectedCard:{},

   /* creditCardDetails:[{
      cardNumber:'',
      expiryDate:'',
      NameOnCard:'',
    }],*/
    debitCardDetails:[{
      cardNumber:'',
      expiryDate:'',
      NameOnCard:'',
    }],
  }

  this.paymentDetails = this.paymentDetails.bind(this);

  this.editCreditCard = this.editCreditCard.bind(this);
  this.editDebitCard = this.editDebitCard.bind(this);
  this.showDefaultCard = this.showDefaultCard.bind(this);
  this.isSelected = this.isSelected.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleRowSelection = this.handleRowSelection.bind(this);
  this.deleteCard = this.deleteCard.bind(this);
}

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }



  componentWillMount() {
    this.props.userActions.getUserData(this.props.email);
    //this.setState({showLoader:true});
  }


componentWillReceiveProps(next) {
  console.log("userPAyment---------->",next.userDataResponse)
  var userData = next.userDataResponse;

  if(next.userDataResponse != undefined && next.userDataResponse != null){
    this.setState({
      debitCardDetails:next.userDataResponse.debitCardDetails,
      creditCardDetails:next.userDataResponse.creditCardDetails,
      showLoader:false
    });
    if(userData.creditCardDetails) {
      var name = userData.creditCardDetails.map(List => List.NameOnCard);
     if(name !='') { 
      this.setState({showCard:true});
      this.setState({
        debitCardDetails:next.userDataResponse.debitCardDetails,
        creditCardDetails:next.userDataResponse.creditCardDetails,
        showLoader:false
      });
    }
    }
    if(userData.debitCardDetails) {
      var name = userData.debitCardDetails.map(List => List.NameOnCard);
      if(name !='') { 
      this.setState({showCard2:true});
      this.setState({
        debitCardDetails:next.userDataResponse.debitCardDetails,
        creditCardDetails:next.userDataResponse.creditCardDetails,
        showLoader:false
      });
    }
    }

}

}

showDefaultCard(cardData) {
  this.setState({
    showDefault:true,
    editCreditCard:false,
    editDebitCard:false,
    paymentDetails:false
  });
  this.props.userActions.getUserData(this.props.email);
  this.setState({showLoader:true});
}


  paymentDetails() {
    this.setState({
      showDefault:false,
      paymentDetails:true
    });
    this.props.showEdit;
  }

  editCreditCard(e,obj) {
    console.log('the edit---> ',obj)
    this.setState({
      selectedCard: obj,
      showDefault:false,
      paymentDetails:false,
      editCreditCard:true,
      editDebitCard:false
    });
    this.props.showEdit;
  }
  
  editDebitCard(e,obj) {
    this.setState({
      selectedCard: obj,
      showDefault:false,
      paymentDetails:false,
      editCreditCard:false,
      editDebitCard:true
    });
    this.props.showEdit;
  }

  handleChange = (e,obj) => {
    console.log('the selected---> ',obj)    
};

deleteCard = (e,obj) => {
  this.setState({showLoader:true});
  console.log("save props------->",this.props);
  console.log('the delete---> ',obj)
  e.preventDefault();
  console.log('the 1---> ',this.props.userId)
  console.log('the 2---> ',obj._id)
  var uId = this.props.userId;
  var cId = obj._id
  //console.log('the 3---> ',this.state.selectedValue)
  var data = {
    _id:uId,
    cardId:cId
  };
  console.log("my data------> ",data);
  this.props.userActions.deletePaymentDetails(data);

  this.props.userActions.getUserData(this.props.email);
};

handleRowSelection = (selectedRows) => {
  this.setState({
      selected: selectedRows
  });
};

  isSelected = (index) => {

    return this.state.selected.indexOf(index) !== -1;
};


  render() {
    console.log("data for crad----------->",this.state.creditCardDetails)
    return (
     <div>


{this.state.showDefault && !this.state.paymentDetails ?
    <div style={{height:this.props.height}}>

{this.state.showLoader ?
      <div>
      <Image src='https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif' fluid />
      </div>
      :  
    <Grid   style={{marginTop:'-60px'}}>
    <Grid.Row>
    <div style={{marginTop:'140px'}}>



    {this.state.showDefault && !this.state.editCreditCard && !this.state.editDebitCard ?
        <div>
      <Segment basic>
      <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
            <p className='add-address-header'>Payment Details.</p>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row >
           <Grid.Column>
           <Segment basic>
               <span className='address-segment-headers'>Saved Cards</span>
             </Segment>
             {this.state.showCard ? 
       
          

<Table celled onRowSelection={this.handleRowSelection}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>CardType</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Card No</Table.HeaderCell>
        <Table.HeaderCell>Expiry</Table.HeaderCell>
        <Table.HeaderCell>Edit</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

{ this.state.creditCardDetails.map((listValue, index) =>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Credit</Table.Cell>
        <Table.Cell>{listValue.NameOnCard}</Table.Cell>
        <Table.Cell>{listValue.cardNumber}</Table.Cell>
        <Table.Cell>{listValue.expiryDate}</Table.Cell>
        <Table.Cell><i class="fa fa-pencil-square" aria-hidden="true" selected={this.isSelected(index)} key={index} onClick={(e) => this.editCreditCard(e, listValue)} style={{cursor: 'pointer' }}></i></Table.Cell>
        <Table.Cell><i class="fa fa-trash-o" aria-hidden="true" style={{cursor: 'pointer' }} selected={this.isSelected(index)} key={index} onClick={(e) => this.deleteCard(e, listValue)}></i></Table.Cell>
      </Table.Row>
    </Table.Body>

    )}

{ this.state.debitCardDetails.map((listValue, index) =>

<Table.Body>
  <Table.Row>
    <Table.Cell>Debit</Table.Cell>
    <Table.Cell>{listValue.NameOnCard}</Table.Cell>
    <Table.Cell>{listValue.cardNumber}</Table.Cell>
    <Table.Cell>{listValue.expiryDate}</Table.Cell>
    <Table.Cell><i class="fa fa-pencil-square" aria-hidden="true"  selected={this.isSelected(index)} key={index} onClick={(e) => this.editDebitCard(e, listValue)} style={{cursor: 'pointer' }}></i></Table.Cell>
    <Table.Cell><i class="fa fa-trash-o" aria-hidden="true" style={{cursor: 'pointer' }} selected={this.isSelected(index)} key={index} onClick={(e) => this.deleteCard(e, listValue)}></i></Table.Cell>
  </Table.Row>
</Table.Body>

)}

   
  </Table>


               :
               <span className='add-address-header-body'>You have not saved the Card yet.</span>
             }  
            </Grid.Column>
          </Grid.Row>
         
        </Grid>
        </Segment>
        </div>
        :
        <div></div>
      }

           






    {/*<span><h4 >No saved methods found.</h4></span>*/}
           <Segment basic>
             <span><Button style={{marginRight:'20px',width:'50%'}} onClick={this.paymentDetails} id="log-btn" type="submit">ADD PAYMENT METHOD</Button></span>
           </Segment>
    </div>
      </Grid.Row>
    </Grid>
}
    </div>
     :
     <div></div>
}



{!this.state.showDefault && !this.state.paymentDetails && this.state.editCreditCard && !this.state.editDebitCard ?
  <SavedPayment selectedValue='credit' selectedCard={this.state.selectedCard}  email={this.props.email} userId={this.props.userId} parentMethod={this.showDefaultCard}/>
  :
  <div></div>
}

{!this.state.showDefault && !this.state.paymentDetails && !this.state.editCreditCard && this.state.editDebitCard ?
  <SavedPayment selectedValue='debit' selectedCard={this.state.selectedCard}  email={this.props.email} userId={this.props.userId} parentMethod={this.showDefaultCard}/>
  :
  <div></div>
}



{!this.state.showDefault && this.state.paymentDetails && !this.state.editCreditCard && !this.state.editDebitCard ?
    <PaymentDetails email={this.props.email} userId={this.props.userId} parentMethod={this.showDefaultCard}/>
    :
    <div></div>
  }


    </div>
    );
  }
}

//export default PaymentComponent;

function mapStateToProps(state) {
  return {
      userDataResponse:state.user.userDataResponse,
      paymentDataResponse:state.user.paymentDataResponse,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      userActions: bindActionCreators(UserActions, dispatch),
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(PaymentComponent);
  


  /*<Table.Body>
      <Table.Row>
        <Table.Cell>Debit</Table.Cell>
        <Table.Cell>{this.state.debitCardDetails.NameOnCard}</Table.Cell>
        <Table.Cell>{this.state.debitCardDetails.cardNumber}</Table.Cell>
        <Table.Cell>{this.state.debitCardDetails.expiryDate}</Table.Cell>
      </Table.Row>
    </Table.Body>*/