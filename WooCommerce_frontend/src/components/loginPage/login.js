import React, { Component } from 'react';
import { Image, Container, Header, Segment, Message, Button, Icon, Grid, Dropdown, Input, Popup, Form, Transition, Divider, Label } from 'semantic-ui-react';
import { Menu as Menu2 } from 'semantic-ui-react';
import { Modal as Modal2 } from 'semantic-ui-react';
import { StickyContainer, Sticky } from 'react-sticky';
import HeaderMain from '../constantComponents/header'
import './login.css';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { css } from 'glamor';

//Service Calls
import * as LoginActions from '../../redux/actions/loginActions';
import * as SignupActions from '../../redux/actions/signUpActions';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ConstData from '../constantComponents/securityQuestions';
import CryptoJS from 'crypto-js';



let i = 0;
class HeaderConst extends Component {
  render() {
    return (
      <div style={{
        ...this.props.style, height: '50px',
        overflow: 'visible',
        background: 'white',
        width: '100%',
        border: 'none'
      }}>
        <HeaderMain />
      </div>
    );
  }
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '0',
      height: '0',
      login: true,
      loginCSS: 'login-active',
      regCSS: 'login-inactive',
      lUn: '',
      rUn: '',
      lPwd: '',
      rPwd: '',
      pwdStrength: '',
      showErrorMsg: false,
      secQstn: '',
      secAns: '',
      showAnsField: false,
      openforgotPwd: false,
      openSecQuestion: false,
      showChangePwd: false,
      forgotMail: '',
      userQstn: '',
      userAns: '',
      writtenAns: '',
      reNewPwd: '',
      newPwd: '',
      visible:false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleReg = this.toggleReg.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doSignup = this.doSignup.bind(this);
    this.onChangeLogUn = this.onChangeLogUn.bind(this);
    this.onChangeLogPwd = this.onChangeLogPwd.bind(this);
    this.onChangeRegUn = this.onChangeRegUn.bind(this);
    this.onChangeRegPwd = this.onChangeRegPwd.bind(this);
    this.closeforgorPwd = this.closeforgorPwd.bind(this);
    this.openforgotPwd = this.openforgotPwd.bind(this);
    this.openSecQuestion = this.openSecQuestion.bind(this);
    this.openChangePwd = this.openChangePwd.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onChangeMismatchPwd = this.onChangeMismatchPwd.bind(this);
    this.onChangeNewPwd = this.onChangeNewPwd.bind(this);
    this.handleCheckMail = this.handleCheckMail.bind(this);
  }


  changePassword() {
    console.log("new password", this.state.newPwd)
    console.log("re new password", this.state.reNewPwd)

    if (this.state.newPwd != this.state.reNewPwd) {
      this.setState({ misMatch: true })
    } else {
      this.setState({ misMatch: false })
      this.props.loginActions.changePassword(this.state.userId, this.state.newPwd);
      this.setState({ openforgotPwd: false, openSecQuestion: false, showChangePwd: false });
    }
    //window.location.reload();
  }

  openChangePwd() {

    if (this.state.userAns === this.state.writtenAns) {
      this.setState({ showChangePwd: true });
    } else {
      this.setState({ questionErr: true })
    }
  }
  findEmail(e) {
    this.setState({ forgotMail: e.target.value })
  }

  closeforgorPwd() {
    this.setState({
      openforgotPwd: false
    })
  }

  openforgotPwd() {
    this.setState({
      openforgotPwd: true,
      openSecQuestion: false,
      secErr :false
    });
  }

  openSecQuestion() {
    this.props.UserActions.getUserDataForCheck(this.state.forgotMail, this.handleCheckMail)

  }

  handleCheckMail(data) {
    console.log("data >>>>>>", data)
    if (data != null) {
      if (data.email === this.state.forgotMail) {

        this.setState({ secErr: false })
       
        this.props.loginActions.getSecurityQuestion(this.state.forgotMail);
      }
    }
    else {
      // var timeleft = 10;

      // var downloadTimer = setInterval(function () {
      
      //     document.getElementById('del-tool').style.visibility = "visible";
      //     console.log("timelrft", timeleft)
      //     timeleft--;
        
      //     if (timeleft <= 5) {
      //         document.getElementById('del-tool').style.visibility = "hidden";
      //         clearInterval(downloadTimer);
      //     }
      // }, 500);
      
      this.setState({ secErr: true })
      //setTimeout(function () {  this.setState({ secErr: true }) }.bind(this), 3000);
     
    }

  }

  componentWillMount() {
    console.log("props data inside login ", this.props);
  }

  onChangeLogUn(e) {
    this.setState({ lUn: e.target.value });
  }
  onChangeRegUn(e) {
    this.setState({ rUn: e.target.value });
  }
  onChangeLogPwd(e) {
    this.setState({ lPwd: e.target.value });
  }
  onChangeRegPwd(e) {
    var hasNumber = e.target.value.match(/\d/) ? true : false;
    var hasLetter = e.target.value.match(/[A-z]/) ? true : false;
    var isValidLength = e.target.value.match(/^.{6,}$/) ? true : false;
    var noSpecialChar = !e.target.value.match(/[ \/"]/) ? true : false;
    var strength = this.checkPassStrength(e.target.value);
    this.setState({ pwdStrength: strength });
    this.setState({ rPwd: e.target.value, showErrorMsg: true });
  }
  onChangeNewPwd(e) {
    var hasNumber = e.target.value.match(/\d/) ? true : false;
    var hasLetter = e.target.value.match(/[A-z]/) ? true : false;
    var isValidLength = e.target.value.match(/^.{6,}$/) ? true : false;
    var noSpecialChar = !e.target.value.match(/[ \/"]/) ? true : false;
    var strength = this.checkPassStrength(e.target.value);
    this.setState({ pwdStrength: strength });
    this.setState({ newPwd: e.target.value, showErrorMsg: true });

  }
  onChangeMismatchPwd(e) {
    this.setState({ reNewPwd: e.target.value })

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


  toggleLogin() {
    this.setState({
      login: true,
      loginCSS: 'login-active',
      regCSS: 'login-inactive'
    })
  }

  toggleReg() {
    this.setState({
      login: false,
      loginCSS: 'login-inactive',
      regCSS: 'login-active'
    })
  }

  componentWillReceiveProps(next) {
    console.log('............props......')
    var loginData = next.loginResponse;
    var signupData = next.signUpResponse;
    var userDataResponse = next.userDataResponse;
    //After Login Ajax
    if (loginData != undefined) {
      if (loginData.status === "Success") {
        var un = loginData.result.user.email;
        var uId = loginData.result.user._id;
        browserHistory.push({
          pathname: '/userDashboard',
          state: { userName: un, userId: uId }
        })
      } else {
        toast("Login Failed !!! ", {
          position: toast.POSITION.RIGHT,
          className: css({
            height: '80px',
            top: '300',
            background: '#EC7A5C',
            color: 'white',
            fontSize: '20px'
          })
        });
      }
    }
    //After userdata find BY EMAIL
    if(next.userValue != undefined){
      var email =next.userValue.email;
      console.log("email ",email)
      this.setState({checkEmail :email})
     }
    //After UserData Ajax
    if (userDataResponse != undefined) {
      if (userDataResponse.securityQuestion != undefined) {
        var qstn = userDataResponse.securityQuestion;
        var ans = userDataResponse.securityAnswer;
        var id = userDataResponse._id;
        this.setState({ userQstn: qstn, userAns: ans, openforgotPwd: true, openSecQuestion: true, userId: id });
      } else {
        toast("Failed to Fetch Security Question !!! ", {
          position: toast.POSITION.RIGHT,
          className: css({
            height: '80px',
            top: '300',
            background: '#EC7A5C',
            color: 'white',
            fontSize: '20px'
          })
        });
      }
    }
    //After Signup Ajax
    if (signupData != undefined) {
      if (signupData.status == "Success") {
        var un = signupData.result.user.email;
        var uId = signupData.result.user._id;
        browserHistory.push({
          pathname: '/userDashboard',
          state: { userName: un, userId: uId }
        })
      } else {
        var errMsg = signupData.message;
        if (errMsg == 'Account with that email address already exists') {
          toast("Account with that email address already exists !", {
            position: toast.POSITION.RIGHT,
            className: css({
              height: '80px',
              top: '300',
              background: '#EC7A5C',
              color: 'white',
              fontSize: '20px'
            })
          });
        }
      }
    }
  }


  doLogin(e) {
    e.preventDefault();
    var mail = this.state.lUn;
    var email = mail.toLowerCase();
    var pwd = this.state.lPwd;
    if (!email || !pwd) {
      toast("Field is empty.. !", {
        position: toast.POSITION.RIGHT,
        className: css({
          height: '80px',
          top: '300',
          background: '#EC7A5C',
          color: 'white',
          fontSize: '20px'
        })
      });
    }

    else {
      this.props.loginActions.userLogin(email, pwd);
    }
  }
  scorePassword(pass) {
    var score = 0;
    if (!pass)
      return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    }

    var variationCount = 0;
    for (var check in variations) {
      variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
  }

  checkPassStrength(pass) {
    var score = this.scorePassword(pass);
    if (score > 80) {
      var myObj = {
        color: '#c1e1b9',
        msg: 'Strong',
        enable: false
      }
      return myObj;
    }
    if (score > 60) {
      var myObj = {
        color: '#c1e1b9',
        msg: 'Good',
        enable: false
      }
      return myObj;
    }
    if (score >= 30) {
      var myObj = {
        color: '#ffe399',
        msg: 'Medium',
        enable: false
      }
      return myObj;
    }
    if (score >= 20) {
      var myObj = {
        color: '#fbc5a9',
        msg: 'Weak - Please enter a stronger password.',
        enable: true
      }
      return myObj;
    }
    if (score <= 19) {
      var myObj = {
        color: '#f1adad',
        msg: 'Very weak - Please enter a stronger password.',
        enable: true
      }
      return myObj;
    }

    return "";
  }

  doSignup(e) {
    e.preventDefault();
    var mail = this.state.rUn;
    var email = mail.toLowerCase();
    var pwd = this.state.rPwd;
    var qstn = this.state.secQstn;
    var ans = this.state.secAns;
    if (!email || !pwd) {
      toast("Field is empty.. !", {
        position: toast.POSITION.RIGHT,
        className: css({
          height: '80px',
          top: '300',
          background: '#EC7A5C',
          color: 'white',
          fontSize: '20px'
        })
      });
    }

    else {
      this.props.signupActions.userSignup(email, pwd, qstn, ans);
    }
  }
  render() {

    return (
      <div style={{ border: 'none' }}>
        <StickyContainer style={{ background: 'transparent', border: 'none' }}>

          <Sticky style={{ border: 'none' }}>
            {
              ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                return <HeaderConst style={style} />
              }
            }
          </Sticky>

          <div className="backgroundCss">
            <div className="row-tab">
              <span id='log-tab' style={{ cursor: 'pointer' }}>
                <span onClick={this.toggleLogin} className={this.state.loginCSS} id="tab-login">Login</span>
              </span>
              <span style={{ opacity: '0.55' }}> /  </span>
              <span id='reg-tab' style={{ cursor: 'pointer' }}>
                <span onClick={this.toggleReg} className={this.state.regCSS} id="tab-reg"> Register</span>
              </span>

            </div>


            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />

            <div id="login-register-form">
              {this.state.login === true && <form>
                <div className="container">
                  <label><b>USERNAME OR EMAIL ADDRESS *</b></label>
                  <input type="text" onChange={this.onChangeLogUn.bind(this)} placeholder="Enter Username" name="uname" required />

                  <label><b>PASSWORD *</b></label>
                  <input type="password" onChange={this.onChangeLogPwd.bind(this)} placeholder="Enter Password" name="psw" required />
                  <button onClick={this.doLogin} id="log-btn" type="submit">LOGIN</button>
                  <div id="form-bott"> <span> <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember me</span>
                    <span onClick={this.openforgotPwd}><span href="#" style={{ color: '#EC7A5C', paddingLeft: '209px', cursor: 'pointer' }}>FORGOT PASSWORD?</span></span>
                  </div>
                </div>


              </form>}
              {this.state.login === false && <form >


                <div className="container">
                  <label><b>EMAIL ADDRESS *</b></label>
                  <input type="text" placeholder="Enter Username" onChange={this.onChangeRegUn.bind(this)} name="uname" required />
                  <label><b>Security Question</b></label>
                  <Dropdown placeholder='Choose a Security question' fluid selection options={ConstData.Questions} onChange={(e, { value }) => this.setState({ secQstn: value, showAnsField: true })} />
                  {this.state.showAnsField ?
                    <div>
                      <Input fluid onChange={(e, { value }) => this.setState({ secAns: value })} />
                    </div>
                    :
                    <div></div>
                  }
                  <label style={{ marginTop: '5px' }}><b>PASSWORD *</b></label>
                  <input type="password" placeholder="Enter Password" name="psw" onChange={this.onChangeRegPwd.bind(this)} required />
                  {this.state.showErrorMsg ?
                    <div>
                      <Message
                        style={{
                          backgroundColor: this.state.pwdStrength.color, opacity: '0.7',
                          textAlign: 'center', marginTop: '-8px', fontSize: '12px', fontWeight: 'bold'
                        }}
                        header={this.state.pwdStrength.msg}
                      />
                      <p style={{ fontSize: '8px', opacity: '0.7' }}>Hint: The password should be at least twelve characters long.
                      To make it stronger, use upper and lower case letters, numbers, and symbols like
                      ! '' ? $ % ^ & ).</p>
                    </div>
                    :
                    <div></div>
                  }
                  <Button id="log-btn" type="submit" onClick={this.doSignup}
                    disabled={this.state.pwdStrength.enable}>REGISTER</Button>
                </div>
              </form>}
              {this.state.login === false ?
                <Grid style={{ marginTop: '-75px' }}>
                  <Grid.Row style={{ width: '100%', marginLeft: '47%', height: '20px', fontSize: '14px' }}>
                    <span className='login-inactive'>OR</span>
                  </Grid.Row>
                  <Grid.Row style={{ width: '100%', marginLeft: '45%', height: '20px', fontSize: '14px' }}>
                    <span className='login-inactive'>Signup using</span>
                  </Grid.Row>
                  <Grid.Row>
                    <div style={{ width: '100%', marginLeft: '40%' }}>
                      <a href='http://localhost:8080/auth/facebook'>
                        <Button color='facebook'>
                          <Icon name='facebook' /> Facebook
           </Button>
                      </a>
                      <a href='http://localhost:8080/auth/google'>
                        <Button color='google plus'>
                          <Icon name='google' /> Google
           </Button>
                      </a>
                    </div>
                  </Grid.Row>
                  <Grid.Row>
                  </Grid.Row>
                </Grid>
                :
                <Grid style={{ marginTop: '-10%' }}>
                  <Grid.Row style={{ width: '100%', marginLeft: '47%', height: '20px', fontSize: '14px' }}>
                    <span className='login-inactive'>OR</span>
                  </Grid.Row>
                  <Grid.Row style={{ width: '100%', marginLeft: '45%', height: '20px', fontSize: '14px' }}>
                    <span className='login-inactive'>Login using</span>
                  </Grid.Row>
                  <Grid.Row>
                    <div style={{ width: '100%', marginLeft: '40%' }}>
                      <a href='http://localhost:8080/auth/facebook'>
                        <Button color='facebook'>
                          <Icon name='facebook' /> Facebook
           </Button>
                      </a>
                      <a href='http://localhost:8080/auth/google'>
                        <Button color='google plus'>
                          <Icon name='google' /> Google
           </Button>
                      </a>
                    </div>
                  </Grid.Row>
                  <Grid.Row>
                  </Grid.Row>
                </Grid>
              }
              <Transition.Group animation='vertical flip' duration='1000'>
                {this.state.openforgotPwd && !this.state.openSecQuestion && !this.state.showChangePwd &&
                  <Modal2
                    dimmer={true}
                    open={this.state.openforgotPwd}
                    onClose={this.closeforgorPwd}
                    size='mini'>
                    <Modal2.Header>Forgot Your Password ?</Modal2.Header>
                    <Modal2.Content>
                      <Form.Field inline>
                        <Label color='orange' pointing='right'>Please , Type your email address below</Label>
                        <Input style={{ marginTop: '5px' }} fluid onChange={(e, { value }) => this.setState({ forgotMail: value })} />
                        {this.state.secErr === true ? <span id = "del-tool"  style={{ color: "red", fontSize: ".85714286rem", fontFamily: "open sans-serif" }}>Please check your mail</span>
                          : ''
                        }
                      </Form.Field>
                    </Modal2.Content>
                    <Modal2.Actions>
                      <Button color='black' onClick={this.closeforgorPwd}>
                        Cancel
            </Button>
                      <Button color='orange' icon='chevron right' labelPosition='right' content="Proceed next" onClick={this.openSecQuestion} />
                    </Modal2.Actions>
                  </Modal2>
                }
                {this.state.openforgotPwd && this.state.openSecQuestion && !this.state.showChangePwd &&
                  <Modal2
                    dimmer={true}
                    open={this.state.openforgotPwd}
                    onClose={this.closeforgorPwd}
                    size='mini'>
                    <Modal2.Header>Answer the below</Modal2.Header>
                    <Modal2.Content>
                      <Form.Field inline>
                        <Label color='orange' pointing='right'>{this.state.userQstn}</Label>
                        <Input style={{ marginTop: '5px' }} fluid onChange={(e, { value }) => this.setState({ writtenAns: value })} />
                      </Form.Field>
                      {this.state.questionErr === true ? <span style={{ color: "red", fontSize: ".85714286rem", fontFamily: "open sans-serif" }}>Please enter the right answer</span>
                          : ''
                        }
                    </Modal2.Content>
                    <Modal2.Actions>
                      <Button color='black' onClick={this.closeforgorPwd}>
                        Cancel
            </Button>
                      <Button color='orange' icon='chevron right' labelPosition='right' content="Confirm" onClick={this.openChangePwd} />
                    </Modal2.Actions>
                  </Modal2>
                }
                {this.state.openforgotPwd && this.state.openSecQuestion && this.state.showChangePwd &&
                  <Modal2
                    dimmer={true}
                    open={this.state.openforgotPwd}
                    onClose={this.closeforgorPwd}
                    size='mini'>
                    <Modal2.Header><Icon name='detective' /> Reset Password</Modal2.Header>
                    <Modal2.Content>

                      <Segment padded>
                        <Label basic color='orange' pointing='below'><Icon name='map signs' /> New Password</Label>
                        <Input type='password' placeholder='Type New Password' style={{ marginTop: '5px' }} fluid onChange={this.onChangeNewPwd.bind(this)}  />
                        {this.state.showErrorMsg ?
                          <div>
                            <Message
                              style={{
                                backgroundColor: this.state.pwdStrength.color, opacity: '0.7',
                                textAlign: 'center', marginTop: '0px', fontSize: '10px', fontWeight: 'bold', height: '30px'
                              }}
                              header={this.state.pwdStrength.msg}
                            />

                          </div>
                          :
                          <div></div>
                        }
                        <Divider horizontal></Divider>
                        <Label basic color='orange' pointing='below'><Icon name='map signs' /> Confirm New Password</Label>
                        <Input type='password' placeholder='ReType New Password' style={{ marginTop: '5px' }} fluid onChange={this.onChangeMismatchPwd.bind(this)} />
                        {this.state.misMatch === true ? <span style={{ color: "red", fontSize: ".85714286rem", fontFamily: "open sans-serif" }}>Please enter the correct password</span>
                          : ''
                        }
                      </Segment>
                    </Modal2.Content>
                    <Modal2.Actions>
                      <Button color='black' onClick={this.closeforgorPwd}>
                        Cancel
            </Button>
                      <Button color='orange' icon='chevron right' labelPosition='right' content="Change Password"  disabled={this.state.pwdStrength.enable} onClick={this.changePassword} />
                    </Modal2.Actions>
                  </Modal2>
                }
              </Transition.Group>
            </div>
          </div>
          <Segment>
            <Header as='h3' textAlign='center'>
              <div className="container">
                <div className="text-center center-block">
                  <a href="https://www.facebook.com"><i id="social-fb" className="fa fa-facebook-square fa-2x social"></i></a>
                  <a href="https://twitter.com"><i id="social-tw" className="fa fa-twitter-square fa-2x social"></i></a>
                  <a href="https://plus.google.com"><i id="social-gp" className="fa fa-google-plus-square fa-2x social"></i></a>
                  <a href="mailto:#"><i id="social-em" className="fa fa-envelope-square fa-2x social"></i></a>
                </div>
                <p>© <a href='www.google.com'>Get Sarees from</a> - WooCommerce Author.</p>
              </div>
            </Header>
          </Segment>
        </StickyContainer>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginResponse: state.login.loginResponse,
    signUpResponse: state.signUp.signUpResponse,
    userDataResponse: state.login.userDataResponse,
    userValue :state.user.userDataResponse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
    signupActions: bindActionCreators(SignupActions, dispatch),
    UserActions : bindActionCreators(UserActions,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
