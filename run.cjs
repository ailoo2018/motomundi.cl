// run.cjs
process.on('unhandledRejection', (err) => {
  console.error('[iisnode] Unhandled rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('[iisnode] Uncaught exception:', err);
  process.exit(1);
});

const namedPipe = process.env.PORT;
console.log('[iisnode] Named pipe from IIS:', namedPipe);

delete process.env.PORT;

const net = require('net');
const _listen = net.Server.prototype.listen;

net.Server.prototype.listen = function (portArg, ...rest) {
  // Log EVERY listen call so we can see what Nitro actually passes
  console.log('[iisnode] listen() called with:', JSON.stringify(portArg), 'type:', typeof portArg);

  const isNumeric =
    typeof portArg === 'number' ||
    (typeof portArg === 'string' && portArg !== '' && !isNaN(portArg));

  // Also handle options object: { port: 3000, host: ... }
  const isOptionsWithPort =
    portArg && typeof portArg === 'object' && ('port' in portArg);

  if (isNumeric || isOptionsWithPort) {
    console.log(`[iisnode] Redirecting to named pipe: ${namedPipe}`);
    return _listen.call(this, namedPipe, ...rest);
  }

  return _listen.call(this, portArg, ...rest);
};

console.log('[iisnode] Starting Nuxt...');

import('./.output/server/index.mjs').catch((err) => {
  console.error('[iisnode] Failed to start Nuxt:', err);
  process.exit(1);
});
