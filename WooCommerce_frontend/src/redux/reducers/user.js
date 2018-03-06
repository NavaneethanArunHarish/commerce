const initialState = {
};

export default function user(state = initialState, action) {
  switch (action.type) {
       case 'BILLING_ADDRESS':
        return {
          ...state,
          billingResponse:action.data,
        };
      case 'SHIPPING_ADDRESS':
        return {
          ...state,
        shippingResponse:action.data,
        };
      case 'USER_DATA':
        return {
       ...state,
       userDataResponse:action.data,
       };

     case 'USER_UPDATE':
       return {
      ...state,
      userDataResponse:action.data,
      };

      case 'SAVE_CARD_PAYMENT':
        return {
       ...state,
       paymentDataResponse:action.data,
       };

      case 'DELETE_CARD_PAYMENT':
        return {
       ...state,
       paymentDataResponse:action.data,
       };

    default:
      return state;
  }
}
