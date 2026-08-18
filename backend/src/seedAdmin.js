import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config({ quiet: true });

const run = async () => {
  await connectDB();

  const exists = await User.findOne({ username: 'admin' });
  if (exists) {
    console.log('Admin already exists, skipping.');
    process.exit(0);
  }

  await User.create({
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    flat_id: null
  });

  console.log('Admin user created: admin / admin123');
  process.exit(0);
};

run();