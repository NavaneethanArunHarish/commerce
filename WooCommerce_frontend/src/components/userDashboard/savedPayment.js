import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment,Grid, Image, Label,Form,Input,Accordion,Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import './userDashboard.css';
import {RadioGroup, Radio} from 'react-radio-group';
import CreditCardInput from 'react-credit-card-input';

import * as BanksList from '../constantComponents/bankList';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SavedPayment extends Component {
  constructor(props) {
  super(props);
  this.state = {
    activeIndex : '',
    selectedValue: '',
    _id:'',
   // cardNumber:'',
   // expiryDate:'',
    NameOnCard:'',

    debitCardNumber:'',
    debitCardExpiryDate:'',
    creditCardNumber:'',
    creditCardExpiryDate:'',
    showLoader:true
  }
 this.handleChange = this.handleChange.bind(this);
 this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
 this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
 this.handleCardExpiryChangeDebit = this.handleCardExpiryChangeDebit.bind(this);
 this.handleCardNumberChangeDebit = this.handleCardNumberChangeDebit.bind(this);
 this.updatePaymentDetails = this.updatePaymentDetails.bind(this);
}

      handleCardNumberChange(e) {
        console.log('Expiry date - - > ',e.target.value);
        this.setState({creditCardNumber:e.target.value});
      }

       handleCardExpiryChange(e) {
        console.log('Card no date - - > ',e.target.value);
        this.setState({creditCardExpiryDate:e.target.value})
      }

      handleCardNumberChangeDebit(e) {
        console.log('Expiry date for debit- - > ',e.target.value);
        this.setState({debitCardNumber:e.target.value})
      }

       handleCardExpiryChangeDebit(e) {
        //console.log('Card no date for debit- - > ',e.target.value);
        this.setState({debitCardExpiryDate:e.target.value})
      }

      handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
      }

  componentWillMount() {
    this.props.userActions.getUserData(this.props.email);
    //console.log('this.mail ',this.props.email);
    console.log('this card-----------> ',this.props.selectedCard);
    console.log('this type-----------> ',this.props.selectedValue);
    var cardType=this.props.selectedValue;
    this.setState({ 
      selectedValue: this.props.selectedValue,
     })

if(cardType=='credit'){
     this.setState({selectedCard:this.props.selectedCard});
     this.setState({
       creditCardNumber:this.props.selectedCard.cardNumber,
       creditCardExpiryDate:this.props.selectedCard.expiryDate,
       NameOnCard:this.props.selectedCard.NameOnCard
     })
    }
if(cardType=='debit'){
      this.setState({selectedCard:this.props.selectedCard});
      this.setState({
        debitCardNumber:this.props.selectedCard.cardNumber,
        debitCardExpiryDate:this.props.selectedCard.expiryDate,
        NameOnCard:this.props.selectedCard.NameOnCard
      })
     }

  }




  componentWillReceiveProps(next) {
    console.log('payment----------->probs',next);
    this.setState({ showLoader: false })
  }

  handleChange(value) {
      //console.log("changeEvent----------->",value)
    this.setState({selectedValue: value});
  }


  updatePaymentDetails(e) {
    e.preventDefault();
    console.log("save props------->",this.props);
    var uId = this.props.userId;
    var cId = this.props.selectedCard._id
    var cardName = this.state.selectedValue;
    if(cardName == 'credit') {
      var data = {
        _id:uId,
        creditCardDetails: {
          _id:cId,
          cardNumber:this.state.creditCardNumber,
          expiryDate:this.state.creditCardExpiryDate,
          NameOnCard:this.state.NameOnCard
        }
      };
    }if(cardName == 'debit') {
      var data = {
        _id:uId,
        debitCardDetails: {
          _id:cId,
          cardNumber:this.state.debitCardNumber,
          expiryDate:this.state.debitCardExpiryDate,
          NameOnCard:this.state.NameOnCard
        }
      };
    }
    console.log("my data ",data);
    this.props.userActions.updatePaymentDetails(data);
    this.props.parentMethod();
}




  render() {
    console.log("render--------name::::",this.props.selectedCard);
    return (
      
        <div style={{height:this.props.height, paddingTop: '40px',
            paddingLeft: '100px',borderRadius: '10px',border: 'outset'}}>
{this.state.showLoader ?
      <div>
      <Image src='https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif' fluid />
      </div>
      :
<Grid>
    <RadioGroup style={{marginTop: '50px'}}
        name="paymentMode"
        selectedValue={this.state.selectedValue}
        onChange={this.handleChange}>
      <Grid.Row columns={1}>
       <div style={{marginTop: '8px'}} className="radio">
          <label style={{color:'black',fontWeight:'bold'}}>
            <Radio value="credit" />
              Credit card 
          </label>
        </div>
        </Grid.Row>
        {this.state.selectedValue === 'credit' &&


<div>
<div>
<img src="https://shopkeeper-szcel9eb49h.stackpathdns.com/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/visa.svg" alt="Visa" width="45" style={{marginLeft: '0.3em'}} />
<img src="https://shopkeeper-szcel9eb49h.stackpathdns.com/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/mastercard.svg" alt="Mastercard" width="45" style={{marginLeft: '0.3em'}} />
<img src="https://shopkeeper-szcel9eb49h.stackpathdns.com/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/amex.svg" alt="Amex" width="45" style={{marginLeft: '0.3em'}} />
<img src="https://shopkeeper-szcel9eb49h.stackpathdns.com/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/diners.svg" alt="Diners" width="45" style={{marginLeft: '0.3em'}} />
</div>
<CreditCardInput
containerStyle={{width:'412px'}}
cardImageStyle={{height: '30px'}}
fieldStyle={{padding:'0px',height: '60px',width:'500px'}}
inputStyle={{width:'250%', position: 'relative' ,border:'groove'}}
cardNumberInputProps={{onChange: this.handleCardNumberChange, defaultValue:this.state.creditCardNumber }} 
cardExpiryInputProps={{onChange: this.handleCardExpiryChange, defaultValue:this.state.creditCardExpiryDate }}
/>
<Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black'}}>Name on Card:</p>
          <Input style={{width:'80%'}} fluid defaultValue={this.state.NameOnCard} onChange={(e, { value }) => this.setState({ NameOnCard:value })} />
          </Grid.Column>
      </Grid.Row>
</div>

   }
       <Grid.Row columns={1}>
        <div style={{marginTop: '50px'}} className="radio">
          <label style={{color:'black',fontWeight:'bold'}}>
            <Radio value="debit" />
            Debit card
          </label>
        </div>
        </Grid.Row>
        { this.state.selectedValue === 'debit' &&


<div>
<div>
<img src="https://shopkeeper-szcel9eb49h.stackpathdns.com/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/visa.svg" alt="Visa" width="45" style={{marginLeft: '0.3em'}} />
<img src="https://shopkeeper-szcel9eb49h.stackpathdns.com/wp-content/plugins/woocommerce/assets/images/icons/credit-cards/mastercard.svg" alt="Mastercard" width="45" style={{marginLeft: '0.3em'}} />
<img src="https://cdn0.iconfinder.com/data/icons/payment-method/480/rupay_payment_card_bank-128.png" alt="Mastercard" width="45" style={{marginLeft: '0.3em'}} />

</div>
<CreditCardInput
containerStyle={{width:'412px'}}
cardImageStyle={{height: '30px'}}
fieldStyle={{padding:'0px',height: '60px',width:'500px'}}//border:'2px solid rgba(34,36,38,.15)'
inputStyle={{width:'250%', position: 'relative' ,border:'groove'}}
cardNumberInputProps={{onChange: this.handleCardNumberChangeDebit, defaultValue:this.state.debitCardNumber }} 
cardExpiryInputProps={{onChange: this.handleCardExpiryChangeDebit, defaultValue:this.state.debitCardExpiryDate }}
/>

<Grid.Row columns={1}>
          <Grid.Column>
          <p style={{color:'black'}}>Name on Card:</p>
          <Input fluid  style={{width:'80%'}} fluid defaultValue={this.state.NameOnCard}  onChange={(e, { value }) => this.setState({ NameOnCard:value })}  />
          </Grid.Column>
      </Grid.Row>
</div>
}


        </RadioGroup>



      <Grid.Row columns={1}>
       <div>
       <Button style={{marginTop:'20px',width: '100%',height: '55px'}} id="log-btn" type="submit" onClick={this.updatePaymentDetails} >UPDATE CARD</Button>
       </div>
      </Grid.Row>
      <div style={{height:'100px',backgroundColor:'transparent'}}></div>
    </Grid>
}
    </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log("PAymentuser1---------->",state.user)
  return {
    userDataResponse:state.user.userDataResponse,
    creditResponse:state.user.creditResponse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SavedPayment);
