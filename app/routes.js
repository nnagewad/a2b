const express = require('express')
const router = express.Router()

// Postcodes
// Prototype test postcodes
const cornwallPostcode = 'tr7 1af';
const readingPostcode = 'rg1 2lu';
const bristolPostcode = 'bs1 5tr';
const walesPostcode = 'cf10 4uw';
// UR postcodes
const warringtonPostcode = 'wa1 9ss';
const buryPostcode = 'bl9 0sw';
const hounslowPostcode = 'tw3 3eb';
const birminghamPostcode = 'b1 1bb';
const southwarkPostcode = 'se1 2qh';

// Reusable templates
const error = '/error';

// Participants path
const participant1 = '/participant1';
const participant2 = '/participant2';
const participant3 = '/participant3';
const participant4 = '/participant4';
const participant5 = '/participant5';

// Local restrictions
router.post('/local-restrictions-results', function (req, res) {
  const localPostcode = req.session.data['local-postcode'];


  // Fallback postcodes + paths
  const localResults = '/local-restrictions-results';
  const tier1 = '/tier1';
  const tier2 = '/tier2';
  const tier3 = '/tier3';

  const cornwallLocal = postCodeFormater(localPostcode, cornwallPostcode);
  const readingLocal = postCodeFormater(localPostcode, readingPostcode);
  const bristolLocal = postCodeFormater(localPostcode, bristolPostcode);


  // UR folder path to template
  const task2 = '/research-tasks/task2';

  // UR postcode format when entered into input field
  const warringtonLocal = postCodeFormater(localPostcode, warringtonPostcode);
  const buryLocal = postCodeFormater(localPostcode, buryPostcode);
  const hounslowLocal = postCodeFormater(localPostcode, hounslowPostcode);
  const briminghamLocal = postCodeFormater(localPostcode, birminghamPostcode);
  const southwarkLocal = postCodeFormater(localPostcode, southwarkPostcode);


  // The router logic for local restrictions
  if (cornwallLocal) {
    res.redirect(localResults + tier1)
  } else if (readingLocal) {
    res.redirect(localResults + tier2)
  } else if (bristolLocal) {
    res.redirect(localResults + tier3)
  } else if(warringtonLocal) {
    res.redirect(task2 + participant1)
  } else if (buryLocal) {
    res.redirect(task2 + participant2)
  } else if (hounslowLocal) {
    res.redirect(task2 + participant3)
  } else if (briminghamLocal) {
    res.redirect(task2 + participant4)
  } else if (southwarkLocal) {
    res.redirect(task2 + participant5)
  } else {
    res.redirect(localResults + error)
  }
})




// travel restrictions
router.post('/travel-restrictions-results', function (req, res) {
  
  const originPostcode = req.session.data['origin-postcode'];
  const destinationPostcode = req.session.data['destination-postcode'];


  // Testing out the router
  const travelResults = '/travel-restrictions-results';
  const tier2ToTier3 = '/tier2-tier3';
  const tier2ToTier1 = '/tier2-tier1';
  const tier2ToDevolved = '/tier2-devolved';
  const tier3ToTier2 = '/tier3-tier2';
  const tier1ToTier3 = '/tier1-tier3';

  const cornwallStart = postCodeFormater(originPostcode, cornwallPostcode);
  const readingStart = postCodeFormater(originPostcode, readingPostcode);
  const bristolStart = postCodeFormater(originPostcode, bristolPostcode);
  const cornwallEnd = postCodeFormater(destinationPostcode, cornwallPostcode);
  const readingEnd = postCodeFormater(destinationPostcode, readingPostcode);
  const bristolEnd = postCodeFormater(destinationPostcode, bristolPostcode);
  const walesEnd = postCodeFormater(destinationPostcode, walesPostcode);


  // What to use during user research session
  // Individual task paths
  const task1 = '/research-tasks/task1';
  const task3 = '/research-tasks/task3';
  const task4 = '/research-tasks/task4';


  // UR postcode format when entered into input fields
  // Warrington
  const warringtonStart = postCodeFormater(originPostcode, warringtonPostcode);
  const warringtonEnd = postCodeFormater(destinationPostcode, warringtonPostcode);
  // Bury
  const buryStart = postCodeFormater(originPostcode, buryPostcode);
  const buryEnd = postCodeFormater(destinationPostcode, buryPostcode);
  // Hounslow
  const hounslowStart = postCodeFormater(originPostcode, hounslowPostcode);
  const hounslowEnd = postCodeFormater(destinationPostcode, hounslowPostcode);
  // Birmingham
  const birminghamStart = postCodeFormater(originPostcode, birminghamPostcode);
  const birminghamEnd = postCodeFormater(destinationPostcode, birminghamPostcode);
  // Southwark
  const southwarkStart = postCodeFormater(originPostcode, southwarkPostcode);
  const southwarkEnd = postCodeFormater(destinationPostcode, southwarkPostcode);


  // Devolved nation pages
  const wales = '/wales';

  // The router logic for travel restrictions
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
  } else if (warringtonStart && bristolEnd) {
    res.redirect(task1 + participant1)
  } else if (buryStart && readingEnd) {
    res.redirect(task1 + participant2)
  } else if (hounslowStart && bristolEnd) {
    res.redirect(task1 + participant3)
  } else if (birminghamStart && readingEnd) {
    res.redirect(task1 + participant4)
  } else if (southwarkStart && bristolEnd) {
    res.redirect(task1 + participant5)
  } else if (warringtonStart && cornwallEnd) {
    res.redirect(task3 + participant1)
  } else if (hounslowStart && cornwallEnd) {
    res.redirect(task3 + participant3)
  } else if (southwarkStart && cornwallEnd) {
    res.redirect(task3 + participant5)
  } else if (warringtonStart && walesEnd) {
    res.redirect(task4 + wales)
  } else if (buryStart && walesEnd) {
    res.redirect(task4 + wales)
  } else if (hounslowStart && walesEnd) {
    res.redirect(task4 + wales)
  } else if (birminghamStart && walesEnd) {
    res.redirect(task4 + wales)
  } else if (southwarkStart && walesEnd) {
    res.redirect(task4 + wales)
  } else {
    res.redirect(travelResults + error)
  }
})

module.exports = router

function postCodeFormater(inputField, postCode) {
  return inputField === postCode || inputField === postCode.toUpperCase() || inputField === postCode.replace(/\s/g,'') || inputField === postCode.toUpperCase().replace(/\s/g,'')
}