const crypto = require('crypto');

// Convert an object into a md5 string
//
//  input - (Object)
//
// Returns a String
const hashObject = input => {
  const string = JSON.stringify(input);
  return crypto.createHash('md5').update(string).digest('hex');
};

module.exports = hashObject;
