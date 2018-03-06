const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  securityQuestion:{ type: String, default:null },
  securityAnswer:{ type: String, default:null },
  firstName:{ type: String, default:null },
  lastName:{ type: String, default:null },
  creditCardDetails:[{
    cardNumber:{ type: String, default:null },
    expiryDate:{ type: String, default:null },
    NameOnCard:{ type: String, default:null },
  }],
  debitCardDetails:[{
    cardNumber:{ type: String, default:null },
    expiryDate:{ type: String, default:null },
    NameOnCard:{ type: String, default:null },
  }],
  billingAddress:{
    firstName:{ type: String, default:null },
    lastName:{ type: String, default:null },
    companyName:{ type: String, default:null },
    country:{ type: String, default:null },
    buidingDetails:{ type: String, default:null },
    streetDetails:{ type: String, default:null },
    town:{ type: String, default:null },
    stateCountry:{ type: String, default:null },
    postCode:{ type: String, default:null },
    phone:{ type: String, default:null }
  },
  shippingAddress:{
    firstName:{ type: String, default:null },
    lastName:{ type: String, default:null },
    companyName:{ type: String, default:null },
    country:{ type: String, default:null },
    buidingDetails:{ type: String, default:null },
    streetDetails:{ type: String, default:null },
    town:{ type: String, default:null },
    stateCountry:{ type: String, default:null },
    postCode:{ type: String, default:null }
  },
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    console.log('chnaege pwd in service called');
     return next();
   }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
