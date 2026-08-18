import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Flat from './models/Flat.js';

dotenv.config({ quiet: true });

const run = async () => {
  await connectDB();

  let flat = await Flat.findOne({ block_name: 'A', flat_number: '101' });

  if (!flat) {
    flat = await Flat.create({
      block_name: 'A',
      flat_number: '101',
      occupancy_type: 'Owner'
    });

    console.log('Flat created: A-101');
  }

  const residentExists = await User.findOne({ username: 'resident' });

  if (!residentExists) {
    await User.create({
      username: 'resident',
      password: 'resident123',
      role: 'Resident',
      flat_id: flat._id
    });

    console.log('Resident created: resident / resident123');
  }

  const guardExists = await User.findOne({ username: 'guard' });

  if (!guardExists) {
    await User.create({
      username: 'guard',
      password: 'guard123',
      role: 'Guard',
      flat_id: null
    });

    console.log('Guard created: guard / guard123');
  }

  process.exit(0);
};

run();
