const bcrypt = require('bcrypt');

if (process.argv.length !== 3) {
  console.error('Usage: node hash-password.js <password>');
  process.exit(1);
}

const password = process.argv[2];

bcrypt.hash(password, 10)
  .then(hashedPassword => {
    console.log(hashedPassword);
  })
  .catch(err => {
    console.error('Error hashing password:', err);
    process.exit(1);
  });
