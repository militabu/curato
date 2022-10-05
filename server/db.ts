import mongoose from 'mongoose';
require('dotenv').config();

const DBPATH = process.env.DBPATH; // production
const DBTest = process.env.DBTEST; // test

async function main () {
  await mongoose.connect(DBPATH!);
  console.log('database is connected')
}

main().catch(err => console.log(err));

export default mongoose;

