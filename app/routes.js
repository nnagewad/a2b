const express = require('express')
const router = express.Router()

// Postcodes
const cornwallPostcode = 'tr7 1af';
const readingPostcode = 'rg1 2lu';
const bristolPostcode = 'bs1 5tr';
const walesPostcode = 'cf11 0ba';

// Results page
const tier1 = '/tier1';
const tier2 = '/tier2';
const tier3 = '/tier3';
const devolved = '/devolved';


// Local restrictions
router.post('/local-restrictions-results', function (req, res) {
  const localPostcode = req.session.data['local-postcode'];

  const localResults = '/local-results';

  const cornwallLocal = postCodeFormater(localPostcode, cornwallPostcode);
  const readingLocal = postCodeFormater(localPostcode, readingPostcode);
  const bristolLocal = postCodeFormater(localPostcode, bristolPostcode);

  if (cornwallLocal) {
    res.redirect(localResults + tier1)
  } else if (readingLocal) {
    res.redirect(localResults + tier2)
  } else if (bristolLocal) {
    res.redirect(localResults + tier3)
  } else {
    res.redirect('/local-restrictions-results')
  }
})


// travel restrictions
router.post('/travel-restrictions-results', function (req, res) {
  
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