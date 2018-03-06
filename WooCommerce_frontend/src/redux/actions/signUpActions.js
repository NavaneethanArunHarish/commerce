import axios from 'axios';
import * as PROD from './ServiceUrl';


export function userSignup(email,pwd,qstn,ans) {
  console.log('came user qstn ',qstn);
  console.log('came user ans ',ans);
  return dispatch => {
                 axios({
                   method : 'post',
                   url : PROD.url+"signup",
                   data : {
                     email: email,
                     password:pwd,
                     securityQuestion:qstn,
                     securityAnswer:ans
                  }
                })
             .then(response => {
                  var data = response.data;
                  console.log("response in signup ",data);
                  dispatch({
                      type: "USER_SIGNUP",
                      data,
                    });
                }).catch(error => {
                  var data = error;
                  console.log("error in signup ",data);
                  dispatch({
                    type: "USER_SIGNUP",
                    data,
                  });
                });
          }
}
