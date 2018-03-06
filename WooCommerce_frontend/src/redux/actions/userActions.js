import axios from 'axios';
import * as PROD from './ServiceUrl';


export function saveBillingAddress(userData) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"updateBillingAddress",
                   data : userData
                })
             .then(response => {
                  var data = response.data;
                  //console.log("response in saveBillingAddress ",data);
                  dispatch({
                      type: "BILLING_ADDRESS",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in saveBillingAddress ",data);
                });
          }
}

export function savePaymentDetails(userData) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"savePaymentDetails",
                   data : userData
                })
             .then(response => {
                  var data = response.data;
                console.log("response in SAVE_CARD_PAYMENT ",data);
                  dispatch({
                      type: "SAVE_CARD_PAYMENT",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in SAVE_CARD_PAYMENT ",data);
                });
          }
}

export function updatePaymentDetails(userData) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"updatePaymentDetails",
                   data : userData
                })
             .then(response => {
                  var data = response.data;
                console.log("response in SAVE_CARD_PAYMENT ",data);
                  dispatch({
                      type: "SAVE_CARD_PAYMENT",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in SAVE_CARD_PAYMENT ",data);
                });
          }
}

export function deletePaymentDetails(userData) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"deletePaymentDetails",
                   data : userData
                })
             .then(response => {
                  var data = response.data;
                console.log("response in DELETE_CARD_PAYMENT ",data);
                  dispatch({
                      type: "DELETE_CARD_PAYMENT",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in DELETE_CARD_PAYMENT ",data);
                });
          }
}

export function saveShippingAddress(userData) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"updateShippingAddress",
                   data : userData
                })
             .then(response => {
                  var data = response.data;
                //  console.log("response in saveShippingAddress ",data);
                  dispatch({
                      type: "SHIPPING_ADDRESS",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in saveShippingAddress ",data);
                });
          }
}

export function getUserData(email) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"getUser",
                   data : {
                     email: email
                    }
                })
             .then(response => {
                  var data = response.data;
                  dispatch({
                      type: "USER_DATA",
                      data,
                    });
                }).catch(error => {
                  var data = error;

                  console.log("error in getUserData ",data);
                });
          }
}

export function getUserDataForCheck(email,callback) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"getUser",
                   data : {
                     email: email
                    }
                })
             .then(response => {
                  var data = response.data;
                  callback(data)
                // console.log("response in getUserData ",data);
                  dispatch({
                      type: "USER_DATA",
                      data,
                    });
                }).catch(error => {
                  var data = error;

                  console.log("error in getUserData ",data);
                });
          }
}

export function updateUser(data) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"updateBillingAddress",
                   data : data
                })
             .then(response => {
                  var data = response.data;
                //console.log("Auto update of Social users ",data);
                dispatch({
                    type: "USER_UPDATE",
                    data,
                  });
                }).catch(error => {
                  var data = error;
                  console.log("error in getUserData ",data);
                });
          }
}
