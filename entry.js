// entry.js
// This forces the environment to handle the IIS pipe correctly
process.env.PORT = process.env.PORT || '\\\\.\\pipe\\' + Math.random();

// Import the Nitro server
import('./.output/server/index.mjs');
