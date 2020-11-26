const express = require('express')
const router = express.Router()

// Postcode for devolved nations
const walesPostCode = 'n12 8by';
const scotlandPostCode = 'l5a 1t1';

// Postcodes
const homePostCode = 'l5h 1e5';
const friendPostCode = 'm5h 2t2';

// Results page
const walesResults = '/wales';
const scotlandResults = '/scotland';


// Local restrictions
router.post('/local-restrictions-results', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const localPostcode = req.session.data['local-postcode'];

  const localResults = '/local-results';

  const wales = postCodeFormater(localPostcode, walesPostCode);
  const scotland = postCodeFormater(localPostcode, scotlandPostCode);

  if (wales) {
    res.redirect(localResults + walesResults)
  } else if (scotland) {
    res.redirect(localResults + scotlandResults)
  } else {
    res.redirect('/local-restrictions-results')
  }
})


// travel restrictions
router.post('/travel-restrictions-results', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const originPostcode = req.session.data['origin-postcode'];
  const destinationPostcode = req.session.data['destination-postcode'];

  const travelResults = '/travel-results';

  const home = postCodeFormater(originPostcode, homePostCode);
  const friend = postCodeFormater(destinationPostcode, friendPostCode);

  if (home && friend) {
    res.redirect('/local-restrictions-results')
  } else {
    res.redirect('/wales')
  }
})


module.exports = router


function postCodeFormater(inputField, postCode) {
  return inputField === postCode || inputField === postCode.toUpperCase() || inputField === postCode.replace(/\s/g,'') || inputField === postCode.toUpperCase().replace(/\s/g,'')
}