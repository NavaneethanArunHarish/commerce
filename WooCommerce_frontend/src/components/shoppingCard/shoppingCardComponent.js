import React, { Component } from 'react';
import { Icon} from 'semantic-ui-react';
import { StickyContainer, Sticky } from 'react-sticky';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import CardHeader from '../constantComponents/header';
import CardFooter from '../constantComponents/footer';

class ShoppingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                <CardHeader />
                <div>
                    <center>
                        <Icon style={{marginTop:'100px'}}name='shopping cart' size='massive'></Icon><br/><br/><br/>
                        <b><label style={{fontSize:'60px', color:'#545454'}}>Your cart is currently empty.</label></b><br/><br/><br/>

                    </center>
                </div>
                <CardFooter />
            </div>
        );
    }
}

// function mapStateToProps(state) {
//   return {
//     userData:state.user.userDataResponse,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     userActions: bindActionCreators(UserActions, dispatch),
//   };
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Catalogue);

export default ShoppingComponent;

