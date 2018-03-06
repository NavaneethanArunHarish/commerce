const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

exports.updateBillingAddress = (req, res) => {
  console.log('update User ',req.body);
  var userData = req.body;
  User.findOneAndUpdate({ _id: userData._id },
    {
      $set: userData
    }, { upsert: true, new: true }, function (err, userData) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(userData);
      }
    });
};


exports.updateShippingAddress = (req, res) => {
  console.log('update User ',req.body);
  var userData = req.body;
  User.findOneAndUpdate({ _id: userData._id },
    {
      $set: userData
    }, { upsert: true, new: true }, function (err, userData) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(userData);
      }
    });
};

exports.savePaymentDetails = (req, res) => {

  console.log('save data-------->',req.body);
  var userData = req.body;
  var creditData = req.body.creditCardDetails;
  var debitData  = req.body.debitCardDetails;
  if(creditData != undefined){
  User.findOneAndUpdate({ _id: userData._id },
    {
      $push: {
        creditCardDetails: creditData      
      }
    }, function (err, userData) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(userData);
      }
    });
  }
  if(debitData != undefined){
    User.findOneAndUpdate({ _id: userData._id },
      {
        $push: {
          debitCardDetails: debitData      
        }
      }, function (err, userData) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(userData);
        }
      });
    }

  };


  exports.deletePaymentDetails = (req, res) => {
    console.log('data-------->',req.body);
    console.log('delete payment------> ',req.body.cardId);
    var userData = req.body;
    var CardId = req.body.cardId;
    
    User.update({ _id: userData._id },
    
        //{ $pull: { creditCardDetails: CardId , debitCardDetails: CardId } },
        { $pull: { creditCardDetails: { _id: CardId } , debitCardDetails:{ _id: CardId } } },
        { multi: true },
      function (err, userData) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(userData);
        }
      });

  
    };  


/*exports.deletePaymentDetails = (req, res) => {
  console.log('data-------->',req.body);
  console.log('delete payment------> ',req.body.creditCardDetails);
  var userData = req.body;
  var creditData = req.body.creditCardDetails;
  var debitData  = req.body.debitCardDetails;
  if(creditData != undefined){

  User.update({ _id: userData._id },
    { 
      $pull: { "creditCardDetails.$._id" : creditData._id } 
    }, 
    function (err, userData) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(userData);
      }
    });
  }
  if(debitData != undefined){
    User.findOneAndUpdate({ _id: userData._id, "debitCardDetails._id": debitData._id },
      {
        $set: { "debitCardDetails.$" : debitData } 
      },
       function (err, userData) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(userData);
        }
      });
    }

  };
*/


exports.updatePaymentDetails = (req, res) => {
  console.log('data-------->',req.body);
  console.log('update payment------> ',req.body.creditCardDetails);
  var userData = req.body;
  var creditData = req.body.creditCardDetails;
  var debitData  = req.body.debitCardDetails;
  if(creditData != undefined){

  User.updateOne({ _id: userData._id, "creditCardDetails._id": creditData._id },
    { 
      $set: { "creditCardDetails.$" : creditData } 
    }, 
    function (err, userData) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(userData);
      }
    });
  }
  if(debitData != undefined){
    User.findOneAndUpdate({ _id: userData._id, "debitCardDetails._id": debitData._id },
      {
        $set: { "debitCardDetails.$" : debitData } 
      },
       function (err, userData) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(userData);
        }
      });
    }

  };




exports.changePassword = (req, res) => {
  var userData = req.body;
  User.findOne({ _id: userData._id })
    .then((user) => {
      if (!user) {
        //req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        //return res.redirect('back');
      }
      user.password = req.body.password;
      return user.save().then(() => new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) { return reject(err); }
          resolve(user);
        });
      }));
      console.log('git the user - -> ',user);
    });
}

exports.getUserData = (req, res) => {
  console.log('update User ',req.body);
  var userData = req.body;
//  User.findOne({ email: userData.email })
  User.findOne({ email: userData.email }, (err, singleUser) => {
    if (err) {
        res.json(err);
      }
      else {
        res.json(singleUser);
      }
    });
};



exports.getUserById = (req, res) => {
  console.log('userID----->',req.params.id);
  var userId = req.params.id;
//  User.findOne({ email: userData.email })
  User.findOne({ _id: userId }, (err, singleUser) => {
    if (err) {
        res.json(err);
      }
      else {
        console.log('user----->',singleUser);
        res.json(singleUser);
      }
    });
};


exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      //req.flash('errors', info);
      return res.json({message:"Not A User"});
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      return res.json({
        status: "Success",
        code: "200",
        result: {
          token: jsonwebtoken.sign({ email: user.email, _id: user._id }, 'RESTFULAPIs'),
          user: user.toJSON()
        }
      });
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/login');
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};

exports.postSignup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    securityQuestion:req.body.securityQuestion,
    securityAnswer:req.body.securityAnswer,
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.json({message:"Account with that email address already exists"});
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        //req.flash('success', { msg: 'Success! You are logged in.' });
        return res.json({
          status: "Success",
          code: "200",
          result: {
            token: jsonwebtoken.sign({ email: user.email, _id: user._id }, 'RESTFULAPIs'),
            user: user.toJSON()
          }
        });
      });
    });
  });
};

exports.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Account Management'
  });
};

exports.postUpdateProfile = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

exports.postUpdatePassword = (req, res, next) => {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

exports.postDeleteAccount = (req, res, next) => {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

exports.getOauthUnlink = (req, res, next) => {
  const provider = req.params.provider;
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user[provider] = undefined;
    user.tokens = user.tokens.filter(token => token.kind !== provider);
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('info', { msg: `${provider} account has been unlinked.` });
      res.redirect('/account');
    });
  });
};


exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Password Reset'
      });
    });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  const resetPassword = () =>
    User
      .findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
          return res.redirect('back');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(() => new Promise((resolve, reject) => {
          req.logIn(user, (err) => {
            if (err) { return reject(err); }
            resolve(user);
          });
        }));
      });

  const sendResetPasswordEmail = (user) => {
    if (!user) { return; }
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Your Hackathon Starter password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        req.flash('success', { msg: 'Success! Your password has been changed.' });
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .then(() => { if (!res.finished) res.redirect('/'); })
    .catch(err => next(err));
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Forgot Password'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */

exports.postForgot = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  const createRandomToken = crypto
    .randomBytesAsync(16)
    .then(buf => buf.toString('hex'));

  const setRandomToken = token =>
    User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash('errors', { msg: 'Account with that email address does not exist.' });
        } else {
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save();
        }
        return user;
      });

  const sendForgotPasswordEmail = (user) => {
    if (!user) { return; }
    const token = user.passwordResetToken;
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Reset your password on Hackathon Starter',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
   //nodemailer.setApiKey(process.env.SENDGRID_KEY);
    return transporter.sendMail(mailOptions)
      .then(() => {
        req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .then(() => res.redirect('/forgot'))
    .catch(next);
};
