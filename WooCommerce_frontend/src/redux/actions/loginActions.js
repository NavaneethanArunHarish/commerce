import axios from 'axios';
import * as PROD from './ServiceUrl';


export function userLogin(email,pwd) {
  //console.log('came login action- > ',email);
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"login",
                   data : {
                     email: email,
                     password:pwd
                  }
                })
             .then(response => {
                  var data = response.data;
                //  console.log("response in login ",data);
                  dispatch({
                      type: "USER_LOGIN",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in login ",data);
                  dispatch({
                    type: "USER_LOGIN",
                    data,
                  });
                });
          }
}

export function fbLogin() {
  alert('fb action called');
  return dispatch => {
                 axios({
                   method : 'get',
                   url : "http://localhost:8080/auth/facebook"
                })
             .then(response => {
                  var data = response.data;
                  console.log('my response in fb ',data);
                }).catch(error => {
                  console.log('my error in fb ',error);
                });
          }
}


export function changePassword(id,pwd) {
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"changePassword",
                   data : {
                     _id: id,
                     password:pwd
                  }
                })
             .then(response => {
                  var data = response.data;
                  console.log("response in changePassword ",data);
                  // dispatch({
                  //     type: "USER_LOGIN",
                  //     data,
                  //   });
                }).catch(error => {
                  var data = error;
                  console.log("error in login ",data);
                  // dispatch({
                  //   type: "USER_LOGIN",
                  //   data,
                  // });
                });
          }
}

export function getSecurityQuestion(email) {
  //console.log('came getSecurityQuestion action- > ',email);
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
                      type: "USER_SECURITY_QUESTION",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                });
          }
}
