const mongoose = require('mongoose');

const DBPATH = 'mongodb://localhost:27017/curato';

async function main () {
  await mongoose.connect(DBPATH);
}

main().catch(err => console.log(err));

module.exports = mongoose;

