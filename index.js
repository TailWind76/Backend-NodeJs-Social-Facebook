// app.js
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

passport.use(new FacebookStrategy({
  clientID: 'your-facebook-app-id',
  clientSecret: 'your-facebook-app-secret',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
  // You can handle user data from the profile object
  // For example, save user to database or create a new user
  return done(null, profile);
}));

app.get('/auth/facebook',
  passport.authenticate('facebook')
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the dashboard or any desired page after successful authentication
    res.redirect('/dashboard');
  }
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
