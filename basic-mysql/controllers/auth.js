const bycrpt = require('bcryptjs');
const User = require('../models/user');
const sendMail = require("@sendgrid/mail");
const {SENDGRID} = process.env
sendMail.setApiKey(SENDGRID);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0){
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0){
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup',{
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('login')
      }
      bycrpt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
      
    })
    .catch(err => { console.log(err)});
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email})
  .then( userDoc => {
    if (userDoc) {
      req.flash('error', 'Email exists already, plase pick a different one.');
      return res.redirect('/signup');
    }
    return bycrpt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
      return sendMail.send({
        to: email,
        from: "rodrigo.ulloa@proton.me",
        subject: "Signup succeeded! ",
        text: "You successfully",
        html: "<h1>You successfully signed up baby!</h1>",
      })
      .then(() => {
        console.log("Email sent");
      })
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};