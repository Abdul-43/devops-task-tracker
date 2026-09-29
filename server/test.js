require('dotenv').config();

console.log("Running backend tests...");

if (!process.env.MONGO_URI) {
  console.error("TEST FAILED: No MONGO_URI provided in environment!");
  process.exit(1);
}

console.log("TEST PASSED: Backend successfully received MONGO_URI from the environment.");
process.exit(0);
