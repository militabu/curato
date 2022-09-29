import mongoose from 'mongoose';

const DBPATH = 'mongodb://localhost:27017/curato';

async function main () {
  await mongoose.connect(DBPATH);
}

main().catch(err => console.log(err));

export default mongoose;

