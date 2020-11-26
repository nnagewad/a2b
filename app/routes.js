const express = require('express')
const router = express.Router()

// Variables for devolved nations
const walesPostCode = 'n12 8by';

// Local restrictions
router.post('/local-restrictions-results', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names
  
    const localPostcode = req.session.data['local-postcode'];

    const wales = postCodeFormater(localPostcode, walesPostCode);

    if (wales) {
      res.redirect('/wales')
    } else {
      res.redirect('/local-restrictions-results')
    }
  })

module.exports = router


function postCodeFormater(inputField, postCode) {
  return inputField === postCode || inputField === postCode.toUpperCase() || inputField === postCode.replace(/\s/g,'') || inputField === postCode.toUpperCase().replace(/\s/g,'')
}