const express = require('express')
const router = express.Router()

// Postcodes
const cornwallPostcode = 'tr7 1af';
const readingPostcode = 'rg1 2lu';
const bristolPostcode = 'bs1 5tr';
const walesPostcode = 'cf11 0ba';

// Reusable templates
const devolved = '/devolved';
const error = '/error';

// Local restrictions
router.post('/local-restrictions-results', function (req, res) {
  const localPostcode = req.session.data['local-postcode'];

  const localResults = '/local-restrictions-results';
  const tier1 = '/tier1';
  const tier2 = '/tier2';
  const tier3 = '/tier3';

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
    res.redirect(localResults + error)
  }
})

// travel restrictions
router.post('/travel-restrictions-results', function (req, res) {
  
  const originPostcode = req.session.data['origin-postcode'];
  const destinationPostcode = req.session.data['destination-postcode'];

  const travelResults = '/travel-restrictions-results';
  const tier2ToTier3 = '/tier2-tier3';
  const tier2ToTier1 = '/tier2-tier1';
  const tier2ToDevolved = '/tier2-devolved';
  const tier3ToTier2 = '/tier3-tier2';
  const tier1ToTier3 = '/tier1-tier3';

  const cornwallStart = postCodeFormater(originPostcode, cornwallPostcode);
  const readingStart = postCodeFormater(originPostcode, readingPostcode);
  const bristolStart = postCodeFormater(originPostcode, bristolPostcode);
  const walesStart = postCodeFormater(originPostcode, walesPostcode);
  const cornwallEnd = postCodeFormater(destinationPostcode, cornwallPostcode);
  const readingEnd = postCodeFormater(destinationPostcode, readingPostcode);
  const bristolEnd = postCodeFormater(destinationPostcode, bristolPostcode);
  const walesEnd = postCodeFormater(destinationPostcode, walesPostcode);

  if (readingStart && bristolEnd) {
    res.redirect(travelResults + tier2ToTier3)
  } else if (readingStart && cornwallEnd) {
    res.redirect(travelResults + tier2ToTier1)
  } else if (readingStart && walesEnd) {
    res.redirect(travelResults + tier2ToDevolved)
  } else if (bristolStart && readingEnd) {
    res.redirect(travelResults + tier3ToTier2)
  } else if (cornwallStart && bristolEnd) {
    res.redirect(travelResults + tier1ToTier3)
  } else {
    res.redirect(travelResults + error)
  }
})

module.exports = router

function postCodeFormater(inputField, postCode) {
  return inputField === postCode || inputField === postCode.toUpperCase() || inputField === postCode.replace(/\s/g,'') || inputField === postCode.toUpperCase().replace(/\s/g,'')
}