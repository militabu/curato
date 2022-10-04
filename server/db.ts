import mongoose from 'mongoose';

const DBPATH = 'mongodb://localhost:27017/curato'; // production
const DBTest = 'mongodb://localhost:27017/test' // test

async function main () {
  await mongoose.connect(DBPATH);
  console.log('database is connected')
}

main().catch(err => console.log(err));

export default mongoose;

