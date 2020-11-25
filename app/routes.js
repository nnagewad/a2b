const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Branching
router.post('/local-restrictions-results', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names
  
    const localPostcode = req.session.data['local-postcode']
  
    if (localPostcode === 'wales' || localPostcode === 'Wales') {
      res.redirect('/wales')
    } else {
      res.redirect('/local-restrictions-results')
    }
  })

module.exports = router
